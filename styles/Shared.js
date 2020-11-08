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

export const StyledAnchorLink = styled.a`
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }
`;
StyledAnchorLink.displayName = 'StyledAnchorLink';

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
`;
Data.displayName = 'Data';

export const Strong = styled.strong`
  font-weight: 500;
`;
Strong.displayName = 'Strong';

export const WidthContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5.5em 1em 0;
`;
WidthContainer.displayName = 'WidthContainer';

export const LogoImage = styled.img`
  max-width: 160px;
  height: auto;
  vertical-align: middle;
`;
