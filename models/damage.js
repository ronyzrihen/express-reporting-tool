const { Schema, model } = require('mongoose');

const damageSchema = new Schema({
  id: { type: Number },
  type: { type: String },
  description: { type: String },
});
module.exports = model('cluster0', damageSchema);
