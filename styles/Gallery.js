import styled, { keyframes } from 'styled-components';

export const ItemsContainer = styled.ul`
  list-style: none;
`;
ItemsContainer.displayName = 'ItemsContainer';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
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

export const Image = styled.img`
  display: ${({ loaded }) => (loaded ? 'inline-block' : 'none')};
  width: 100%;
  max-width: 300px;
`;
Image.displayName = 'Image';

const loading = keyframes`
  0% {
    background-position: -100px
  }
  60%, 100% {
    background-position: 320px
  }
`;

export const Skeleton = styled.span`
  display: inline-block;
  height: 300px;
  width: 300px;
  background-color: #f4f4f4;
  background-image: linear-gradient(
    90deg,
    #f4f4f4 0px,
    rgba(229, 229, 229, 0.8) 60px,
    #f4f4f4 100px
  );
  background-size: 500px;
  animation: ${loading} 2s infinite;
`;
Skeleton.displayName = 'Skeleton';
