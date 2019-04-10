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
