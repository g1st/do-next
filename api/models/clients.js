const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: {
      address1: { type: String, trim: true },
      address2: { type: String, trim: true },
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientsSchema);
