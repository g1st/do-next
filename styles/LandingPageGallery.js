import styled from 'styled-components';
import { WidthContainer } from './Shared';

export const Wrapper = styled(WidthContainer)`
  display: flex;
  height: calc(100vh - 64px);
  align-items: center;
  margin-top: 2rem;

  @media (min-width: 600px) {
    padding-top: 7rem;
    margin-top: 0;
  }
`;
Wrapper.displayName = 'Wrapper';

export const WrapperWooden = styled(WidthContainer)`
  display: flex;
  align-items: center;
  padding-top: 7rem;
`;

export const Content = styled.div`
  text-align: center;
  margin: -20px auto 0 auto;
`;
Content.displayName = 'Content';

export const Input = styled.input`
  max-width: 300px;
  width: 100%;

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
    &:first-child {
      margin-right: 1rem;
    }
  }
`;
TwoImages.displayName = 'TwoImages';

export const FourImages = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  margin-bottom: 2rem;
  @media (min-width: 600px) {
    flex-wrap: nowrap;

    > div {
      :last-child {
        margin-right: 0;
      }
    }
  }
`;
FourImages.displayName = 'FourImages';

export const Image1 = styled.div`
  margin-right: 0;

  @media (min-width: 601px) {
    margin-right: 1rem;
  }
`;
Image1.displayName = 'Image1';

export const Image2 = styled.div`
  @media (max-width: 600px) {
    display: none;
  }

  @media (min-width: 901px) {
    margin-right: 1rem;
  }
`;
Image2.displayName = 'Image2';

export const Image3 = styled.div`
  @media (max-width: 900px) {
    display: none;
  }

  @media (min-width: 1201px) {
    margin-right: 1rem;
  }
`;
Image3.displayName = 'Image3';

export const Image4 = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`;
Image4.displayName = 'Image4';

export const Image = styled.div`
  @media (min-width: 600px) {
    &:first-child {
      margin-right: 1rem;
    }
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
  background: transparent;

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
