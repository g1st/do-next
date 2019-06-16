import styled from 'styled-components';

export const ItemsContainer = styled.ul`
  list-style: none;
`;
ItemsContainer.displayName = 'ItemsContainer';

export const FilterWrapper = styled.div`
  display: flex;
`;
FilterWrapper.displayName = 'FilterWrapper';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ user }) => (user ? '1px solid lightgrey' : '')};
`;
FlexContainer.displayName = 'FlexContainer';

export const ButtonIndicator = styled.div`
  background-color: ${({ swapWithMe }) => (swapWithMe ? 'lightgreen' : '')};
  background-color: ${({ activeSwap }) => (activeSwap ? 'lightgrey' : '')};
`;
ButtonIndicator.displayName = 'ButtonIndicator';
