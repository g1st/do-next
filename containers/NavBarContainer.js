import { Container } from 'unstated';

export default class NavBarContainer extends Container {
  state = {
    smallBar: true,
    drawerNav: false,
    drawerCart: false
  };

  change = () =>
    this.setState(prevState => ({ smallBar: !prevState.smallBar }));
}
