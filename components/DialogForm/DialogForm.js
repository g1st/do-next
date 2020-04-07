import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  Paper,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ModalLoader from '../UI/ModalLoader/ModalLoader';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    }
  },
  button: {
    marginTop: '50px',
    padding: '10px',
    maxWidth: '300px',
    width: '100%',
    textAlign: 'center'
  }
});

class FormDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    open: false,
    subject: '',
    email: '',
    message: '',
    isSendingMail: false,
    emailSent: false,
    errors: { message: null, email: null, subject: null }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSendingMail: true });
    const { email, message, subject } = this.state;

    axios
      .post(`${process.env.APP_URL}/api/send`, {
        email,
        message,
        subject,
        contactForm: true
      })
      .then(res => {
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
    const {
      email,
      emailSent,
      errors,
      isSendingMail,
      message,
      subject,
      open
    } = this.state;

    const { classes } = this.props;

    if (isSendingMail) {
      return <ModalLoader />;
    }
    if (emailSent) {
      return (
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="contact-form"
        >
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="body2">
              Thank you, your message has been sent.
            </Typography>
          </Paper>
        </Dialog>
      );
    }

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Contact Dovile
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="contact-form"
        >
          <DialogContent>
            <form onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
              <TextField
                value={email}
                id="email"
                label="Email"
                placeholder="Your Email"
                type="email"
                required
                fullWidth
                margin="dense"
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
                margin="dense"
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
                margin="dense"
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
                color="primary"
                className={classes.button}
              >
                SEND
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog);
