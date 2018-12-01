import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1280px;
  display: block;
  @media (min-width: 768px) {
    display: flex;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Images = styled.div`
  flex: 50%;
  max-width: 500px;
  margin: 0 auto 40px auto;
  @media (min-width: 768px) {
    max-width: unset;
  }
`;
Images.displayName = 'Images';

export const Info = styled.div`
  flex: 50%;
  @media (min-width: 768px) {
    padding-left: 50px;
  }
`;
Info.displayName = 'Info';

export const Title = styled.h2``;
Title.displayName = 'Title';
