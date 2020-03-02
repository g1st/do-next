import PropTypes from 'prop-types';
import Head from 'next/head';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';
import { LayoutWrapper } from '../styles/LayoutWrapper';

const Layout = ({
  children,
  collections,
  pathname,
  title = 'Jewellery artist Dovile Kondrasovaite | Dovile Jewellery',
  description = "Contemporary amber and precious metals jewellery by an independent artist Dovile Kondrasovaite. Handmade in Birmingham's historic Jewellery Quarter, UK.",
  user
}) => (
  <LayoutWrapper>
    <Head>
      <title>{title}</title>
      <meta name="Description" content={description} />
    </Head>
    <div>
      <NavBar pathname={pathname} collections={collections} user={user} />
    </div>
    <Main>{children}</Main>
    <Footer />
  </LayoutWrapper>
);

Layout.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.string
};

export default Layout;
