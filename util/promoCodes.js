// no need to save in db for now
const promoCodes = [
  { code: 'dovile10', discount: 10 },
  { code: 'jewellery15', discount: 15 },
  { code: 'silver20', discount: 20 }
];

const findDiscountMultiplier = code => {
  const discountPercent = promoCodes.filter(obj => obj.code === code)[0]
    .discount;
  return (100 - discountPercent) / 100;
};

module.exports = { promoCodes, findDiscountMultiplier };
