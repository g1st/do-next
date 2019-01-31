const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: { type: String, trim: true },
    payload: { type: Object },
    additional: { type: Object }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientsSchema);
