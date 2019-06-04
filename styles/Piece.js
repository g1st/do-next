import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 960px) {
    display: flex;
    padding-top: 40px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 2rem auto 1.6rem auto;
  @media (min-width: 960px) {
    margin: 2rem 0 1.6rem 0;
  }
`;
ButtonsWrapper.displayName = 'ButtonsWrapper';

export const Images = styled.div`
  max-width: 525px;
  margin: 0 auto 40px auto;
  @media (min-width: 960px) {
    width: 60%;
  }
`;
Images.displayName = 'Images';

export const Info = styled.div`
  @media (min-width: 960px) {
    padding-left: 50px;
    width: 40%;
  }
`;
Info.displayName = 'Info';

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
Text.displayName = 'Text';

export const AnchorLink = styled.a`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
AnchorLink.displayName = 'AnchorLink';

export const ListInfo = styled.ul`
  padding-left: 26px;
  list-style: square;
`;
ListInfo.displayName = 'ListInfo';

export const AdminLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  margin-right: 10px;
`;
AdminLink.displayName = 'AdminLink';
