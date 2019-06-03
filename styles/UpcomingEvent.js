import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  min-height: 186px;
  margin: 20px auto 60px;
  display: flex;
  align-items: center;
  background-image: url('/static/images/bg1.JPG');
  background-color: #eeeeee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 700px) {
    margin: 20px auto 80px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Data = styled.div`
  display: flex;
  flex-direction: column;
`;
Data.displayName = 'Data';

export const Content = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;

  @media (min-width: 700px) {
    margin: 30px auto 0 auto;
    align-items: center;
  }
  @media (min-width: 800px) {
    margin-top: 26px;
  }
  @media (min-width: 900px) {
    margin-top: 0;
  }
`;
Content.displayName = 'Content';

export const FlexItem = styled.div`
  @media (min-width: 700px) {
    display: flex;
  }
`;
FlexItem.displayName = 'FlexItem';

export const AnchorLink = styled.a`
  text-decoration: none;
`;
AnchorLink.displayName = 'AnchorLink';

export const WrapData = styled.div`
  @media (min-width: 700px) {
    display: flex;
  }
`;
WrapData.displayName = 'WrapData';

export const DataInner = styled.div`
  @media (min-width: 700px) {
    margin-top: 4px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    height: 70px;
  }
  @media (min-width: 800px) {
    margin-top: 6px;
    height: 80px;
  }
`;
DataInner.displayName = 'DataInner';

export const ForBiggerScreens = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
`;
ForBiggerScreens.displayName = 'ForBiggerScreens';
