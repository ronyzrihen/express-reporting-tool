require('dotenv').config();
const request = require('supertest');
const { beforeAll } = require('@jest/globals');
const DamageRepository = require('../repository/damage_repository');
const { app } = require('../server/app');

jest.mock('../db/dbConnection');

describe('GET /damage-reports/', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001, () => console.log('Listening on test app'));
  });

  afterAll((done) => {
    server.close(done);
  });
  it('responds with all reports', async () => {
    const expectedResult = [
      { id: 10, type: 'Type1', description: 'Report 1' },
      { id: 20, type: 'Type2', description: 'Report 2' },
    ];
    jest.spyOn(DamageRepository.prototype, 'find').mockResolvedValue(expectedResult);
    const response = await request(app).get('/damage-reports/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
  });
});

describe('GET /damage-reports/:id', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001, () => console.log('Listening on test app'));
  });

  afterAll((done) => {
    server.close(done);
  });
  it('responds with the requested report', async () => {
    const expectedResult = [{ id: 10, type: 'Type1', description: 'Report 1' }];
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue(expectedResult);
    const response = await request(app).get('/damage-reports/10');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 400 Bad request - ID TypeError', async () => {
    const expectedResult = { message: 'ID has an invalid type' };
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue(expectedResult);
    const response = await request(app).get('/damage-reports/asdf');
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 404 Not Found - ID Not Found', async () => {
    const expectedResult = { message: 'ID was not found' };
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue(expectedResult);
    const response = await request(app).get('/damage-reports/100');
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 400 Bad Request - invalid ID', async () => {
    const expectedResult = { message: 'ID is an invalid value' };
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue(expectedResult);
    const response = await request(app).get('/damage-reports/-1');
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResult);
  });
});

describe('POST /damage-reports/', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001, () => console.log('Listening on test app'));
  });

  afterAll((done) => {
    server.close(done);
  });
  it('responds with an 201 created - create new post', async () => {
    const expectedResult = { id: 10, type: 'Type1', description: 'Report 1' };
    jest.spyOn(DamageRepository.prototype, 'createReport').mockResolvedValue(expectedResult);
    const response = await request(app).post('/damage-reports/').send(expectedResult).set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 400 Bad Request - ID already exist', async () => {
    const dataSent = { id: 10, type: 'Type1', description: 'Report 1' };
    const expectedResult = { message: 'ID: 10 already exist in database' };
    jest.spyOn(DamageRepository.prototype, 'createReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([dataSent]);
    const response = await request(app).post('/damage-reports/').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 400 Bad Request - ID not provided', async () => {
    const dataSent = { type: 'Type1', description: 'Report 1' };
    const expectedResult = { message: 'ID not provided' };
    jest.spyOn(DamageRepository.prototype, 'createReport').mockResolvedValue(expectedResult);
    const response = await request(app).post('/damage-reports/').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResult);
  });
});

describe('PUT /damage-reports/:id', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001, () => console.log('Listening on test app'));
  });

  afterAll((done) => {
    server.close(done);
  });
  it('responds with an 201 created - Updated successfully', async () => {
    const dataSent = { id: 10, type: 'Type1', description: 'Report 1' };
    const expectedResult = { success: 1 };
    jest.spyOn(DamageRepository.prototype, 'updateReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([dataSent]);
    const response = await request(app).put('/damage-reports/10').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 400 Bad Request - trying to change id and creating a duplicate of another', async () => {
    const dataSent = { id: 10, type: 'Type1', description: 'Report 1' };
    const findReturn = { id: 20, type: 'Type2', description: 'Report 2' };
    const expectedResult = { message: 'New ID: 10 already exist in database' };
    jest.spyOn(DamageRepository.prototype, 'createReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([findReturn]);
    const response = await request(app).put('/damage-reports/20').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 404 ID Not Found', async () => {
    const dataSent = { id: 10, type: 'Type1', description: 'Report 1' };
    const expectedResult = { message: 'ID 10 was not found' };
    jest.spyOn(DamageRepository.prototype, 'createReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([]);
    const response = await request(app).put('/damage-reports/10').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
  });
});
describe('DELETE /damage-reports/:id', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001, () => console.log('Listening on test app'));
  });

  afterAll((done) => {
    server.close(done);
  });
  it('responds with an 200 Success - Deleted successfully', async () => {
    const dataSent = { id: 10, type: 'Type1', description: 'Report 1' };
    const expectedResult = { success: 1 };
    jest.spyOn(DamageRepository.prototype, 'updateReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([dataSent]);
    const response = await request(app).delete('/damage-reports/10').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
  });
  it('responds with an 404 Not Found - ID Not Found', async () => {
    const dataSent = { id: 10, type: 'Type1', description: 'Report 1' };
    const expectedResult = { message: 'ID: 10 was not found' };
    jest.spyOn(DamageRepository.prototype, 'updateReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([]);
    const response = await request(app).delete('/damage-reports/10').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
  });
});
describe('PATCH /damage-reports/:id', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3001, () => console.log('Listening on test app'));
  });

  afterAll((done) => {
    server.close(done);
  });
  it('responds with an 501 - Request not implemented', async () => {
    const dataSent = { id: 11, type: 'Type1', description: 'Report 1' };
    const expectedResult = { message: 'Request not implemented' };
    jest.spyOn(DamageRepository.prototype, 'updateReport').mockResolvedValue(expectedResult);
    jest.spyOn(DamageRepository.prototype, 'getOneId').mockResolvedValue([]);
    const response = await request(app).patch('/damage-reports/10').send(dataSent).set('Content-Type', 'application/json');
    expect(response.status).toBe(501);
    expect(response.body).toEqual(expectedResult);
  });
});
