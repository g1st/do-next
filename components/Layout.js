import { Subscribe } from 'unstated';
import { NavBarContainer } from '../containers';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';
import { LayoutWrapper } from '../styles/LayoutWrapper';

const Layout = props => {
  return (
    <LayoutWrapper>
      <Subscribe to={[NavBarContainer]}>
        {navbar => {
          return (
            <div>
              <NavBar navbar={navbar} pathname={props.pathname} />
            </div>
          );
        }}
      </Subscribe>
      <Main>{props.children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
