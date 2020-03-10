import PropTypes from 'prop-types';
import Head from 'next/head';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';
import { LayoutWrapper } from '../styles/LayoutWrapper';
import { appUrl } from '../config';

const Layout = ({
  children,
  collections,
  pathname,
  title = 'Jewellery artist Dovile Kondrasovaite | Dovile Jewellery',
  description = "Contemporary amber and precious metals jewellery by an independent artist Dovile Kondrasovaite. Handmade in Birmingham's historic Jewellery Quarter, UK.",
  user,
  image = '/static/images/Dovile-Kondrasovaite.jpeg'
}) => (
  <LayoutWrapper>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={appUrl + image} />
      <meta property="og:url" content={pathname} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={appUrl + image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@DKondrasovaite" />
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
  user: PropTypes.string,
  image: PropTypes.string
};

export default Layout;
