const path = require('path');
const { imageSizes } = require('./globals');

exports.cartHelper = {
  totalItems(cart) {
    return cart.reduce((acc, item) => {
      const items = acc + item.quantity;
      return items;
    }, 0);
  },

  totalPrice(cart, shippingCost = 0) {
    const basePrice = cart.reduce((acc, item) => {
      const price = acc + item.price * item.quantity;
      return price;
    }, 0);
    const totalPrice = basePrice + shippingCost;
    return totalPrice;
  },

  priceToPay(buyItNow, buyItNowItem, cart, shippingCost, discount) {
    let price = buyItNow
      ? this.totalPrice([buyItNowItem], shippingCost)
      : this.totalPrice(cart, shippingCost);

    if (discount) {
      price *= (100 - discount) / 100;
    }

    return price.toFixed(2);
  }
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

exports.saveCart = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.log(err);
  }
};

exports.onImageError = event => {
  const defaultImage = '/static/images/fallback.png';

  if (event.target.src.indexOf('/static/images/fallback.png') === -1) {
    event.target.src = defaultImage;
    event.target.srcset = '';
  }
};

exports.pluralise = category => {
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

exports.generatePaymentResponse = intent => {
  if (
    (intent.status === 'requires_action' ||
      intent.status === 'requires_source_action') &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    };
  }

  if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  }

  // Invalid status
  return {
    errors: [{ msg: 'Invalid PaymentIntent status', param: '_error' }]
  };
};

exports.getPurchaseDetails = (buyItNowItem, shippingCost, cart, promo = 0) => {
  if (Object.prototype.hasOwnProperty.call(buyItNowItem, 'name')) {
    return {
      ...buyItNowItem,
      shippingCost,
      boughtFrom: 'buyItNow',
      promo
    };
  }

  const selectedItems = cart;
  const totalItems = this.cartHelper.totalItems(cart);
  const totalPrice = this.cartHelper.totalPrice(cart);

  return {
    selectedItems,
    totalItems,
    totalPrice,
    boughtFrom: 'cart',
    shippingCost,
    promo
  };
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
  return collections;
};

exports.deslugify = slug => slug.split('-').join(' ');

exports.fontFamily = [
  'Raleway',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif'
].join(',');

exports.modifyFileName = (originalName, size, timestamp) => {
  const extName = path.extname(originalName);
  const baseName = path.basename(originalName, extName);

  return `${timestamp}_${baseName}_${size}${extName}`;
};

exports.formatFilesForUpload = files =>
  files.map(image => {
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
        dimensions: imageSizes.big
      },
      {
        ...image,
        path: medium,
        medium,
        dimensions: imageSizes.medium
      },
      {
        ...image,
        path: thumb,
        thumb,
        dimensions: imageSizes.thumb
      }
    ];
  });

exports.extractFileNames = arr => {
  const removeKeys = arr.map(obj => [obj.big, obj.medium, obj.thumb]);

  return [].concat(...removeKeys);
};

exports.extractFileNamesFromGroup = arr =>
  arr.reduce((acc, currentObj) => {
    const itemsArr = this.extractFileNames(currentObj.images);
    return acc.concat(itemsArr);
  }, []);

exports.getNamesOfAllSizes = arr =>
  arr.reduce((acc, thumb) => {
    const names = [
      thumb,
      thumb.replace(/92(\.\w+)$/, '300$1'),
      thumb.replace(/92(\.\w+)$/, '900$1')
    ];
    return acc.concat(...names);
  }, []);

exports.amountInCents = amount => {
  const cents = amount * 100;
  return parseFloat(cents.toFixed(2));
};
