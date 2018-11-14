import { Container } from 'unstated';

export default class CartContainer extends Container {
  state = {
    selectedItems: [],
    count: 0
  };

  // removeItem = el => {
  //   const newItems = this.state.selectedItems.filter(item => item !== el);
  //   this.setState({ selectedItems: newItems, count: newItems.length });
  // };

  addItem = el => {
    this.setState(prevState => {
      let updatedItems = prevState.selectedItems.concat(el);
      return {
        selectedItems: updatedItems,
        count: updatedItems.length
      };
    });
  };
}
