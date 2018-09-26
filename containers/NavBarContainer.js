import { Container } from 'unstated';

export default class NavBarContainer extends Container {
  state = {
    desktopNavBar: false
  };

  // static async getInitialProps(ctx) {
  //   this.setState(() => {
  //     desktopNavBar: true;
  //   });
  //   return {};
  // }
  change = () =>
    this.setState(prevState => {
      return { desktopNavBar: !prevState.desktopNavBar };
    });
}
