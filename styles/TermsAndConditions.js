import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: -20px;
  width: 100%;
`;
Wrapper.displayName = 'Wrapper';

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
Text.displayName = 'Text';

export const Figure = styled.figure`
  display: inline-block;
  margin: 0;
`;
Figure.displayName = 'Figure';

export const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
`;
Image.displayName = 'Image';
