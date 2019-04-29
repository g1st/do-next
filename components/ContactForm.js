import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TextField, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import emailForContactForm from '../api/EmailTemplates/emailForContactForm';
import ModalLoader from './UI/ModalLoader/ModalLoader';
import { ImageWrapper, Image } from '../styles/Contact';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
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
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  paperWidth: {
    maxWidth: '500px',
    margin: '0 auto'
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

    const htmlMessage = emailForContactForm(message, email, subject);

    axios
      .post('http://localhost:3000/api/send', {
        email,
        message: htmlMessage,
        subject
      })
      .then(res => {
        if (onEmailSend) {
          onEmailSend(true);
        }
        this.setState(() => ({
          isSendingMail: false,
          emailSent: true
        }));
      })
      .catch(err => {
        const { errors } = err.response.data;
        this.setState(() => ({
          isSendingMail: false,
          errors: errors.reduce((acc, err) => {
            acc[err.param] = err.msg;
            return acc;
          }, {})
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
      subject
    } = this.state;

    if (isSendingMail) {
      return <ModalLoader />;
    }
    if (emailSent) {
      return (
        <>
          <ImageWrapper>
            <Image src="../static/images/message.svg" alt="Send a message" />
          </ImageWrapper>
          <Paper
            className={`${classes.paper} ${classes.paperWidth}`}
            elevation={3}
          >
            <Typography variant="body1">
              Thank you, your message has been sent.
            </Typography>
          </Paper>
        </>
      );
    }
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
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
        </Paper>
      </div>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onEmailSend: PropTypes.func
};

export default withStyles(styles)(ContactForm);
