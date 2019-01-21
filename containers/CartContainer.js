import { Container } from 'unstated';
import Router from 'next/router';

export default class CartContainer extends Container {
  state = {
    selectedItems: [],
    count: 0,
    totalPrice: 0,
    totalItems: 0,
    buyItNow: {}
  };

  updateTotalPrice = items => {
    let total = 0;
    let totalItems = 0;

    if (items && items.length > 0) {
      this.setState(() => {
        for (let item of items) {
          total += item.price * item.quantity;
          totalItems += item.quantity;
        }
        return {
          totalPrice: total || 0,
          totalItems: totalItems || 0
        };
      });
    } else {
      this.setState(prevState => {
        for (let item of prevState.selectedItems) {
          total += item.price * item.quantity;
          totalItems += item.quantity;
        }
        return {
          totalPrice: total,
          totalItems
        };
      });
    }
  };

  removeOne = selectedItem => {
    this.setState(prevState => {
      let index = prevState.selectedItems.findIndex(
        item => item._id === selectedItem._id
      );

      prevState.selectedItems[index].quantity -= 1;
      this.updateTotalPrice();
    });
  };

  removeItem = selectedItem => {
    this.setState(prevState => {
      const newItems = prevState.selectedItems.filter(
        item => item._id !== selectedItem._id
      );

      if (newItems.length > 0) {
        let total = 0;
        let totalItems = 0;
        for (let item of newItems) {
          total += item.price * item.quantity;
          totalItems += item.quantity;
        }
        return {
          selectedItems: newItems,
          count: newItems.length,
          totalPrice: total,
          totalItems
        };
      }
      return {
        selectedItems: [],
        count: 0,
        totalPrice: 0,
        totalItems: 0
      };
    });
  };

  addItem = itemToAdd => {
    this.setState(prevState => {
      let index = prevState.selectedItems.findIndex(
        item => item._id === itemToAdd._id
      );
      let updatedItems;

      if (index >= 0) {
        prevState.selectedItems[index].quantity += 1;
        updatedItems = prevState.selectedItems;
      } else {
        itemToAdd.quantity = 1;
        updatedItems = prevState.selectedItems.concat(itemToAdd);
      }

      this.updateTotalPrice(updatedItems);

      return { selectedItems: updatedItems, count: updatedItems.length };
    });
  };

  buyItem = itemToBuy => {
    this.setState(
      () => ({ buyItNow: itemToBuy }),
      () => Router.push('/checkout')
    );
  };

  checkout = () => {
    this.setState(() => ({ buyItNow: {} }), () => Router.push('/checkout'));
  };

  clear = () => {
    this.setState(() => ({
      selectedItems: [],
      count: 0,
      totalPrice: 0,
      totalItems: 0,
      buyItNow: {}
    }));
  };
}
