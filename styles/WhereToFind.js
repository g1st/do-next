import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  margin: 0 10px;

  @media (min-width: 960px) {
    width: 100%;
    flex-flow: row;
    justify-content: space-around;
    margin-top: 30px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Stockist = styled.div`
  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;
    max-width: 480px;
    padding-right: 25px;
  }
`;
Stockist.displayName = 'Stockist';

export const Events = styled.div`
  margin-bottom: 50px;
  @media (min-width: 960px) {
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    max-width: 480px;
    padding-left: 25px;
  }
`;
Events.displayName = 'Events';

export const ImageWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto 20px auto;

  @media (min-width: 960px) {
    max-width: 480px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Table = styled.table`
  margin-bottom: 14px;
  vertical-align: top;
`;
Table.displayName = 'Table';

export const Row = styled.tr`
  vertical-align: top;
  & td:first-child {
    padding-right: 8px;
    white-space: nowrap;
  }
`;
Row.displayName = 'Row';

export const Data = styled.td`
  max-width: 600px;
`;
Data.displayName = 'Data';
