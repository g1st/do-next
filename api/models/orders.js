const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
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
