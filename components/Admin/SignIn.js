import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticate } from '../../store/actions/index';

class Signin extends Component {
  static propTypes = {
    authenticate: PropTypes.func,
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { authenticate: authenticateRedux } = this.props;

    authenticateRedux({ email, password }, 'signin');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit" className="button is-success">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { authenticate })(Signin);
