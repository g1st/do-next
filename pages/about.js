import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  }
});

import Layout from '../components/Layout';

class About extends React.Component {
  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout pathname={this.props.pathname}>
        <div>
          <div>
            <p>This is About page.</p>
            <p>path: {this.props.pathname}</p>
          </div>
          <div>
            <div className={classes.root}>
              <Typography variant="h4" gutterBottom>
                Material-UI
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                about page
              </Typography>
              <Typography gutterBottom>
                <Link href="/">
                  <a>Go to the main page</a>
                </Link>
              </Typography>
              <Button variant="contained" color="primary">
                Do nothing button
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
