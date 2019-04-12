import { onImageError } from '../../util/helpers';
import { GlobalStyle } from '../../styles/react-image-gallery';

const renderItem = item => (
  <div className="image-gallery-image">
    <GlobalStyle />
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
        <img alt={item.originalAlt} src={item.original} />
      </picture>
    ) : (
      <img
        src={item.original}
        alt={item.originalAlt}
        srcSet={item.srcSet}
        sizes={item.sizes}
        title={item.originalTitle}
        onError={onImageError}
      />
    )}
    {item.description && (
      <span className="image-gallery-description">{item.description}</span>
    )}
  </div>
);

export default renderItem;
