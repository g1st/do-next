const mongoose = require('mongoose');

function toLowerCase(val) {
  const v = typeof val === 'string' ? val : '';
  return v.toLowerCase();
}

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
        validator(array) {
          return array.length > 0;
        },
        message: 'Piece has to have at least one image'
      }
    },
    frontImage: { type: String },
    group: {
      type: String,
      required: 'Collection name is required',
      set: toLowerCase,
      trim: true
    },
    materials: { type: String, trim: true },
    category: { type: String, default: 'other', trim: true },
    size: { type: String, trim: true },
    price: { type: Number, required: 'Price is required' },
    available: { type: Boolean, default: true, required: true },
    created: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Work', worksSchema);
