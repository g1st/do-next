import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 20px;
  text-align: center;
`;
Wrapper.displayName = 'Wrapper';

export const ContactAbout = styled.div``;
ContactAbout.displayName = 'ContactAbout';

export const Text = styled.div`
  @media (min-width: 800px) {
    max-width: 800px;
    margin: 0 auto;
  }
  padding-top: 20px;
  align-self: center;
`;
Text.displayName = 'Text';

export const ImageWrapper = styled.div`
  @media (min-width: 800px) {
    margin-top: 20px;
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Image = styled.img`
  @media (min-width: 800px) {
    width: 200px;
  }
  width: 140px;
`;
Image.displayName = 'Image';
