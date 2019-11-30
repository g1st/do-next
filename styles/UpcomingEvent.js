import styled from 'styled-components';

export const EventWrapper = styled.div`
  margin-bottom: 4em;
`;

export const Image = styled.img`
  cursor: ${({ cursorDefault }) => (cursorDefault ? 'default' : 'pointer')};
  height: 100%;
  width: 100%;
`;
