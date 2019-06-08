import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  Wrapper,
  FlexContainer,
  BrandLogo,
  Social,
  FooterLinks,
  FooterLink,
  AnchorLink,
  Facebook,
  Instagram,
  Pinterest,
  Logo
} from '../../styles/Footer';

const styles = {
  links: {
    color: 'rgba(0, 0, 0, .54)',
    '@media (min-width: 960px)': {
      marginBottom: 0
    }
  },
  root: {
    textAlign: 'center'
  }
};

const Footer = props => {
  const { classes } = props;
  return (
    <Wrapper>
      <Divider />
      <BrandLogo>
        <Logo src="../../static/images/logo.svg" alt="Dovile Jewellery logo" />
      </BrandLogo>
      <FlexContainer>
        <Social>
          <AnchorLink
            href="https://www.facebook.com/artdovile/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Dovile's facebook page"
          >
            <Facebook
              src="/static/images/facebook-box.png"
              alt="Facebook logo"
            />
          </AnchorLink>
          <AnchorLink
            href="https://www.instagram.com/dovilejewellery/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Dovile's instagram page"
          >
            <Instagram
              src="/static/images/instagram.png"
              alt="Instagram logo"
            />
          </AnchorLink>
          <AnchorLink
            href="https://www.pinterest.com/dovilejewellery/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Dovile's pinterest page"
          >
            <Pinterest
              src="/static/images/pinterest-box.png"
              alt="Pinterest logo"
            />
          </AnchorLink>
        </Social>
        <FooterLinks>
          <FooterLink>
            <Link href="/terms-conditions">
              <AnchorLink>
                <Typography inline className={classes.links}>
                  Terms &amp; Conditions
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="/care-guide">
              <AnchorLink>
                <Typography inline className={classes.links}>
                  Jewellery Care
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="/commissions">
              <AnchorLink>
                <Typography inline className={classes.links}>
                  Commissions
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="/privacy-policy">
              <AnchorLink>
                <Typography inline className={classes.links}>
                  Privacy Policy
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
        </FooterLinks>
      </FlexContainer>
      <Typography color="textSecondary" classes={{ root: classes.root }}>
        &copy; {new Date().getFullYear()} Dovile Jewellery
      </Typography>
    </Wrapper>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
