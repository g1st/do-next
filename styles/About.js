import styled from 'styled-components';

export const Wrapper = styled.div`
  @media (min-width: 960px) {
    display: flex;
    /* width: 100%; */
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
  @media (min-width: 960px) {
    display: flex;
    flex: 4;
    flex-flow: column-reverse;
    justify-content: flex-end;
  }
`;
Right.displayName = 'Right';

export const ArtistStatement = styled.div`
  @media (min-width: 960px) {
    margin-bottom: 60px;
    padding-left: 40px;
  }
`;
ArtistStatement.displayName = 'ArtistStatement';

export const ImageWrapper = styled.figure`
  max-width: 300px;
  margin: 0 auto;
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Image = styled.img`
  width: 100%;
`;
Image.displayName = 'Image';

export const Caption = styled.figcaption``;
Caption.displayName = 'Caption';

export const AuthorNameText = styled.div`
  margin: 40px 0;
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
