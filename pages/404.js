import PropTypes from 'prop-types';
import Error from 'next/error';

import Layout from '../components/Layout';

const CustomError = ({
  pathname = '/',
  collections = ['flow', 'silver-flow', 'various'],
}) => (
  <Layout
    collections={collections}
    title="Jewellery artist Dovile Kondrasovaite | Dovile Ko"
    description="Contemporary amber and precious metals jewellery by an independent artist Dovile Kondrasovaite. Handmade in Birmingham's historic Jewellery Quarter, UK."
    pathname={pathname}
  >
    <Error statusCode={404} />
  </Layout>
);

CustomError.propTypes = {
  pathname: PropTypes.string,
  collections: PropTypes.arrayOf(PropTypes.string),
};

export default CustomError;
