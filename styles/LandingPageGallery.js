import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-top: 20px;
`;
Wrapper.displayName = 'Wrapper';

export const Content = styled.div`
  text-align: center;
  margin-top: -20px;

  @media (min-width: 600px) {
    margin-top: 80px;
  }

  @media (min-width: 960px) {
    margin-top: 160px;
  }
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
  max-width: 100%;
  height: auto;
  max-height: 80vh;
  @media (min-width: 960px) {
    max-width: 750px;
    width: unset;
  }
`;
ModalImage.displayName = 'ModalImage';

export const Figcaption = styled.figcaption``;
Figcaption.displayName = 'Figcaption';

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    flex: 1 1 auto;
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

export const Close = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  background: #fff;

  ::before {
    content: '×';
    font-size: 24px;
    color: rgba(0, 0, 0, 0.5);
    @media (min-width: 960px) {
      font-size: 30px;
    }
  }
`;
Close.displayName = 'Close';
