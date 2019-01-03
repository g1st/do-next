import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios';

import Gallery from '../components/Gallery/Gallery';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(props.data)
    };
  }

  async loadMore(skip = 12, limit = 6) {
    // Otherwise, we're rendering on the client and need to use the API
    const works = await axios
      .get('/api', { params: { skip, limit } })
      .then(res => {
        console.log(res.data);
        return res.data;
      });

    this.setState(
      prevState => ({ data: [...prevState.data, ...works] }),
      () => console.log(this.state.data)
    );
  }

  render() {
    const data = JSON.parse(this.props.data);
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
        <div>Data: {JSON.stringify(this.state.data)}</div>
        {/* todo: load first 32, then load more button */}
        {this.state.data.length > 0 ? (
          <Gallery data={this.state.data} showCollection={'all'} />
        ) : (
          <p>Gallery empty</p>
        )}
        <button onClick={() => this.loadMore(12)}>
          Just load rest for now
        </button>
      </Layout>
    );
  }
}

Index.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default Index;
