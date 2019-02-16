const renderThumb = item => {
  const defaultImage = '/static/images/message.svg';

  const onThumbnailError = event => {
    if (event.target.src.indexOf(defaultImage) === -1) {
      event.target.src = defaultImage;
    }
  };
  return (
    <div className="image-gallery-thumbnail-inner">
      <img
        src={item.thumbnail}
        alt={item.thumbnailAlt}
        title={item.thumbnailTitle}
        onError={e => onThumbnailError(e)}
      />
      {item.thumbnailLabel && (
        <div className="image-gallery-thumbnail-label">
          {item.thumbnailLabel}
        </div>
      )}
    </div>
  );
};

export default renderThumb;
