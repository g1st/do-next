import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TextField, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ModalLoader from './UI/ModalLoader/ModalLoader';
import { EmailSent } from '../styles/Contact';

const styles = (theme) => ({
  wrapper: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    marginTop: '50px',
    padding: '10px',
    maxWidth: '300px',
    width: '100%',
  },
  message: {
    alignSelf: 'flex-start',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  paper: {
    maxWidth: '700px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    margin: `${theme.spacing(3)}px auto ${theme.spacing(3)}px auto`,
    padding: theme.spacing(2),
    paddingBottom: '20px',
    backgroundColor: '#fafafa',

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      paddingBottom: '32px',
    },
  },
});

class ContactForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    subject: '',
    email: '',
    message: '',
    isSendingMail: false,
    emailSent: false,
    errors: { message: null, email: null, subject: null },
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSendingMail: true });
    const { email, message, subject } = this.state;

    axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/send`, {
        email,
        message,
        subject,
        contactForm: true,
      })
      .then((res) => {
        this.setState(() => ({
          isSendingMail: false,
          emailSent: true,
        }));
      })
      .catch((err) => {
        const { errors } = err.response.data;
        this.setState(() => ({
          isSendingMail: false,
          errors: errors.reduce((acc, err) => {
            acc[err.param] = err.msg;
            return acc;
          }, {}),
        }));
      });
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      emailSent,
      errors,
      isSendingMail,
      message,
      subject,
    } = this.state;

    if (isSendingMail) {
      return <ModalLoader />;
    }
    if (emailSent) {
      return (
        <EmailSent>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="body1">
              Thank you, your message has been sent.
            </Typography>
          </Paper>
        </EmailSent>
      );
    }
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.paper} elevation={3}>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <TextField
              value={email}
              id="email"
              label="Email"
              type="email"
              required
              fullWidth
              margin="normal"
              InputLabelProps={{
                required: false,
              }}
              classes={{ root: classes.labelRoot }}
              onChange={this.handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              color="secondary"
            />
            <TextField
              value={subject}
              id="subject"
              label="Subject"
              required
              InputLabelProps={{
                required: false,
              }}
              type="text"
              margin="normal"
              fullWidth
              onChange={this.handleChange('subject')}
              error={!!errors.subject}
              helperText={errors.subject}
              color="secondary"
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
              rows={12}
              InputLabelProps={{
                required: false,
              }}
              onChange={this.handleChange('message')}
              error={!!errors.message}
              helperText={errors.message}
              color="secondary"
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              SEND
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ContactForm);
