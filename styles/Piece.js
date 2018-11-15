import styled from 'styled-components';

export const Wrapper = styled.div`
  /* display: flex; */
  width: 100%;
`;
Wrapper.displayName = 'Wrapper';

export const Images = styled.div`
  /* display: flex; */
  display: inline-block;
  width: 50%;
  background-color: greenyellow;
`;
Images.displayName = 'Images';

export const Info = styled.div`
  /* display: flex; */
  display: inline-block;
  width: 50%;
  background-color: red;
`;
Info.displayName = 'Info';
