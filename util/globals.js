const shippingPriceGB = 0;
const shippingPriceEU = 9;
const shippingPriceWorldwide = 16;
const europeCountries = [
  'AL',
  'AD',
  'AT',
  'AZ',
  'BY',
  'BE',
  'BA',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'GE',
  'DE',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'KZ',
  'XK',
  'LV',
  'LI',
  'LT',
  'LU',
  'MK',
  'MT',
  'MD',
  'MC',
  'ME',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'RU',
  'SM',
  'RS',
  'SK',
  'SI',
  'ES',
  'SE',
  'CH',
  'TR',
  'UA',
  'GB',
  'VA'
];

exports.shippingPriceGB = shippingPriceGB;
exports.shippingPriceEU = shippingPriceEU;
exports.shippingPriceWorldwide = shippingPriceWorldwide;
exports.europeCountries = europeCountries;
exports.postageForCountry = function postageForCountry(country) {
  if (country === 'GB') {
    return shippingPriceGB;
  }
  if (europeCountries.includes(country)) {
    return shippingPriceEU;
  }
  return shippingPriceWorldwide;
};
