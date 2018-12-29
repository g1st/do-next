import Link from 'next/link';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

const Works = props => (
  <Layout pathname={props.pathname} collections={props.collections}>
    <div>
      <p>This is Works page.</p>
      <p>path: {props.pathname}</p>
      <p>from: {props.from}</p>
      <Link href="/piece">
        <a>Dedicated item page</a>
      </Link>
      {props.data.length > 0 ? (
        <Gallery data={JSON.parse(props.data)} />
      ) : (
        <p>Gallery empty</p>
      )}
    </div>
  </Layout>
);

Works.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default Works;
