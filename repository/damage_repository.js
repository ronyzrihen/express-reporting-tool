const { MongoStorage } = require('../db/dbConnection');

class DamageRepository {
  constructor() {
    this.storage = new MongoStorage('damage');
  }

  find() {
    return this.storage.getReports();
  }
}

module.exports = DamageRepository;
