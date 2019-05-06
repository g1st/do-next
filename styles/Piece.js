import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 960px) {
    display: flex;
    padding-top: 40px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  padding-top: 3rem;
  @media (min-width: 960px) {
    margin: 0;
  }
`;
ButtonsWrapper.displayName = 'ButtonsWrapper';

export const Images = styled.div`
  max-width: 500px;
  margin: 0 auto 40px auto;
  @media (min-width: 960px) {
    width: 50%;
  }
`;
Images.displayName = 'Images';

export const Info = styled.div`
  @media (min-width: 960px) {
    padding-left: 50px;
    width: 50%;
  }
`;
Info.displayName = 'Info';

export const DisabledButtonWrapper = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`;
DisabledButtonWrapper.displayName = 'DisabledButtonWrapper';

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
Text.displayName = 'Text';
