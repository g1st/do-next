import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-grow: 1;
`;
Wrapper.displayName = 'Wrapper';

export const WrapSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
WrapSpan.displayName = 'WrapSpan';

export const Span = styled.span`
  padding-right: 6px;
  padding-left: 20px;
`;
Span.displayName = 'Span';

export const Icon = styled.span`
  display: flex;
  align-self: center;
`;
Icon.displayName = 'Span';
