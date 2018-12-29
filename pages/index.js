import Layout from '../components/Layout';
import Link from 'next/link';

const Index = props => (
  <Layout pathname={props.pathname} collections={props.collections}>
    <div>alohha</div>
    <Link href="/works">
      <a>Works</a>
    </Link>
    <br />
    <Link href="/checkout">
      <a>checkout</a>
    </Link>
    <br />
    <Link href="/about">
      <a>About</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home</a>
    </Link>
    <div>Path: {props.pathname}</div>
    <div>From: {props.from}</div>
    <div>Data: {props.data}</div>
  </Layout>
);

Index.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default Index;
