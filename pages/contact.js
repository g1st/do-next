import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import Layout from '../components/Layout';
import Form from '../components/ContactForm';
import { Wrapper, ImagesWrapper, ImageWrapper, Image } from '../styles/Contact';
import { Mail } from '../styles/Shared';

const Contact = ({ pathname, collections, user }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="Contact | Dovile Jewellery"
    user={user}
  >
    <Wrapper>
      <ImagesWrapper>
        <ImageWrapper>
          <Image src="/images/d-4.JPG" alt="Wooden materials" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/images/cx-10.JPG" alt="Bench peg" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/images/a-6.JPG" alt="Process" />
        </ImageWrapper>
      </ImagesWrapper>
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <Typography
          align="center"
          variant="body2"
          style={{
            marginTop: '50px',
            maxWidth: '720px',
            display: 'inline-block'
          }}
        >
          If you would like to contact me to discuss a commission or have any
          other questions please fill in the form below or send me an e-mail to{' '}
          <Mail
            href="mailto:&#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;"
            target="_top"
          >
            &#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;
          </Mail>
        </Typography>
      </div>
      <Form />
    </Wrapper>
  </Layout>
);

Contact.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.string
};

Contact.getInitialProps = async ({ pathname }) => ({ pathname });

export default Contact;
