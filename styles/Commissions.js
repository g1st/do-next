import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 2rem;
  padding: 3rem 2rem;
  width: 100%;
`;
Wrapper.displayName = 'Wrapper';

export const Text = styled.div`
  max-width: 700px;
  margin: 30px auto 0 auto;
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
  width: 100%;
  max-width: 500px;
  margin: 50px auto 30px auto;
  @media (min-width: 960px) {
    margin-top: 100px;
  }
`;
Image.displayName = 'Image';
