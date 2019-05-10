import styled from 'styled-components';

export const Main = styled.main`
  padding: 76px 16px 0px 16px;
  max-width: 1280px;
  flex: 1 0 auto;
  /* display: flex; */
  @media (min-width: 960px) {
    padding: 76px 10px 0px 10px;
  }
`;
Main.displayName = 'Main';
