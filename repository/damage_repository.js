const { DbConnection } = require('../db/dbConnection');
const { PropertyNotFound } = require('../errors/NotFoundError');
const { IDExistError } = require('../errors/AlreadyExistsError');

class DamageRepository {
  constructor() {
    this.storage = new DbConnection('damage');
  }

  // isExist(id) {
  //   const data = this.storage.exist(id);
  //   const aData = data.;
  //   return aData;
  // }

  find() {
    return this.storage.getReports();
  }

  getOneId(id) {
    return this.storage.getId(id);
  }

  createReport(report) { // fixme need to know if exist
    if (!report.id) throw new PropertyNotFound('ID');
    if (this.getOneId({ id: report.id })) throw new IDExistError();
    return this.storage.create(report);
  }

  updateReport(id, body) {
    return this.storage.update(id, body);
  }

  delete(id) {
    return this.storage.delete(id);
  }
}

module.exports = DamageRepository;
