import PropTypes from 'prop-types';
import Head from 'next/head';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';

const Layout = ({
  children,
  collections,
  pathname,
  title = 'Jewellery artist Dovile Kondrasovaite | Dovile Ko',
  description = "Contemporary amber and precious metals jewellery by an independent artist Dovile Kondrasovaite. Handmade in Birmingham's historic Jewellery Quarter, UK.",
  user,
  image = '/images/Dovile-Kondrasovaite.jpeg',
  piecePath,
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={process.env.NEXT_PUBLIC_APP_URL + image} />
      <meta
        property="og:url"
        content={piecePath || process.env.NEXT_PUBLIC_APP_URL + pathname}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_APP_URL + image}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@DKondrasovaite" />
      {piecePath && (
        <>
          <meta property="og:image:width" content="900" />
          <meta property="og:image:height" content="900" />
        </>
      )}
    </Head>
    <div>
      <NavBar pathname={pathname} collections={collections} user={user} />
    </div>
    <Main>{children}</Main>
    <Footer />
  </>
);

Layout.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.string,
  image: PropTypes.string,
  piecePath: PropTypes.string,
};

export default Layout;
