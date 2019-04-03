import styled from 'styled-components';
import { onImageError } from '../../util/helpers';

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`;

const renderItem = item => (
  <div className="image-gallery-image">
    {item.imageSet ? (
      <picture onError={onImageError}>
        {item.imageSet.map((source, index) => (
          <source
            key={index}
            media={source.media}
            srcSet={source.srcSet}
            type={source.type}
          />
        ))}
        <ImageContainer>
          <img alt={item.originalAlt} src={item.original} />
        </ImageContainer>
      </picture>
    ) : (
      <ImageContainer>
        <img
          src={item.original}
          alt={item.originalAlt}
          srcSet={item.srcSet}
          sizes={item.sizes}
          title={item.originalTitle}
          onError={onImageError}
        />
      </ImageContainer>
    )}

    {item.description && (
      <span className="image-gallery-description">{item.description}</span>
    )}
  </div>
);

export default renderItem;
