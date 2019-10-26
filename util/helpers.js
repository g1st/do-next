exports.cartHelper = {
  totalItems: cart =>
    cart.reduce((acc, item) => {
      const items = acc + item.quantity;
      return items;
    }, 0),

  totalPrice: (cart, shippingCost = 0) => {
    const basePrice = cart.reduce((acc, item) => {
      const price = acc + item.price * item.quantity;
      return price;
    }, 0);
    const totalPrice = basePrice + shippingCost;
    return totalPrice;
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
  const defaultImage = '/images/fallback.png';

  if (event.target.src.indexOf('/images/fallback.png') === -1) {
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

exports.getPurchaseDetails = (buyItNowItem, shippingCost, cart) => {
  if (Object.prototype.hasOwnProperty.call(buyItNowItem, 'name')) {
    return {
      ...buyItNowItem,
      shippingCost,
      boughtFrom: 'buyItNow'
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
    shippingCost
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
