import styled from 'styled-components';

export const CartItems = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 18px;

  li {
    display: flex;
    align-items: center;
    padding: 11px 16px;
    background: rgba(0, 0, 0, 0.02);
    margin-bottom: 5px;
  }
`;
CartItems.displayName = 'CartItems';

export const Thumb = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
Thumb.displayName = 'Thumb';

export const ItemInfo = styled.div`
  flex-grow: 1;
  p {
    margin-left: 8px;
  }
`;
ItemInfo.displayName = 'ItemInfo';
