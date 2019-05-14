import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  margin: 0 10px;

  @media (min-width: 960px) {
    flex-flow: row;
    justify-content: space-between;
    margin-top: 30px;
    width: 100%;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Stockist = styled.div`
  @media (min-width: 960px) {
    width: 50%;
    padding-right: 30px;
  }
`;
Stockist.displayName = 'Stockist';

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

export const LatestEvents = styled.div``;
LatestEvents.displayName = 'LatestEvents';

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
  border-radius: 3px;
`;
Image.displayName = 'Image';

export const Data = styled.td`
  max-width: 600px;
  min-width: 80px;
`;
Data.displayName = 'Data';
