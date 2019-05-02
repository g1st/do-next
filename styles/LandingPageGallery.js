import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;
Wrapper.displayName = 'Wrapper';

export const Headline = styled.div`
  margin-top: 40px;
`;
Headline.displayName = 'Headline';

export const Content = styled.div`
  text-align: center;
`;
Content.displayName = 'Content';

export const Input = styled.input`
  max-width: 100%;

  :hover {
    cursor: pointer;
  }
`;
Input.displayName = 'Input';

export const ModalImage = styled.img`
  width: 100%;
  height: auto;
`;
ModalImage.displayName = 'ModalImage';

export const Figcaption = styled.figcaption`
  padding-top: 20px;
`;
Figcaption.displayName = 'Figcaption';

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-direction: row;
    flex: 1 1 auto;
    padding: 80px 0;
  }
`;
ImagesWrapper.displayName = 'ImagesWrapper';

export const TwoImages = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  @media (min-width: 600px) {
    flex-wrap: nowrap;
  }
`;
TwoImages.displayName = 'TwoImages';

export const Image = styled.div`
  @media (min-width: 600px) {
  }
`;
Image.displayName = 'Image';
