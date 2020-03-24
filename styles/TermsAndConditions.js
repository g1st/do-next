import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 3rem 2rem;
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
`;
Figure.displayName = 'Figure';

export const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: 40px;
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: 50px auto 30px auto;
  @media (min-width: 960px) {
    margin-top: 100px;
  }
`;
Image.displayName = 'Image';

export const List = styled.ul`
  margin-top: 0;
  padding-left: 30px;
  list-style: square;
`;
List.displayName = 'List';

export const ListItem = styled.li``;
ListItem.displayName = 'ListItem';
