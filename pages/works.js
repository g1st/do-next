import Link from 'next/link';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

const Works = props => {
  const data = JSON.parse(props.data);
  var { collection } = props.router.query;

  if (!props.collections.includes(collection)) {
    collection = 'all';
  }

  return (
    <Layout pathname={props.pathname} collections={props.collections}>
      <div>
        <p>This is Works page.</p>
        <p>path: {props.pathname}</p>
        <p>from: {props.from}</p>
        <Link href="/piece">
          <a>Dedicated item page</a>
        </Link>
        {data.length > 0 ? (
          <Gallery data={data} showCollection={collection} />
        ) : (
          <p>Gallery empty</p>
        )}
      </div>
    </Layout>
  );
};

Works.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default Works;
