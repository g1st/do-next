import styled from 'styled-components';

export const AnchorLink = styled.a`
  color: rgba(0, 0, 0, 0.87);
`;
AnchorLink.displayName = 'AnchorLink';

export const AuthorNameText = styled.div`
  margin-bottom: 20px;
`;
AuthorNameText.displayName = 'AuthorNameText';

export const WhereToFind = styled.div`
  margin-bottom: 20px;
`;
WhereToFind.displayName = 'WhereToFind';

export const ShopOnline = styled.div`
  margin-bottom: 20px;
`;
ShopOnline.displayName = 'ShopOnline';

export const Table = styled.table`
  margin-bottom: 14px;
  vertical-align: top;
`;
Table.displayName = 'Table';

export const Row = styled.tr`
  vertical-align: top;
  & td:first-child {
    padding-right: 8px;
  }
`;
Row.displayName = 'Row';

export const Data = styled.td`
  max-width: 600px;
`;
Data.displayName = 'Data';
