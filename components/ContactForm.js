import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    const { onEmailSend } = this.props;
    const { email, message, subject } = this.state;
    axios
      // change for deployment
      .post('http://localhost:3000/api/send', {
        email,
        message,
        subject
      })
      .then(res => {
        console.log('hillowwwwwww');

        console.log(res);

        onEmailSend(true);
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
    const {
      email,
      emailSent,
      errors,
      isSendingMail,
      message,
      subject
    } = this.state;

    if (isSendingMail) {
      return <ModalLoader />;
    }
    if (emailSent) {
      return (
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="body2">
            Thank you, your message has been sent.
          </Typography>
        </Paper>
      );
    }
    return (
      <div className={classes.wrapper}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <TextField
            value={email}
            id="email"
            label="Email"
            placeholder="Your Email"
            type="email"
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ required: false }}
            onChange={this.handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            value={subject}
            id="subject"
            label="Subject"
            required
            InputLabelProps={{ required: false }}
            type="text"
            margin="normal"
            fullWidth
            onChange={this.handleChange('subject')}
            error={!!errors.subject}
            helperText={errors.subject}
          />

          <TextField
            value={message}
            id="message"
            label="Message"
            required
            margin="normal"
            type="text"
            multiline
            fullWidth
            rows={4}
            InputLabelProps={{ required: false }}
            onChange={this.handleChange('message')}
            error={!!errors.message}
            helperText={errors.message}
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
  classes: PropTypes.object.isRequired,
  onEmailSend: PropTypes.func
};

export default withStyles(styles)(ContactForm);
