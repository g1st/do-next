import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  ImageWrapper,
  Text,
  Figure,
  List,
  ListItem,
} from '../styles/TermsAndConditions';
import PrivacyImage from '../public/images/privacy-policy.JPG';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    margin: '4rem 0 2rem 0',
  },
});

const TermsAndConditions = ({ collections, classes, user }) => (
  <Layout
    pathname={false}
    collections={collections}
    title="Privacy Policy | Dovile Ko"
    user={user}
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src={PrivacyImage} alt="Jewellery packaging boxes" />
          <figcaption>
            <Typography
              align="center"
              variant="subtitle2"
              style={{ fontWeight: 300 }}
            >
              FLOW earrings, ring, brooch, cufflinks | handcarved ebony, gold
              plated silver
            </Typography>
          </figcaption>
        </Figure>
      </ImageWrapper>
      <Text>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          PRIVACY POLICY
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          This privacy policy describes how Dovile Ko collects and uses personal
          information in accordance with the GDPR (General Data Protection
          Regulations).
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Personal information is any data which can identify an individual,
          which would include your name, postal address and email address.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          You can change your mind at any time by clicking the unsubscribe link
          in the footer of any marketing email you receive from me, or by
          contacting me at
          &#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;.
          I will treat your information with respect. By signing up to my
          mailing list, visiting this website, corresponding via email, you
          agree that I may process your information in accordance with these
          terms.
        </Typography>
        <Typography variant="body1" gutterBottom color="secondary">
          I may collect, store and use the following kinds of personal data:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              information provided as a result of a sale (name, email address,
              billing & delivery address);
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              information that you provide me for the purpose of subscribing to
              my email newsletter (name and email address);
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              any other information that you provide when communicating with me
              by any means;
            </Typography>
          </ListItem>
        </List>

        <Typography variant="body1" gutterBottom color="secondary">
          I may use your personal information to:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              send you items purchased via the website;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              send statements and invoices to you, and collect payments from
              you;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              send you general communications;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              send you my email newsletter (you can unsubscribe at any time);
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              keep the website secure and prevent fraud;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              if you give me feedback (in the form of testimonials), I may use
              it to improve my services and I may publish it online or offline
              to promote the business and my services. I will always ask for
              permission before publishing.
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" paragraph color="secondary">
          If you purchase a product from me, your card information is not held
          by me, it is collected by a third-party payment processor Stripe, who
          specialises in the secure online capture and processing of
          credit/debit card transactions.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          I will not sell, distribute or lease your personal information to
          external third parties, except as provided in this privacy policy.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

TermsAndConditions.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

TermsAndConditions.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(TermsAndConditions);
