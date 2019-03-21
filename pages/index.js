import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

import { increaseLoadedItems } from '../store/actions';

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
    const { data } = props;
    this.state = {
      data,
      itemsLoaded: props.reduxLoadedItems,
      dataForGallery: data.slice(0, props.reduxLoadedItems)
    };
  }

  componentDidUpdate(prevProps) {
    const { reduxLoadedItems } = this.props;

    /* eslint-disable react/no-did-update-set-state */
    if (reduxLoadedItems !== prevProps.reduxLoadedItems) {
      this.setState(prevState => ({
        dataForGallery: prevState.data.slice(0, reduxLoadedItems),
        itemsLoaded: reduxLoadedItems
      }));
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  render() {
    const {
      pathname,
      collections,
      from,
      increaseLoadedItems: increaseLoadedItemsRedux
    } = this.props;
    const { data, dataForGallery, itemsLoaded } = this.state;

    return (
      <Layout pathname={pathname} collections={collections}>
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
        <div>Path: {pathname}</div>
        <div>From: {from}</div>
        {/* <div>Data: {JSON.stringify(this.state.data)}</div> */}
        {data.length > 0 ? (
          <Gallery data={dataForGallery} showCollection="all" />
        ) : (
          <p>Gallery empty</p>
        )}
        {data.length > itemsLoaded ? (
          <ButtonContainer>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              onClick={() => increaseLoadedItemsRedux()}
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
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  reduxLoadedItems: PropTypes.number,
  from: PropTypes.string,
  increaseLoadedItems: PropTypes.func
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

const mapStateToProps = state => ({
  reduxLoadedItems: state.loadMore
});

const mapDispatchToProps = dispatch => ({
  increaseLoadedItems: () => dispatch(increaseLoadedItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
