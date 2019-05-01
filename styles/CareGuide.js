import styled from 'styled-components';

export const Wrapper = styled.div`
  @media (min-width: 960px) {
    margin: 0;
    display: grid;
    grid-gap: 80px;
    grid-template-columns: 1fr 1fr;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
  @media (min-width: 960px) {
    grid-column-start: 2;
    grid-row-start: 1;
  }
`;
Text.displayName = 'Text';

export const Figure = styled.figure`
  display: block;
  margin: 0;
  margin-left: 20px;
  margin-right: 20px;
  @media (min-width: 960px) {
    margin: 20px 0 0 0;
    grid-column-start: 1;
  }
`;
Figure.displayName = 'Figure';

export const Caption = styled.figcaption`
  max-width: 642px;
`;
Caption.displayName = 'Caption';

export const Image = styled.img`
  max-width: 100%;
`;
Image.displayName = 'Image';
