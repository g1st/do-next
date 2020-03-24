import styled from 'styled-components';
import { WidthContainer } from './Shared';

export const Wrapper = styled(WidthContainer)`
  @media (min-width: 960px) {
    width: 100%;
  }
`;
Wrapper.displayName = 'Wrapper';

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  margin: 20px auto 0 auto;

  div:nth-child(2) {
    margin: 0 20px;
  }

  @media (min-width: 960px) {
    margin-top: 40px;
  }
`;
ImagesWrapper.displayName = 'ImagesWrapper';

export const ImageWrapper = styled.div`
  max-width: 300px;
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Image = styled.img`
  width: 100%;
  filter: grayscale(100%);
`;
Image.displayName = 'Image';

export const EmailSent = styled.div`
  margin-top: 80px;
`;
EmailSent.displayName = 'EmailSent';
