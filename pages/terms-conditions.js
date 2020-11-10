import PropTypes from 'prop-types';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  ImageWrapper,
  Text,
  Figure,
} from '../styles/TermsAndConditions';
import { StyledAnchorLink } from '../styles/Shared';
import TermsImage from '../public/images/terms-conditions.JPG';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    margin: '4rem 0 2rem 0',
  },
});

const TermsAndConditions = ({ collections, classes, user }) => (
  // For Material UI Tabs to know this endpoint not needed
  <Layout
    pathname={false}
    collections={collections}
    title="Terms and Conditions | Dovile Ko"
    user={user}
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src={TermsImage} alt="Jewellery packaging boxes" />
          <figcaption>
            <Typography
              align="center"
              variant="subtitle2"
              style={{ fontWeight: 300 }}
            >
              FLOW n°B13 and n°B12 | brooches | handcarved ebony
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
          INFORMATION ON THE SITE
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          At www.dovileko.com, I make every effort to ensure that online gallery
          &amp; shop is as accurate and complete as possible. In order to give
          you the opportunity to view pieces in full detail, some pieces may
          appear larger or smaller than their actual size in photographs; and
          since every computer monitor is set differently, size or colour may
          vary slightly.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          PRODUCT AVAILABILITY
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          All of Dovile Ko jewellery is made by me at my workshop in
          Birmingham’s famous Jewellery Quarter. If you are interested in a
          piece that is currently not available to purchase, please contact me
          to discuss a commission in related design to meet your personal needs.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Production times are indicated on each item, usually, it takes 1-4
          weeks plus shipping time. If you have any questions, please do not
          hesitate to contact me.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          SHIPPING
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Packages will be mailed by Royal Mail Tracked & Signed services within
          3 business days of purchase and payment.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          PLEASE NOTE that <i>made to order</i> items producing times are
          indicated at each piece’s description. Producing times and delivery
          options for commissions are discussed individually by{' '}
          <Link href="/contact">
            <StyledAnchorLink>e-mail</StyledAnchorLink>
          </Link>
          .
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          I always obtain proof of postage but if you would like to upgrade
          postage (e.g. next day delivery or express) or make any other changes
          to how your item is shipped please contact me and I will be happy to
          supply pricing for alternative methods.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Please be sure you've entered the correct shipping address at the
          checkout.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          SHIPPING COSTS
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Shipping is free of charge.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Delivery times will vary but usually, it is 1-3 days for UK, 3-7 days
          for Europe and 5-10 days worldwide. Delivery times may be extended
          during particularly busy periods such as Christmas.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          If you are an international customer, please note that you are
          responsible for any duties and customs charges that may be incurred.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          REFUND
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          All of my jewellery is handmade by me and one of a kind, therefore, I
          hope that you are completely happy with your item when it arrives. If
          you are unhappy with it for any reason, please just let me know first
          to resolve the issue.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          I accept returns provided the request is made within 14 days after
          receiving the item. Refund will be made once I receive the item unused
          to its original condition and in its original packaging. If you do not
          have the original packaging item should be packaged carefully to
          ensure safe arrival as it was shipped to you.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          I will refund the total amount of purchase. Return shipping costs are
          the responsibility of the buyer.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Custom made items cannot be returned &amp; refunded.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Items cannot be refunded in the event of exceeding the 14 days return
          policy.
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
