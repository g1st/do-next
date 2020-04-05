// TODO move to helpers.js

const {
  europeCountries,
  shippingPriceGB,
  shippingPriceEU,
  shippingPriceWorldwide
} = require('./globals');

module.exports = {
  postageForCountry: function postageForCountry(country) {
    if (country === 'GB') {
      return shippingPriceGB;
    }
    if (europeCountries.includes(country)) {
      return shippingPriceEU;
    }
    return shippingPriceWorldwide;
  }
};
