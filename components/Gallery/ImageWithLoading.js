import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Image, Skeleton } from '../../styles/Gallery';

const ImageWithLoading = ({ src, srcSet, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const image = useRef(null);

  const handleLoaded = () => {
    setLoaded(true);
  };
  const handleError = (e) => {
    const fallbackImage = '/images/fallback.png';
    if (e.src.indexOf('/images/fallback.png') === -1) {
      e.src = fallbackImage;
      e.srcset = '';
    }
  };

  useEffect(() => {
    const img = image.current;
    if (!img) return;

    if (img && img.complete) {
      if (img.naturalWidth === 0) {
        handleError(img);
      }
      handleLoaded();
    }
  }, []);

  return (
    <>
      {!loaded ? <Skeleton /> : null}
      <Image
        ref={image}
        src={src}
        srcSet={srcSet}
        alt={alt}
        loaded={loaded}
        onLoad={() => handleLoaded()}
        onError={(e) => handleError(e.target)}
      />
    </>
  );
};

ImageWithLoading.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageWithLoading;
