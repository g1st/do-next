import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px 5px 20px 5px;
  @media (min-width: 960px) {
    padding: 20px 0;
  }
`;
Wrapper.displayName = 'Wrapper';

export const BrandLogo = styled.div`
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 960px) {
    height: 340px;
  }
`;
BrandLogo.displayName = 'BrandLogo';

export const Logo = styled.img``;
Logo.displayName = 'Logo';

export const FlexContainer = styled.div`
  @media (min-width: 960px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;
FlexContainer.displayName = 'FlexContainer';

export const FlexItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
FlexItem.displayName = 'FlexItem';

export const FlexItemDouble = styled.div`
  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  text-align: center;
`;
FlexItemDouble.displayName = 'FlexItemDouble';

export const DoubleItemsWrapper = styled.div``;
DoubleItemsWrapper.displayName = 'DoubleItemsWrapper';

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
  padding-bottom: 20px;
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

    &:hover {
      text-decoration: underline;
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
