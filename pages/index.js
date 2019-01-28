import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

const ITEMS_PER_PAGE = 6;

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  @media (min-width: 960px) {
    padding-bottom: 40px;
    padding-top: 20px;
  }
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(props.data);
    this.state = {
      data,
      itemsLoaded: ITEMS_PER_PAGE,
      dataForGallery: data.slice(0, ITEMS_PER_PAGE)
    };
  }

  loadMore() {
    this.setState(prevState => ({
      dataForGallery: this.state.data.slice(
        0,
        prevState.itemsLoaded + ITEMS_PER_PAGE
      ),
      itemsLoaded: prevState.itemsLoaded + ITEMS_PER_PAGE
    }));
  }

  render() {
    return (
      <Layout
        pathname={this.props.pathname}
        collections={this.props.collections}
      >
        <div>alohha</div>
        <Link href="/works">
          <a>Works</a>
        </Link>
        <br />
        <Link href="/checkout">
          <a>checkout</a>
        </Link>
        <br />
        <Link href="/admin">
          <a>admin</a>
        </Link>
        <br />
        <Link href="/about">
          <a>About</a>
        </Link>
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
        <div>Path: {this.props.pathname}</div>
        <div>From: {this.props.from}</div>
        {/* <div>Data: {JSON.stringify(this.state.data)}</div> */}
        {this.state.data.length > 0 ? (
          <Gallery data={this.state.dataForGallery} showCollection={'all'} />
        ) : (
          <p>Gallery empty</p>
        )}
        {this.state.data.length > this.state.itemsLoaded ? (
          <ButtonContainer>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              onClick={() => this.loadMore()}
            >
              Load More
            </Button>
          </ButtonContainer>
        ) : null}
      </Layout>
    );
  }
}

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

Index.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default Index;
