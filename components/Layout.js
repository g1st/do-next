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
  description = 'Contemporary amber jewellery with a delicate and modern touch by Dovile Kondrasovaite. Shop authentic handmade jewelry made by independent artist.'
}) => (
  <LayoutWrapper>
    <Head>
      <title>{title}</title>
      <meta name="Description" content={description} />
    </Head>
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
