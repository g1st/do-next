import Layout from '../components/Layout';
import { Subscribe } from 'unstated';
import CartContainer from '../containers/CartContainer';

const Checkout = () => {
  return (
    <Layout pathname={false}>
      <Subscribe to={[CartContainer]}>
        {cart => (
          <div>
            <div>Checkout component</div>
            <div>{JSON.stringify(cart)}</div>
          </div>
        )}
      </Subscribe>
    </Layout>
  );
};

export default Checkout;
