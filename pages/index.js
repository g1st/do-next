import Layout from '../components/Layout';
import { Subscribe } from 'unstated';
import {
  ClockContainer,
  CounterContainer,
  NavBarContainer
} from '../containers';
import { Clock, Counter, NavBar } from '../components/components';

class Index extends React.Component {
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Layout>
        <div>alohha</div>
        <Subscribe to={[ClockContainer, CounterContainer, NavBarContainer]}>
          {(clock, counter, navbar) => {
            this.timer = clock.interval;
            return (
              <div>
                <Clock clock={clock} />
                <Counter counter={counter} />
                <NavBar navbar={navbar} />
              </div>
            );
          }}
        </Subscribe>
        <div>antras aloha</div>
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
