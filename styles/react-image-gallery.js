import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .image-gallery-right-nav:hover::before,
  .image-gallery-left-nav:hover::before {
    color: #fff;
  }

  button.image-gallery-left-nav,
  button.image-gallery-right-nav {
    display: none;
  }

  button.image-gallery-fullscreen-button {
    display: none;
  }

  @media (min-width: 960px) {
    button.image-gallery-left-nav,
    button.image-gallery-right-nav {
      display: inline-block;
      font-size: 3.4em;
      padding: 20px 15px;
    }
    button.image-gallery-fullscreen-button {
      display: inline-block;
    }
  }

  .image-gallery-content.fullscreen {
    .image-gallery-slide img {
      width: auto;
      height: calc(100vh - 106px);
    }
  }

  .image-gallery-image {
    text-align: center;
  }
`;
