import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import {
  Wrapper,
  FlexContainer,
  FlexItem,
  FlexItemDouble,
  BrandLogo,
  Social,
  FooterLinks,
  FooterLink,
  AnchorLink,
  Facebook,
  Instagram,
  Pinterest,
  Mail
} from '../../styles/Footer';

const styles = {
  links: {
    color: 'rgba(0, 0, 0, .54)'
  }
};

const Footer = () => {
  return (
    <Wrapper>
      <Divider />
      <FlexContainer>
        <FlexItem>
          <BrandLogo>
            {/* <Logo /> */}
            <div>logo ale</div>
          </BrandLogo>
        </FlexItem>
        <FlexItemDouble>
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
    </Wrapper>
  );
};

export default Footer;
