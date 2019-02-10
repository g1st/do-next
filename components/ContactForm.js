import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Error from './Error/Error';
import ModalLoader from './UI/ModalLoader/ModalLoader';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
    // flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '50px'
  },
  message: {
    alignSelf: 'flex-start'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  paper: {
    marginTop: '2em',
    display: 'inline-block',
    padding: '1em 2em'
  }
});

class ContactForm extends Component {
  state = {
    subject: '',
    email: '',
    message: '',
    isSendingMail: false,
    emailSent: false,
    errors: { message: null, email: null, subject: null }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSendingMail: true });
    axios
      // change for deployment
      .post('http://localhost:3000/api/send', {
        subject: this.state.subject,
        email: this.state.email,
        message: this.state.message
      })
      .then(res => {
        console.log('hillowwwwwww');

        console.log(res);

        this.props.onEmailSend(true);
        this.setState(() => ({
          isSendingMail: false,
          emailSent: true
        }));
      })
      .catch(err => {
        // console.log(errors.map(err => ({ [err.param]: err.msg })));
        const { errors } = err.response.data;
        this.setState(() => ({
          isSendingMail: false,
          // errors: { ...errors.map(err => ({ [err.param]: err.msg })) },
          errors: errors.reduce((acc, err) => {
            acc[err.param] = err.msg;
            return acc;
          }, {})
        }));
      });
  };

  // after sent confirmation make a button to go back to shop/gallery

  render() {
    const { classes } = this.props;

    return this.state.isSendingMail ? (
      <ModalLoader />
    ) : this.state.emailSent ? (
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="body2">
          Thank you, your message has been sent.
        </Typography>
      </Paper>
    ) : (
      <div className={classes.wrapper}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <TextField
            value={this.state.email}
            id="email"
            label="Email"
            placeholder="Your Email"
            type="email"
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ required: false }}
            onChange={this.handleChange('email')}
            error={!!this.state.errors.email}
            helperText={
              !!this.state.errors.email && (
                <Error>{this.state.errors.email}</Error>
              )
            }
          />
          <TextField
            value={this.state.subject}
            id="subject"
            label="Subject"
            required
            InputLabelProps={{ required: false }}
            type="text"
            margin="normal"
            fullWidth
            onChange={this.handleChange('subject')}
            error={!!this.state.errors.subject}
            helperText={
              !!this.state.errors.subject && (
                <Error>{this.state.errors.subject}</Error>
              )
            }
          />

          <TextField
            value={this.state.message}
            id="message"
            label="Message"
            required
            margin="normal"
            type="text"
            multiline={true}
            fullWidth
            rows={4}
            InputLabelProps={{ required: false }}
            onChange={this.handleChange('message')}
            error={!!this.state.errors.message}
            helperText={
              !!this.state.errors.message && (
                <Error>{this.state.errors.message}</Error>
              )
            }
          />
          <Button
            type="submit"
            size="medium"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            SEND
          </Button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactForm);
