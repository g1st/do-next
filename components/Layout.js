import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';
import { LayoutWrapper } from '../styles/LayoutWrapper';

const Layout = props => {
  return (
    <LayoutWrapper>
      <div>
        <NavBar pathname={props.pathname} />
      </div>
      <Main>{props.children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
