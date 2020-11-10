import PropTypes from 'prop-types';
import Error from 'next/error';
import axios from 'axios';

import Layout from '../components/Layout';

const CustomError = ({ statusCode, collections, pathname = '/' }) => (
  <Layout
    collections={collections}
    title="Jewellery artist Dovile Kondrasovaite | Dovile Ko"
    description="Contemporary amber and precious metals jewellery by an independent artist Dovile Kondrasovaite. Handmade in Birmingham's historic Jewellery Quarter, UK."
    pathname={pathname}
  >
    <Error statusCode={statusCode} />
  </Layout>
);

CustomError.getInitialProps = async ({ res, err }) => {
  let statusCode;
  if (res) {
    statusCode = res.statusCode;
  } else {
    statusCode = err ? err.statusCode : 404;
  }
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/collections`
  );
  const collections = data.data;

  return { statusCode, collections };
};

export default CustomError;

CustomError.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collections: PropTypes.array.isRequired,
  pathname: PropTypes.string,
};
