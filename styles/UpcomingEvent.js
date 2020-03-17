import styled from 'styled-components';
import { WidthContainer } from './Shared';

export const EventWrapper = styled(WidthContainer)`
  @media screen and (min-width: 960px) {
    margin-bottom: 6em;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`;
