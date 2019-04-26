import { createGlobalStyle } from 'styled-components';
import 'react-image-gallery/styles/css/image-gallery.css';

export const GlobalStyle = createGlobalStyle`
  .image-gallery-right-nav:hover::before {
    color: #fff;
  }

  @media (min-width: 769px) {
    button.image-gallery-left-nav,
    button.image-gallery-right-nav {
      font-size: 3.4em;
      padding: 20px 15px;
    }
  }

  @media screen and (max-width: 1000px) {
    .image-gallery-content.fullscreen.thumbnails-horizontal .image-gallery-slide img {
      width: 100%;
      height: 100%;
    }
  }
`;
