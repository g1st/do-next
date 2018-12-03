import styled from 'styled-components';

export const CartItems = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    height: 60px;
    align-items: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.05);
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
