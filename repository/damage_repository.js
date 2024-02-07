const { DbConnection } = require('../db/dbConnection');
const { PropertyNotFound } = require('../errors/NotFoundError');

class DamageRepository {
  constructor() {
    this.storage = new DbConnection('damage');
  }

  find() {
    return this.storage.getReports();
  }

  getOneId(id) {
    return this.storage.getId(id);
  }

  createReport(report) {
    if (!report.id) throw new PropertyNotFound('ID');
    if (this.getOneId(report.id)) throw new PropertyNotFound();
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
