import styled from 'styled-components';
import { WidthContainer } from './Shared';

export const Wrapper = styled(WidthContainer)`
  padding: 40px 5px 20px 5px;
  position: relative;
  flex-shrink: 0;
  @media (min-width: 960px) {
    padding: 80px 0 20px 0;
    margin-top: 100px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const BrandLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: static;
`;
BrandLogo.displayName = 'BrandLogo';

export const Logo = styled.img`
  width: 200px;
  margin: 40px auto 0 auto;
`;
Logo.displayName = 'Logo';

export const FlexContainer = styled.div`
  padding-top: 40px;
  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  text-align: center;
`;
FlexContainer.displayName = 'FlexContainer';

export const Facebook = styled.img`
  padding: 1.2em;
`;
Facebook.displayName = 'Facebook';

export const Instagram = styled.img`
  padding: 1.2em;
`;
Instagram.displayName = 'Instagram';

export const Pinterest = styled.img`
  padding: 1.2em;
`;
Pinterest.displayName = 'Pinterest';

export const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 260px;
  margin: 0 auto;
`;
Social.displayName = 'Social';

export const FooterLinks = styled.ul`
  list-style: none;
  list-style-type: none;
  padding: 20px 0 0 0;
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 960px) {
    padding: 0;
    margin-top: 40px;
  }
`;
FooterLinks.displayName = 'FooterLinks';

export const FooterLink = styled.li`
  margin-bottom: 14px;
  a {
    line-height: 28px;
    color: rgba(0, 0, 0, 0.54);
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (min-width: 960px) {
    display: inline-block;
    margin-bottom: 16px;
    margin-right: 20px;
    /* padding: 18px; */
    &:last-child {
      margin-right: 0;
    }
  }
`;
FooterLink.displayName = 'FooterLink';

export const AnchorLink = styled.a`
  cursor: pointer;
`;
AnchorLink.displayName = 'AnchorLink';

export const Mail = styled.a`
  color: rgba(0, 0, 0, 0.54);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
AnchorLink.displayName = 'AnchorLink';
