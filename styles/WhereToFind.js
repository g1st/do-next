import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;

  @media (min-width: 960px) {
    flex-flow: row;
    justify-content: space-between;
    margin-top: 30px;
    width: 100%;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Stockist = styled.div`
  div > p {
    margin-bottom: 12px;
  }
  @media (min-width: 960px) {
    width: 50%;
    padding-right: 30px;
  }
`;
Stockist.displayName = 'Stockist';

export const StockistText = styled.div`
  @media (min-width: 960px) {
    max-width: 540px;
    margin-top: 16px;
  }
`;
StockistText.displayName = 'StockistText';

export const Events = styled.div`
  margin-bottom: 50px;
  @media (min-width: 960px) {
    margin-bottom: 0;
    width: 50%;
    padding-left: 30px;
  }
`;
Events.displayName = 'Events';

export const UpcomingEvents = styled.div`
  margin-bottom: 3rem;
`;
UpcomingEvents.displayName = 'UpcomingEvents';

export const ImageWrapper = styled.div`
  max-width: 480px;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    max-width: 480px;
    margin-bottom: 60px;
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Image = styled.img`
  width: 100%;
`;
Image.displayName = 'Image';

export const Data = styled.td`
  max-width: 600px;
  min-width: 80px;

  > p {
    margin-bottom: 12px;
  }
`;
Data.displayName = 'Data';
