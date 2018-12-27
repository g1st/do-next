import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { array } from 'prop-types';

class Index extends React.Component {
  static async getInitialProps({ pathname, req }) {
    // credits http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
    if (req) {
      // If `req` is defined, we're rendering on the server and should use
      // MongoDB directly. One could also use the REST API, but that's slow
      // and inelegant.
      const { db } = req;
      // Note that `db` above comes from express middleware

      const data = await db
        .collection('works')
        .find()
        .toArray();

      const collections = data.reduce((acc, next) => {
        acc.push(next.group);
        return acc;
      }, []);

      return {
        data: JSON.stringify(data),
        pathname,
        from: 'server',
        collections
      };
    }
    // we are on a client and can access localStorage - no need for api call
    if (localStorage.getItem('data')) {
      return {
        data: localStorage.getItem('data'),
        collections: localStorage.getItem('collections').split(','),
        from: 'rest api',
        pathname
      };
    }
    // Otherwise, we're rendering on the client and need to use the API
    const works = await axios.get('/api').then(res => {
      return res.data;
    });

    const collections = works.reduce((acc, next) => {
      acc.push(next.group);
      return acc;
    }, []);

    return {
      data: JSON.stringify(works),
      pathname,
      from: 'rest api',
      collections
    };
  }
  componentDidMount() {
    // Save data to localStorage
    if (!localStorage.getItem('data')) {
      localStorage.setItem('data', this.props.data);
      localStorage.setItem('collections', this.props.collections);
    }
  }

  render() {
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
        <Link href="/about">
          <a>About</a>
        </Link>
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
        <div>Path: {this.props.pathname}</div>
        <div>From: {this.props.from}</div>
        <div>Data: {this.props.data}</div>
      </Layout>
    );
  }
}

export default Index;

// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogActions from '@material-ui/core/DialogActions';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import Link from 'next/link';
// import styled from 'styled-components';

// const styles = theme => ({
//   root: {
//     textAlign: 'center',
//     paddingTop: theme.spacing.unit * 20
//   }
// });

// const StyledButton = styled(Button)`
//   && {
//     background: red;
//     border: 1px solid red;
//     font-size: 2rem;
//     font-weight: bold;
//   }
// `;

// class Index extends React.Component {
//   state = {
//     open: false
//   };

//   handleClose = () => {
//     this.setState({
//       open: false
//     });
//   };

//   handleClick = () => {
//     this.setState({
//       open: true
//     });
//   };

//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;

//     return (
//       <div className={classes.root}>
//         <h1>MATERIAL UI TESTUKAS</h1>
//         <Dialog open={open} onClose={this.handleClose}>
//           <DialogTitle>Super Secret Password</DialogTitle>
//           <DialogContent>
//             <DialogContentText>1-2-3-4-5</DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button color="primary" onClick={this.handleClose}>
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Typography variant="display1" gutterBottom>
//           Material-UI
//         </Typography>
//         <Typography variant="subheading" gutterBottom>
//           example project
//         </Typography>
//         <Typography gutterBottom>
//           <Link href="/about">
//             <a>Go to the about page</a>
//           </Link>
//         </Typography>
//         <Typography gutterBottom>
//           <Link href="/admin">
//             <a>Go to the admin page</a>
//           </Link>
//         </Typography>
//         <StyledButton
//           variant="contained"
//           color="secondary"
//           onClick={this.handleClick}
//         >
//           Super Secret Password
//         </StyledButton>
//       </div>
//     );
//   }
// }

// Index.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Index);
