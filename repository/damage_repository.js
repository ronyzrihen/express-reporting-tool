const { MongoStorage } = require('../db/dbConnection');

class DamageRepository {
  constructor() {
    this.storage = new MongoStorage('damage');
  }

  find() {
    return this.storage.getReports();
  }

  getOneId(id) {
    return this.storage.getId(id);
  }

  createReport(Report) {
    return this.storage.create(Report);
  }

  updateReport(id, body) {
    return this.storage.update(id, body);
  }

  delete(id) {
    return this.storage.delete(id);
  }
}

module.exports = DamageRepository;
