import LazyLoad from 'react-lazy-load';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  background: #fff;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`;

const renderItem = item => {
  const defaultImage = '/static/images/logo.png';

  const onImageError = event => {
    if (event.target.src.indexOf(defaultImage) === -1) {
      event.target.src = defaultImage;
    }
  };

  return (
    <div className="image-gallery-image">
      {item.imageSet ? (
        <picture onError={e => onImageError(e)}>
          {item.imageSet.map((source, index) => (
            <source
              key={index}
              media={source.media}
              srcSet={source.srcSet}
              type={source.type}
            />
          ))}
          <LazyLoad>
            <ImageContainer>
              <img alt={item.originalAlt} src={item.original} />
            </ImageContainer>
          </LazyLoad>
        </picture>
      ) : (
        <LazyLoad>
          <ImageContainer>
            <img
              src={item.original}
              alt={item.originalAlt}
              srcSet={item.srcSet}
              sizes={item.sizes}
              title={item.originalTitle}
              onError={e => onImageError(e)}
            />
          </ImageContainer>
        </LazyLoad>
      )}

      {item.description && (
        <span className="image-gallery-description">{item.description}</span>
      )}
    </div>
  );
};

export default renderItem;
