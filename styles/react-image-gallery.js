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
      font-size: 2em;
    }
    button.image-gallery-fullscreen-button {
      font-size: 0.75em;
      display: inline-block;
    }
  }

  .image-gallery-content.fullscreen {
    .image-gallery-slide {
      background: #fff;
      img {
        width: auto;
        height: calc(100vh - 116px);
      }
    }
  }

  .image-gallery-image {
    text-align: center;
  }

  .image-gallery-thumbnail.active {
    border-color: #9e9e9e;
  } 
  
  .image-gallery-thumbnails-wrapper.bottom {
    background: #fff;
  } 
`;
