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
    grid-column-start: 2;
    grid-row-start: 1;
  }
`;
Text.displayName = 'Text';

export const Figure = styled.figure`
  display: block;
  margin-left: 20px;
  margin-right: 20px;
  @media (min-width: 960px) {
    margin-top: 20px;
    grid-column-start: 1;
  }
`;
Figure.displayName = 'Figure';

export const Caption = styled.figcaption`
  max-width: 500px;
`;
Caption.displayName = 'Caption';

export const Image = styled.img`
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
Image.displayName = 'Image';

export const Mail = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0);
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }
`;
Mail.displayName = 'Mail';
