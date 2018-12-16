import { Subscribe } from 'unstated';
import CartContainer from '../containers/CartContainer';

export default function withContext(WrappedComponent) {
  return props => (
    <Subscribe to={[CartContainer]}>
      {cart => {
        return <WrappedComponent {...cart} {...props} />;
      }}
    </Subscribe>
  );
}
