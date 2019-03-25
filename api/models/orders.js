const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    client_ip: { type: String, trim: true },
    transaction_id: { type: String, trim: true },
    receipt: { type: String, trim: true },
    amount_paid: { type: Number },
    source: { type: Object },
    purchaseDetails: { type: Object },
    additional_info: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', ordersSchema);
