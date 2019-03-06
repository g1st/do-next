import styled from 'styled-components';

const ThumbnailContainer = styled.div`
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

const renderThumb = item => {
  const defaultImage = '/static/images/logo.png';

  const onThumbnailError = event => {
    if (event.target.src.indexOf(defaultImage) === -1) {
      event.target.src = defaultImage;
    }
  };
  return (
    <div className="image-gallery-thumbnail-inner">
      <ThumbnailContainer>
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          title={item.thumbnailTitle}
          onError={e => onThumbnailError(e)}
        />
      </ThumbnailContainer>
      {item.thumbnailLabel && (
        <div className="image-gallery-thumbnail-label">
          {item.thumbnailLabel}
        </div>
      )}
    </div>
  );
};

export default renderThumb;
