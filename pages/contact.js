import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Form from '../components/ContactForm';
import { Wrapper, ImagesWrapper, ImageWrapper, Image } from '../styles/Contact';

const Contact = ({ pathname, collections }) => (
  <Layout pathname={pathname} collections={collections}>
    <Wrapper>
      <ImagesWrapper>
        <ImageWrapper>
          <Image src="/static/images/d-4.JPG" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/static/images/cx-10.JPG" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/static/images/a-6.JPG" />
        </ImageWrapper>
      </ImagesWrapper>
      <Form />
    </Wrapper>
  </Layout>
);

Contact.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

Contact.getInitialProps = async ({ pathname }) => ({ pathname });

export default Contact;
