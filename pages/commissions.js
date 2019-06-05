import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  Figure,
  ImageWrapper,
  Text
} from '../styles/Commissions';
import { Mail } from '../styles/Shared';

const styles = () => ({
  heading: {
    fontSize: '1.2rem',
    paddingTop: '20px'
  }
});

const Commissions = ({ collections, classes }) => (
  <Layout
    pathname={false}
    collections={collections}
    title="Commissions | Dovile Jewellery"
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src="../static/images/ffffr-12.JPG" alt="Cufflinks" />
        </Figure>
      </ImageWrapper>
      <Text>
        <Typography
          color="secondary"
          variant="body1"
          gutterBottom
          className={classes.heading}
        >
          COMMISSIONS
        </Typography>
        <Typography align="justify" paragraph variant="body2">
          For me, working to commission is to offer clients the opportunity to
          have an input into their piece of jewellery. Essentially, the client
          likes my style of work, and there are several particular elements of
          which they would like to include in their design. It is always a
          pleasure to create the personalised piece, especially if it is a
          surprise for somebody else.
        </Typography>
        <Typography align="justify" paragraph variant="body2">
          Despite my original art jewellery pieces in wood and amber, I do
          commissions in silver and gold such as wedding rings, engagement rings
          etc.
        </Typography>
        <Typography align="justify" paragraph variant="body2">
          Please note I do not make any other designs taken from other makers. I
          am accepting the idea for the customised item only fitting my vision
          and my aesthetics, work principles.
        </Typography>
        <Typography align="justify" paragraph variant="body2">
          The design, price, timing and delivery are discussed individually by
          e-mail or in person.
        </Typography>
        <Typography align="justify" paragraph variant="body2">
          For any interest, please contact me{' '}
          <Mail
            href="mailto:&#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;"
            target="_top"
          >
            &#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;
          </Mail>
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

Commissions.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Commissions);
