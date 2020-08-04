import styled from 'styled-components';
import { WidthContainer } from './Shared';

export const Wrapper = styled(WidthContainer)`
  padding-top: 0.5rem;
  @media (min-width: 600px) {
    padding-top: 1rem;
  }
  @media (min-width: 960px) {
    display: flex;
    padding-top: 40px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 19rem;
  margin: 2.25rem auto 1rem auto;
  @media (min-width: 960px) {
    margin: 2rem 0 1rem 0;
  }
`;
ButtonsWrapper.displayName = 'ButtonsWrapper';

export const Images = styled.div`
  max-width: 525px;
  margin: 0 auto 40px auto;
  @media (min-width: 960px) {
    width: 60%;
  }
`;
Images.displayName = 'Images';

export const Info = styled.div`
  @media (min-width: 960px) {
    margin-left: 20px;
    width: 40%;
  }
`;
Info.displayName = 'Info';

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
Text.displayName = 'Text';

export const AnchorLink = styled.a`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
AnchorLink.displayName = 'AnchorLink';

export const ListInfo = styled.ul`
  padding-left: 26px;
  list-style: square;
`;
ListInfo.displayName = 'ListInfo';

export const AdminLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  margin-right: 10px;
`;
AdminLink.displayName = 'AdminLink';

export const IconButtonWrapper = styled.div`
  display: ${(props) => (props.forDimensions ? 'inline-block' : 'flex')};
  align-items: flex-end;
`;
IconButtonWrapper.displayName = 'IconButtonWrapper';

export const SizesWrapper = styled.div`
  display: flex;
`;
SizesWrapper.displayName = 'SizesWrapper';

export const SilverFinishWrapper = styled.div`
  margin-bottom: 1rem;
`;
SilverFinishWrapper.displayName = 'SilverFinishWrapper';

export const MarginBottomWrapper = styled.div`
  margin-bottom: 2rem;
`;
MarginBottomWrapper.displayName = 'MarginBottomWrapper';

export const SelectionWrapper = styled.div`
  max-width: 13rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto 2rem auto;

  @media (min-width: 960px) {
    margin: 0 0 2rem 0;
  }
`;
SelectionWrapper.displayName = 'SelectionWrapper';

export const PathLineContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5.5em 1em 0;
`;
PathLineContainer.displayName = 'PathLineContainer';
