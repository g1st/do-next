import styled from 'styled-components';
import { WidthContainer } from './Shared';

export const Wrapper = styled(WidthContainer)`
  margin-top: 20px;
  @media (min-width: 960px) {
    display: flex;
    margin-top: 40px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const Left = styled.div`
  @media (min-width: 960px) {
    flex: 3;
  }
`;
Left.displayName = 'Left';

export const Right = styled.div`
  display: flex;
  flex: 4;
  flex-flow: column;
  @media (min-width: 960px) {
    margin-left: 60px;
  }
`;
Right.displayName = 'Right';

export const ArtistStatement = styled.div`
  background-color: #fafafa;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 40px;
  @media (min-width: 960px) {
    margin-bottom: 60px;
    padding-left: 40px;
    padding-right: 20px;
  }
`;
ArtistStatement.displayName = 'ArtistStatement';

export const ImageWrapper = styled.figure`
  max-width: 400px;
  margin: 0 auto;
`;
ImageWrapper.displayName = 'ImageWrapper';

export const PortraitWrapper = styled.figure`
  max-width: 400px;
  margin: 0 auto;
`;
PortraitWrapper.displayName = 'PortraitWrapper';

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
`;
Image.displayName = 'Image';

export const Caption = styled.figcaption`
  display: flex;
  justify-content: space-between;
`;
Caption.displayName = 'Caption';

export const AuthorNameText = styled.div`
  margin: 40px 0 20px 0;
  @media (min-wdith: 960px) {
    margin: 40px 0;
  }
`;
AuthorNameText.displayName = 'AuthorNameText';

export const Table = styled.table`
  margin-bottom: 14px;
  vertical-align: top;
`;
Table.displayName = 'Table';

export const Row = styled.tr`
  vertical-align: top;
  & td:first-child {
    padding-right: 8px;
  }
`;
Row.displayName = 'Row';

export const Data = styled.td`
  max-width: 600px;
`;
Data.displayName = 'Data';

export const WrapLink = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
WrapLink.displayName = 'WrapLink';

export const ToArtistStatement = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  padding: 6px 8px;
  background-color: #fafafa;
  display: flex;

  :last-child {
    padding-left: 0;
  }

  @media (min-width: 960px) {
    display: none;
  }
`;
ToArtistStatement.displayName = 'ToArtistStatement';
