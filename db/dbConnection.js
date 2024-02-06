require('dotenv').config();
const mongoose = require('mongoose');
const {
  DB_HOST, DB_NAME, DB_USER, DB_PASS,
} = require('./constants');

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
// eslint-disable-next-line import/order
const path = require('path');
// const fs = require('fs');

class MongoStorage {
  constructor(entity) {
    if (DB_USER && DB_PASS && DB_HOST && DB_NAME) { // todo optional check if file exist
      this.entityName = entity.toLowerCase();
      // eslint-disable-next-line global-require,import/no-dynamic-require
      this.Model = require(path.join(__dirname, `../models/${(this.entityName)}.js`));
      this.connectDB();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async connectDB() {
    try {
      await mongoose.connect(uri);
    } catch (e) { console.log('kkk'); } // fixme
  }

  getReports() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.find({ id });
  }
}
module.exports = { MongoStorage };
