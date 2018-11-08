const mongoose = require('mongoose');

const worksSchema = new mongoose.Schema(
  {
    name: { type: String, required: 'Title is required', trim: true },
    slug: { type: String },
    description: {
      type: String,
      required: 'Description is required',
      trim: true
    },
    images: {
      type: Array,
      required: true,
      validate: {
        validator: function(array) {
          return array.length > 0;
        },
        message: 'Piece has to have at least one image'
      }
    },
    group: {
      type: String,
      required: 'Collection name is required',
      trim: true
    },
    materials: [{ type: String, trim: true }],
    category: { type: String, default: 'other', trim: true },
    size: { type: String, trim: true },
    price: { type: Number, required: 'Price is required' },
    available: { type: Boolean, default: true, required: true },
    updated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Work', worksSchema);
