import { useState, useEffect, useCallback } from 'react';

const GetSlideNumber = () => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(
    () => (isClient ? window.innerWidth : undefined),
    [isClient]
  );

  const [windowWidth, setWindowWidth] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowWidth(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  const data = { width: windowWidth };

  if (windowWidth < 678) {
    data.visibleSlides = 1;
  } else if (windowWidth < 980) {
    data.visibleSlides = 2;
  } else if (windowWidth < 1360) {
    data.visibleSlides = 3;
  } else if (windowWidth < 1800) {
    data.visibleSlides = 4;
  } else if (windowWidth < 2200) {
    data.visibleSlides = 5;
  } else {
    data.visibleSlides = 6;
  }
  return data;
};

export default GetSlideNumber;
