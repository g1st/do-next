import styled from 'styled-components';

export const Main = styled.main`
  padding: 4.5em 16px 0px 16px;
  max-width: 1280px;
  flex: 1 0 auto;
  @media (min-width: 960px) {
    padding: 5.5em 10px 0px 10px;
  }
`;
Main.displayName = 'Main';
