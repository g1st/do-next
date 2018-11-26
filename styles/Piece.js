import styled from 'styled-components';
import 'react-image-gallery/styles/css/image-gallery.css';

export const Wrapper = styled.div`
  /* display: flex; */
  width: 100%;
`;
Wrapper.displayName = 'Wrapper';

export const Images = styled.div`
  /* display: flex; */
  @media (min-width: 960px) {
    width: 60%;
    display: inline-block;
  }
  background-color: greenyellow;
`;
Images.displayName = 'Images';

export const Info = styled.div`
  /* display: flex; */
  @media (min-width: 960px) {
    width: 40%;
    display: inline-block;
  }
  background-color: red;
`;
Info.displayName = 'Info';

export const Title = styled.h2``;
Title.displayName = 'Title';
