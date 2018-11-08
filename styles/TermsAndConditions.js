import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 10px;

  @media (min-width: 960px) {
    margin: 0;
    display: grid;
    grid-gap: 80px;
    grid-template-columns: 1fr 1fr;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Text = styled.div`
  @media (min-width: 960px) {
    grid-column-start: 1;
    grid-row-start: 1;
  }
`;
Text.displayName = 'Text';

export const Figure = styled.figure`
  margin-left: 20px;
  margin-right: 20px;
  @media (min-width: 960px) {
    margin-left: 40px;
    margin-right: 40px;
  }
`;
Figure.displayName = 'Figure';

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (min-width: 960px) {
    margin-top: 20px;
    grid-column-start: 2;
  }
`;
Image.displayName = 'Image';
