import PropTypes from 'prop-types';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';
import { LayoutWrapper } from '../styles/LayoutWrapper';

const Layout = props => {
  return (
    <LayoutWrapper>
      <div>
        <NavBar pathname={props.pathname} collections={props.collections} />
      </div>
      <Main>{props.children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

Layout.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

export default Layout;
