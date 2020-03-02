import PropTypes from 'prop-types';
import Error from 'next/error';
import axios from 'axios';

import { appUrl } from '../config';
import Layout from '../components/Layout';

const CustomError = ({ statusCode, collections, pathname = '/' }) => (
  <Layout
    collections={collections}
    title="Jewellery artist Dovile Kondrasovaite | Dovile Jewellery"
    description="Contemporary amber and precious metals jewellery by an independent artist Dovile Kondrasovaite. Handmade in Birmingham's historic Jewellery Quarter, UK."
    pathname={pathname}
  >
    <Error statusCode={statusCode} />
  </Layout>
);

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const data = await axios.get(`${appUrl}/api/collections`);
  const collections = data.data;

  return { statusCode, collections };
};

export default CustomError;

CustomError.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collections: PropTypes.array.isRequired,
  pathname: PropTypes.string
};
