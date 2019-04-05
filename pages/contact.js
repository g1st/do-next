import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import Layout from '../components/Layout';
import Form from '../components/ContactForm';
import {
  Wrapper,
  ContactAbout,
  Text,
  ImageWrapper,
  Image
} from '../styles/Contact';

class Contact extends React.Component {
  state = {
    emailSent: false
  };

  handleEmailSend = state => {
    this.setState(() => ({ emailSent: state }));
  };

  render() {
    const { pathname, collections } = this.props;
    const { emailSent } = this.state;

    return (
      <Layout pathname={pathname} collections={collections}>
        <Wrapper>
          <ContactAbout>
            <ImageWrapper>
              <Image src="../static/images/message.svg" alt="Send a message" />
            </ImageWrapper>
            {emailSent ? null : (
              <Text>
                <Typography align="left" paragraph color="secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  qui possimus necessitatibus voluptates cumque dolore unde. Sit
                  aliquid accusamus quaerat, recusandae earum neque ex saepe
                  soluta. Ipsam, qui dolorem, officiis culpa!
                </Typography>
              </Text>
            )}
          </ContactAbout>
          <Form onEmailSend={this.handleEmailSend} />
        </Wrapper>
      </Layout>
    );
  }
}

Contact.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

Contact.getInitialProps = async ({ pathname }) => ({ pathname });

export default Contact;
