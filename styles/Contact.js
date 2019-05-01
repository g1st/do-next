import styled from 'styled-components';

export const Wrapper = styled.div`
  @media (min-width: 960px) {
    width: 100%;
  }
`;
Wrapper.displayName = 'Wrapper';

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;

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
`;
Image.displayName = 'Image';

export const EmailSent = styled.div`
  margin-top: 80px;
`;
EmailSent.displayName = 'EmailSent';
