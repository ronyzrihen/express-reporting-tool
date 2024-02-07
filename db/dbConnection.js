const mongoose = require('mongoose');
const path = require('path');
const EventEmitter = require('events');
// const { PropertyNotFound } = require('../errors/NotFoundError');
const constants = require('./constants');

const {
  DB_HOST, DB_USER, DB_PASS, DB_NAME,
} = constants;

class DbConnection extends EventEmitter {
  constructor(entity) {
    super();
    this.entityName = entity.charAt(0).toUpperCase() + entity.slice(1);
    // eslint-disable-next-line global-require,import/no-dynamic-require
    this.Model = require(path.join(__dirname, `../models/${this.entityName}.model.js`));
    this.connectDB();
  }

  async connectDB() {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
    try {
      await mongoose.connect(uri);
      console.log(`connected to ${this.entityName} collection`); // todo change to logger
    } catch (err) {
      console.log(`connection error: ${err}`);
    }
  }

  getReports() {
    return this.Model.find({});
  }

  getId(id) {
    return this.Model.find({ id });
  }

  create(report) {
    // if (!newReport.id) throw PropertyNotFound('id'); // todo check id exist
    return this.Model.create(report);
  }

  update(id, body) {
    return this.Model.updateOne({ id }, body);
  }

  delete(reportId) {
    return this.Model.deleteOne({ id: reportId });
  }
}
module.exports = { DbConnection };
