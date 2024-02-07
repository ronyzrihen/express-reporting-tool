const { Schema, model } = require('mongoose');

const damageSchema = new Schema({
  id: { type: Number, unique: true },
  type: { type: String },
  desc: { type: String },
});
module.exports = model('damageReports', damageSchema);
