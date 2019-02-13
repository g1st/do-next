// uncomment and import it to admin page to allow new signups

// import { Component } from 'react';

// class Signup extends Component {
//   state = {
//     email: '',
//     password: ''
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.authenticate(
//       { email: this.state.email, password: this.state.password },
//       'signup'
//     );
//   };

//   render() {
//     return (
//       <div>
//         <h3>Sign Up</h3>
//         <form onSubmit={e => this.handleSubmit(e)}>
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             value={this.state.email}
//             onChange={e => this.setState({ email: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             value={this.state.password}
//             onChange={e => this.setState({ password: e.target.value })}
//           />
//           <button type="submit" className="button is-success">
//             Sign In
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Signup;
