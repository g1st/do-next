const path = require('path');
const { imageSizes } = require('./globals');

exports.cartHelper = {
  totalItems(cart) {
    return cart.reduce((acc, item) => {
      const items = acc + item.quantity;
      return items;
    }, 0);
  },

  totalPrice(cart) {
    const totalPrice = cart.reduce((acc, item) => {
      const price = acc + item.price * item.quantity;
      return price;
    }, 0);

    return totalPrice.toFixed(2);
  },
};

exports.loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

exports.saveCart = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.log(err);
  }
};

exports.onImageError = (event) => {
  const defaultImage = '/images/fallback.png';

  if (event.target.src.indexOf('/images/fallback.png') === -1) {
    event.target.src = defaultImage;
    event.target.srcset = '';
  }
};

exports.pluralise = (category) => {
  switch (category) {
    case 'brooch':
      return 'brooches';
    case 'ring':
      return 'rings';
    case 'earring':
      return 'earrings';
    case 'necklace':
      return 'necklaces';
    case 'bracelet':
      return 'bracelets';
    case 'other':
      return 'other';
    default:
      return 'all types';
  }
};

exports.filterCollections = (data, user) => {
  let collections;
  if (user) {
    collections = data.reduce((acc, next) => {
      if (!acc.includes(next.group)) {
        acc.push(next.group.toLowerCase());
      }
      return acc;
    }, []);
  } else {
    collections = data.reduce((acc, next) => {
      if (
        !acc.includes(next.group) &&
        (next.display || next.display === undefined)
      ) {
        acc.push(next.group.toLowerCase());
      }
      return acc;
    }, []);
  }

  // make sure 'various' collection is at the end
  const variousIndex = collections.sort().findIndex((c) => c === 'various');
  collections = collections.concat(collections.splice(variousIndex, 1));

  return collections;
};

exports.deslugify = (slug) => slug.split('-').join(' ');

exports.fontFamily = [
  'Raleway',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',');

exports.modifyFileName = (originalName, size, timestamp) => {
  const extName = path.extname(originalName);
  const baseName = path.basename(originalName, extName);

  return `${timestamp}_${baseName}_${size}${extName}`;
};

exports.formatFilesForUpload = (files) =>
  files.map((image) => {
    const timestamp = Date.now();
    const big = this.modifyFileName(
      image.originalname,
      imageSizes.big,
      timestamp
    );
    const medium = this.modifyFileName(
      image.originalname,
      imageSizes.medium,
      timestamp
    );
    const thumb = this.modifyFileName(
      image.originalname,
      imageSizes.thumb,
      timestamp
    );

    return [
      {
        ...image,
        path: big,
        big,
        dimensions: imageSizes.big,
      },
      {
        ...image,
        path: medium,
        medium,
        dimensions: imageSizes.medium,
      },
      {
        ...image,
        path: thumb,
        thumb,
        dimensions: imageSizes.thumb,
      },
    ];
  });

exports.extractFileNames = (arr) => {
  const removeKeys = arr.map((obj) => [obj.big, obj.medium, obj.thumb]);

  return [].concat(...removeKeys);
};

exports.extractFileNamesFromGroup = (arr) =>
  arr.reduce((acc, currentObj) => {
    const itemsArr = this.extractFileNames(currentObj.images);
    return acc.concat(itemsArr);
  }, []);

exports.getNamesOfAllSizes = (arr) =>
  arr.reduce((acc, thumb) => {
    const names = [
      thumb,
      thumb.replace(/92(\.\w+)$/, '300$1'),
      thumb.replace(/92(\.\w+)$/, '900$1'),
    ];
    return acc.concat(...names);
  }, []);

exports.amountInCents = (amount) => {
  const cents = amount * 100;
  return parseFloat(cents.toFixed(2));
};

exports.amountInPounds = (amount) => {
  const pounds = amount / 100;
  return pounds.toFixed(2);
};

exports.mediumToHighResolutionUri = (mediumResUrl) => {
  // new aws url
  if (mediumResUrl.match(/_300\./)) {
    return mediumResUrl.replace(/_300\./, '_900.');
  }
  // old url from the server
  return mediumResUrl.replace(/300\./, '.');
};

exports.makeObject = (items) =>
  items
    // remove images
    .map(({ images, ...rest }) => ({ ...rest }))
    // add index number to each
    .map((item, i) => {
      const keys = Object.keys(item);
      const newObj = {};
      keys.forEach((key) => {
        newObj[`${key}_${i}`] = item[key];
      });
      return newObj;
    })
    // combine into one object
    .reduce((acc, curr) => {
      const obj = { ...acc, ...curr };
      return obj;
    }, {});

exports.itemsObjectToArray = (obj) => {
  const separatedObject = Object.keys(obj).reduce((acc, cur) => {
    const suffix = cur.slice(-2);
    const prefix = cur.slice(0, -2);
    const object = { ...acc };
    object[suffix] = { ...object[suffix], [prefix]: obj[cur] };
    return object;
  }, {});

  const objKeys = Object.keys(separatedObject);
  return objKeys.map((item) => separatedObject[item]);
};
