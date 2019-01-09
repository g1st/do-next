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

class Works extends React.Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(props.data);
    const collections = { all: { data, itemsLoaded: ITEMS_PER_PAGE } };

    const dataForSelectedCollection = (data, collection) => {
      return data.filter(x => x.group == collection);
    };

    props.collections.forEach(collection => {
      collections[collection] = {
        data: dataForSelectedCollection(data, collection),
        itemsLoaded: ITEMS_PER_PAGE
      };
    });

    this.state = {
      data,
      ...collections
    };
  }

  loadMore(collection) {
    this.setState(prevState => ({
      // ...prevState,
      [collection]: {
        ...prevState[collection],
        itemsLoaded: prevState[collection].itemsLoaded + ITEMS_PER_PAGE
      }
    }));
  }

  render() {
    console.log(this.state);

    var { collection } = this.props.router.query;

    if (!this.props.collections.includes(collection)) {
      collection = 'all';
    }

    let gallery = <p>Gallery empty</p>;
    let loadMoreButton = null;
    if (this.state[collection] && this.state[collection].data.length > 0) {
      gallery = (
        <Gallery
          data={this.state[collection].data.slice(
            0,
            this.state[collection].itemsLoaded
          )}
          showCollection={collection}
        />
      );

      if (
        this.state[collection].data.length > this.state[collection].itemsLoaded
      ) {
        loadMoreButton = (
          <ButtonContainer>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              onClick={() => this.loadMore(collection)}
            >
              Load More
            </Button>
          </ButtonContainer>
        );
      }
    }

    return (
      <Layout
        pathname={this.props.pathname}
        collections={this.props.collections}
      >
        <div>
          <p>This is Works page.</p>
          <p>path: {this.props.pathname}</p>
          <p>from: {this.props.from}</p>
          <Link href="/piece">
            <a>Dedicated item page</a>
          </Link>
          {gallery}
          {loadMoreButton}
        </div>
      </Layout>
    );
  }
}

Works.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default Works;
