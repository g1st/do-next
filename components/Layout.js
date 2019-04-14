import PropTypes from 'prop-types';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';
import { LayoutWrapper } from '../styles/LayoutWrapper';

const Layout = ({ children, collections, pathname }) => (
  <LayoutWrapper>
    <div>
      <NavBar pathname={pathname} collections={collections} />
    </div>
    <Main>{children}</Main>
    <Footer />
  </LayoutWrapper>
);

Layout.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node
};

export default Layout;
