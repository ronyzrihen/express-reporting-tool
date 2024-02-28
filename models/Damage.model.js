const { Schema, model } = require('mongoose');

const damageSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String },
  desc: { type: String, required: true },
});
module.exports = model('reports', damageSchema);
