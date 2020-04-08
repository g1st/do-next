const mongoose = require('mongoose');

function toLowerCase(val) {
  const v = typeof val === 'string' ? val : '';
  return v.toLowerCase();
}

const worksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Title is required',
      trim: true,
      unique: true,
    },
    slug: { type: String, unique: true, required: 'Slug is required' },
    description: {
      type: String,
      required: 'Description is required',
      trim: true,
    },
    images: {
      type: Array,
      required: true,
      validate: {
        validator(array) {
          return array.length > 0;
        },
        message: 'Piece has to have at least one image',
      },
    },
    frontImage: { type: String },
    group: {
      type: String,
      required: 'Collection name is required',
      set: toLowerCase,
      trim: true,
    },
    materials: { type: String, trim: true },
    category: { type: String, default: 'other', trim: true },
    size: { type: String, trim: true },
    weight: { type: String, trim: true },
    price: { type: Number, required: 'Price is required' },
    available: { type: Boolean, default: true, required: true },
    madeToOrder: { type: Boolean, default: false },
    producingTime: { type: String, default: '2 weeks' },
    galleryIndex: { type: Number, required: true },
    collectionIndex: { type: Number, required: true },
    created: { type: Date, default: Date.now },
    display: { type: Boolean, default: true },
    oneOfAKind: { type: Boolean, default: false },
    silverFinish: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Work', worksSchema);
