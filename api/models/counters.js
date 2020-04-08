const mongoose = require('mongoose');

const countersSchema = new mongoose.Schema(
  {
    sequence_name: { type: String, requered: true },
    sequence_value: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Counter', countersSchema);
