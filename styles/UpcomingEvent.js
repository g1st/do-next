import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  min-height: 252px;
  margin: 0 auto 80px;
  display: flex;
  align-items: center;
  background-image: url('/static/images/bg1.JPG');
  background-color: #eeeeee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 960px) {
    margin: 140px auto;
  }
`;
Wrapper.displayName = 'Wrapper';

export const ButtonWrapper = styled.div`
  display: flex;
  @media (min-width: 960px) {
    align-self: flex-end;
  }
`;
ButtonWrapper.displayName = 'ButtonWrapper';

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
  }

  @media (min-width: 960px) {
    margin-bottom: 0;
    flex-direction: column;
  }
`;
Data.displayName = 'Data';

export const Content = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  @media (min-width: 960px) {
    height: 96px;
    display: flex;
    margin: 0 20px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  @media (min-width: 1200px) {
    height: 130px;
  }
`;
Content.displayName = 'Content';

export const FlexItem = styled.div`
  @media (min-width: 700px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
FlexItem.displayName = 'FlexItem';
