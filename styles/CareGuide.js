import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 4rem;
  padding: 3rem 2rem;
  width: 100%;
`;
Wrapper.displayName = 'Wrapper';

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
Text.displayName = 'Text';

export const Figure = styled.figure`
  display: inline-block;
  margin: 0;
  margin-left: 20px;
  margin-right: 20px;
`;
Figure.displayName = 'Figure';

export const Caption = styled.figcaption`
  max-width: 642px;
`;
Caption.displayName = 'Caption';

export const Image = styled.img`
  max-width: 100%;
  margin: 0 auto;
`;
Image.displayName = 'Image';

export const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
`;
ImageWrapper.displayName = 'ImageWrapper';

export const List = styled.ul`
  margin-top: 0;
  padding-left: 30px;
  list-style: square;
`;
List.displayName = 'List';

export const ListItem = styled.li``;
ListItem.displayName = 'ListItem';
