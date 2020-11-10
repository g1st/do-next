import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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
  Logo,
} from '../../styles/Footer';

import FacebookPNG from '../../public/images/facebook-box.png';
import InstagramPNG from '../../public/images/instagram.png';
import PinterestPNG from '../../public/images/pinterest-box.png';
import DovileLogo from '../../public/images/logo.svg';

const styles = {
  links: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    color: 'rgba(0, 0, 0, .74)',
    padding: '18px',
    '@media (min-width: 960px)': {
      marginBottom: 0,
    },
  },
  root: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },
};

const Footer = (props) => {
  const { classes } = props;
  const router = useRouter();

  const handleKeyDown = (value, key) => {
    if (key === 'Enter' || key === ' ') {
      router.push(value);
    }
  };

  return (
    <Wrapper>
      <Divider />
      <BrandLogo>
        <Logo src={DovileLogo} alt="Dovile Ko logo" />
      </BrandLogo>
      <FlexContainer>
        <Social>
          <AnchorLink
            href="https://www.facebook.com/artdovile/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Dovile's facebook page"
          >
            <Facebook src={FacebookPNG} alt="Facebook logo" />
          </AnchorLink>
          <AnchorLink
            href="https://www.instagram.com/dovilekojewellery/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Dovile's instagram page"
          >
            <Instagram src={InstagramPNG} alt="Instagram logo" />
          </AnchorLink>
          <AnchorLink
            href="https://www.pinterest.com/dovilejewellery/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Dovile's pinterest page"
          >
            <Pinterest src={PinterestPNG} alt="Pinterest logo" />
          </AnchorLink>
        </Social>
        <FooterLinks>
          <FooterLink>
            <Link href="/terms-conditions">
              <AnchorLink
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown('/terms-conditions', e.key)}
              >
                <Typography className={classes.links}>
                  Terms &amp; Conditions
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="/care-guide">
              <AnchorLink
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown('/care-guide', e.key)}
              >
                <Typography className={classes.links}>
                  Jewellery Care
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="/commissions">
              <AnchorLink
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown('/commissions', e.key)}
              >
                <Typography className={classes.links}>Commissions</Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="/privacy-policy">
              <AnchorLink
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown('/privacy-policy', e.key)}
              >
                <Typography className={classes.links}>
                  Privacy Policy
                </Typography>
              </AnchorLink>
            </Link>
          </FooterLink>
        </FooterLinks>
      </FlexContainer>
      <Typography color="textSecondary" classes={{ root: classes.root }}>
        &copy; 2015&mdash;{new Date().getFullYear()} Dovile Ko
      </Typography>
    </Wrapper>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
