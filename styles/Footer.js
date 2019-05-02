import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px 5px 20px 5px;
  position: relative;
  flex-shrink: 0;
  @media (min-width: 960px) {
    padding: 80px 0 40px 0;
  }
`;
Wrapper.displayName = 'Wrapper';

export const BrandLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: static;

  @media (min-width: 960px) {
    position: absolute;
    top: 120px;
    left: 60px;
  }
`;
BrandLogo.displayName = 'BrandLogo';

export const Logo = styled.img`
  width: 80px;
  margin: 20px auto 0 auto;
  @media (min-width: 960px) {
    margin-top: 0;
  }
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

export const Facebook = styled.img``;
Facebook.displayName = 'Facebook';

export const Instagram = styled.img``;
Instagram.displayName = 'Instagram';

export const Pinterest = styled.img``;
Pinterest.displayName = 'Pinterest';

export const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  padding-bottom: 15px;
  margin: 0 auto;
`;
Social.displayName = 'Social';

export const FooterLinks = styled.ul`
  list-style: none;
  list-style-type: none;
  padding: 20px 0;
  text-align: center;

  @media (min-width: 960px) {
    padding: 0;
  }
`;
FooterLinks.displayName = 'FooterLinks';

export const FooterLink = styled.li`
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
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
FooterLink.displayName = 'FooterLink';

export const AnchorLink = styled.a``;
AnchorLink.displayName = 'AnchorLink';

export const Mail = styled.a`
  color: rgba(0, 0, 0, 0.54);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
AnchorLink.displayName = 'AnchorLink';
