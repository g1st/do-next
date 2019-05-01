import styled, { css, keyframes } from 'styled-components';

const Spinner = keyframes`
 0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #f2f2f2, 1.8em -1.8em 0 0em rgba(242,242,242, 0.2), 2.5em 0em 0 0em rgba(242,242,242, 0.2), 1.75em 1.75em 0 0em rgba(242,242,242, 0.2), 0em 2.5em 0 0em rgba(242,242,242, 0.2), -1.8em 1.8em 0 0em rgba(242,242,242, 0.2), -2.6em 0em 0 0em rgba(242,242,242, 0.5), -1.8em -1.8em 0 0em rgba(242,242,242, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.7), 1.8em -1.8em 0 0em #f2f2f2, 2.5em 0em 0 0em rgba(242,242,242, 0.2), 1.75em 1.75em 0 0em rgba(242,242,242, 0.2), 0em 2.5em 0 0em rgba(242,242,242, 0.2), -1.8em 1.8em 0 0em rgba(242,242,242, 0.2), -2.6em 0em 0 0em rgba(242,242,242, 0.2), -1.8em -1.8em 0 0em rgba(242,242,242, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.5), 1.8em -1.8em 0 0em rgba(242,242,242, 0.7), 2.5em 0em 0 0em #f2f2f2, 1.75em 1.75em 0 0em rgba(242,242,242, 0.2), 0em 2.5em 0 0em rgba(242,242,242, 0.2), -1.8em 1.8em 0 0em rgba(242,242,242, 0.2), -2.6em 0em 0 0em rgba(242,242,242, 0.2), -1.8em -1.8em 0 0em rgba(242,242,242, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.2), 1.8em -1.8em 0 0em rgba(242,242,242, 0.5), 2.5em 0em 0 0em rgba(242,242,242, 0.7), 1.75em 1.75em 0 0em #f2f2f2, 0em 2.5em 0 0em rgba(242,242,242, 0.2), -1.8em 1.8em 0 0em rgba(242,242,242, 0.2), -2.6em 0em 0 0em rgba(242,242,242, 0.2), -1.8em -1.8em 0 0em rgba(242,242,242, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.2), 1.8em -1.8em 0 0em rgba(242,242,242, 0.2), 2.5em 0em 0 0em rgba(242,242,242, 0.5), 1.75em 1.75em 0 0em rgba(242,242,242, 0.7), 0em 2.5em 0 0em #f2f2f2, -1.8em 1.8em 0 0em rgba(242,242,242, 0.2), -2.6em 0em 0 0em rgba(242,242,242, 0.2), -1.8em -1.8em 0 0em rgba(242,242,242, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.2), 1.8em -1.8em 0 0em rgba(242,242,242, 0.2), 2.5em 0em 0 0em rgba(242,242,242, 0.2), 1.75em 1.75em 0 0em rgba(242,242,242, 0.5), 0em 2.5em 0 0em rgba(242,242,242, 0.7), -1.8em 1.8em 0 0em #f2f2f2, -2.6em 0em 0 0em rgba(242,242,242, 0.2), -1.8em -1.8em 0 0em rgba(242,242,242, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.2), 1.8em -1.8em 0 0em rgba(242,242,242, 0.2), 2.5em 0em 0 0em rgba(242,242,242, 0.2), 1.75em 1.75em 0 0em rgba(242,242,242, 0.2), 0em 2.5em 0 0em rgba(242,242,242, 0.5), -1.8em 1.8em 0 0em rgba(242,242,242, 0.7), -2.6em 0em 0 0em #f2f2f2, -1.8em -1.8em 0 0em rgba(242,242,242, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(242,242,242, 0.2), 1.8em -1.8em 0 0em rgba(242,242,242, 0.2), 2.5em 0em 0 0em rgba(242,242,242, 0.2), 1.75em 1.75em 0 0em rgba(242,242,242, 0.2), 0em 2.5em 0 0em rgba(242,242,242, 0.2), -1.8em 1.8em 0 0em rgba(242,242,242, 0.5), -2.6em 0em 0 0em rgba(242,242,242, 0.7), -1.8em -1.8em 0 0em #f2f2f2;
  }
`;

const SpinnerAnimation = css`
  ${Spinner} 1.1s infinite ease;
`;

export const Loader = styled.div`
  margin: 50px auto;
  font-size: 8px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  animation: ${SpinnerAnimation};
  text-indent: -9999em;

  transform: translateZ(0);

  @media (min-width: 800px) {
    font-size: 16px;
  }
`;
Loader.displayName = 'Loader';

export const Center = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
`;
Center.displayName = 'Center';

export const Modal = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
`;
Modal.displayName = 'Modal';
