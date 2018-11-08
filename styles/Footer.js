import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px 5px 20px 5px;
  @media (min-width: 960px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const BrandLogo = styled.div`
  padding-top: 40px;

  @media (min-width: 960px) {
    padding-top: 0px;
  }
`;
BrandLogo.displayName = 'BrandLogo';

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
    justify-content: space-between;
  }
  /* align-items: center; */
  text-align: center;
  height: 50%;
`;
FlexItemDouble.displayName = 'FlexItemDouble';

export const Facebook = styled.img`
  /* height: 24px; */
`;
Facebook.displayName = 'Facebook';

export const Instagram = styled.img``;
Instagram.displayName = 'Instagram';

export const Pinterest = styled.img``;
Pinterest.displayName = 'Pinterest';

export const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin: 0 auto;
  padding: 40px 0;
`;
Social.displayName = 'Social';

export const FooterLinks = styled.ul`
  list-style: none;
  list-style-type: none;
  padding: 0;
  text-align: center;
`;
FooterLinks.displayName = 'FooterLinks';

export const FooterLink = styled.li`
  a {
    line-height: 28px;
    color: rgba(0, 0, 0, 0.54);
    text-decoration: none;
  }
`;
FooterLink.displayName = 'FooterLink';

export const AnchorLink = styled.a``;
AnchorLink.displayName = 'AnchorLink';

export const Mail = styled.a`
  color: rgba(0, 0, 0, 0.54);
  text-decoration: none;
`;
AnchorLink.displayName = 'AnchorLink';
