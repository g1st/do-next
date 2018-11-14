import React from 'react';
import { Subscribe } from 'unstated';

import CartContainer from '../../containers/CartContainer';

const CartDrawerContent = () => (
  <Subscribe to={[CartContainer]}>
    {cart => (
      <div>
        <div>this is CartDrawerContent cia vidus:</div>
        <ul>
          {cart.state.selectedItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div>{cart.state.count}</div>
        <div>
          <button value={'test'} onClick={el => cart.addItem(el.target.value)}>
            Add Item
          </button>
        </div>
        <div>hi</div>
      </div>
    )}
  </Subscribe>
);

export default CartDrawerContent;
