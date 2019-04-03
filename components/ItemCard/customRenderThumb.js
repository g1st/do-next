import styled from 'styled-components';
import { onImageError } from '../../util/helpers';

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

const renderThumb = item => (
  <div className="image-gallery-thumbnail-inner">
    <ThumbnailContainer>
      <img
        src={item.thumbnail}
        alt={item.thumbnailAlt}
        title={item.thumbnailTitle}
        onError={onImageError}
      />
    </ThumbnailContainer>
    {item.thumbnailLabel && (
      <div className="image-gallery-thumbnail-label">{item.thumbnailLabel}</div>
    )}
  </div>
);

export default renderThumb;
