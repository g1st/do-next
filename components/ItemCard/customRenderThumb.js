import { onImageError } from '../../util/helpers';

const renderThumb = item => (
  <div className="image-gallery-thumbnail-inner">
    <img
      src={item.thumbnail}
      alt={item.thumbnailAlt}
      title={item.thumbnailTitle}
      onError={onImageError}
    />
    {item.thumbnailLabel && (
      <div className="image-gallery-thumbnail-label">{item.thumbnailLabel}</div>
    )}
  </div>
);

export default renderThumb;
