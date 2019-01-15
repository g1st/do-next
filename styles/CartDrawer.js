import styled from 'styled-components';

export const CartItems = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    height: 60px;
    align-items: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.03);
    margin-bottom: 5px;
  }
`;
CartItems.displayName = 'CartItems';

export const Thumb = styled.img`
  width: 48px;
  height: 48px;
`;
Thumb.displayName = 'Thumb';

export const ItemInfo = styled.div`
  flex-grow: 1;
  p {
    margin-left: 8px;
  }
`;
ItemInfo.displayName = 'ItemInfo';

export const Totals = styled.div`
  float: right;
  padding-right: 20px;
`;
Totals.displayName = 'Totals';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
Table.displayName = 'Table';

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
TableRow.displayName = 'TableRow';

export const TableHead = styled.th`
  padding: 8px;
  text-align: left;
  /* border: 1px solid rgba(0,0,0,0.03); */
`;
TableHead.displayName = 'TableHead';

export const TableCell = styled.td`
  /* border: 1px solid rgba(0,0,0,0.03); */
  padding: 8px;
  text-align: right;
`;
TableCell.displayName = 'TableCell';

export const TableBody = styled.tbody``;
TableBody.displayName = 'TableBody';
