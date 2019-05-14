import styled from 'styled-components';

export const Mail = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }
`;
Mail.displayName = 'Mail';

export const AnchorLink = styled.a`
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
`;
AnchorLink.displayName = 'AnchorLink';

export const Table = styled.table`
  margin-top: 12px;
  margin-bottom: 36px;
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
  min-width: 100px;
`;
Data.displayName = 'Data';
