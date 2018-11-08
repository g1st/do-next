import Typography from '@material-ui/core/Typography';

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
  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  state = {
    emailSent: false
  };

  handleEmailSend = state => {
    this.setState(() => {
      return { emailSent: state };
    });
  };

  render() {
    return (
      <Layout pathname={this.props.pathname}>
        <Wrapper>
          <ContactAbout>
            <ImageWrapper>
              <Image src="../static/images/message.svg" alt="Send a message" />
            </ImageWrapper>
            {this.state.emailSent ? null : (
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

export default Contact;
