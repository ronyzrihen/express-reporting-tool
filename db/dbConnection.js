const mongoose = require('mongoose');
const objectId = require('mongoose').Types.ObjectId;
const path = require('path');
const EventEmitter = require('events');
const { ValueError } = require('../errors/DataError');
// const { PropertyNotFound } = require('../errors/NotFoundError');
const constants = require('./constants');

const {
  DB_HOST, DB_USER, DB_PASS, DB_NAME,
} = constants;

class DbConnection extends EventEmitter {
  constructor(entity) {
    super();
    this.entityName = entity.charAt(0).toUpperCase() + entity.slice(1);
    this.Model = require(path.join(__dirname, `../models/${this.entityName}.model.js`));
    this.connectDB();
  }

  async connectDB() {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
    try {
      await mongoose.connect(uri);
      console.log(`connected to ${this.entityName} collection`);
    } catch (err) {
      throw Error();
    }
  }

  getReports() {
    return this.Model.find();
  }

  getId(reportId) {
    if (!objectId.isValid(reportId)) throw new ValueError('ID');
    return this.Model.find({ _id: reportId });
  }

  getTitle(title) {
    return this.Model.find({ title: { $regex: title, $options: 'i' } });
  }

  create(report) {
    return this.Model.create(report);
  }

  update(id, body) {
    return this.Model.updateOne({ _id: id }, body);
  }

  delete(reportId) {
    if (!objectId.isValid(reportId)) throw new ValueError('ID');
    return this.Model.deleteOne({ _id: reportId });
  }
}
module.exports = { DbConnection };
