import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  Wrapper,
  FlexContainer,
  FlexItem,
  FlexItemDouble,
  DoubleItemsWrapper,
  BrandLogo,
  Social,
  FooterLinks,
  FooterLink,
  AnchorLink,
  Facebook,
  Instagram,
  Pinterest,
  Mail,
  Logo
} from '../../styles/Footer';

const styles = {
  links: {
    color: 'rgba(0, 0, 0, .54)'
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
      <FlexContainer>
        <FlexItem>
          <BrandLogo>
            <Logo
              src="../../static/images/logo.png"
              alt="Dovile Jewellery logo"
            />
          </BrandLogo>
        </FlexItem>
        <FlexItemDouble>
          <DoubleItemsWrapper>
            <Social>
              <AnchorLink
                href="https://www.facebook.com/artdovile/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook src="/static/images/facebook-box.png" />
              </AnchorLink>
              <AnchorLink
                href="https://www.instagram.com/dovilejewellery/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram src="/static/images/instagram.png" />
              </AnchorLink>
              <AnchorLink
                href="https://www.pinterest.com/dovilejewellery/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pinterest src="/static/images/pinterest-box.png" />
              </AnchorLink>
            </Social>
            <Typography color="textSecondary">
              Dovile Jewellery, Jewellery Quarter, Birmingham, UK |{' '}
              <Mail href="mailto:hello@dovilejewellery.com" target="_top">
                hello@dovilejewellery.com
              </Mail>
            </Typography>
          </DoubleItemsWrapper>
        </FlexItemDouble>
        <FlexItem>
          <FooterLinks>
            <FooterLink>
              <Link href="/terms-conditions">
                <a>
                  <Typography gutterBottom style={styles.links}>
                    Terms & Conditions
                  </Typography>
                </a>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/care-guide">
                <a>
                  <Typography gutterBottom style={styles.links}>
                    Jewellery Care Guide
                  </Typography>
                </a>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/commissions">
                <a>
                  <Typography style={styles.links}>Commissions</Typography>
                </a>
              </Link>
            </FooterLink>
          </FooterLinks>
        </FlexItem>
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
