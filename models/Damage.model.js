const { Schema, model } = require('mongoose');

const damageSchema = new Schema({
  title: { type: String, required: true },
  severity: { type: String },
  desc: { type: String, required: true },
});
module.exports = model('damageReports', damageSchema);
