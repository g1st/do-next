import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  Wrapper,
  ButtonWrapper,
  Data,
  Content,
  FlexItem
} from '../../styles/UpcomingEvent';

const styles = () => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingTop: '1px'
  },
  wrapper: {
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: '#9E9E9E',
    '&:hover': {
      backgroundColor: '#212121'
    }
  },
  fabProgress: {
    color: '#9E9E9E',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: '#9E9E9E',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  inputRoot: {
    fontSize: '14px',
    maxWidth: '178px',
    background: '#fff',
    padding: '3px',
    borderRadius: '3px 0 0 3px'
  },
  newsletter: {
    textShadow: '2px 2px #333',
    letterSpacing: '3px',
    textAlign: 'center',
    '@media (min-width: 960px)': {
      alignSelf: 'flex-start',
      fontSize: '1rem'
    },
    '@media (min-width: 1000px)': {
      fontSize: '1.2rem'
    },
    '@media (min-width: 1200px)': {
      alignSelf: 'flex-start',
      fontSize: '1.5rem'
    }
  },
  joya: {
    textShadow: '4px 4px #333',
    fontWeight: '500',
    fontSize: '4rem',
    letterSpacing: '3px',
    margin: '10px 0 10px 0',
    '@media (min-width: 700px)': {
      fontSize: '6rem'
    },
    '@media (min-width: 960px)': {
      fontSize: '8rem'
    },
    '@media (min-width: 1200px)': {
      fontSize: '10rem',
      textShadow: '4px 4px #333'
    }
  },
  info: {
    textShadow: '1px 1px #333',
    fontWeight: '500',
    '@media (min-width: 700px)': {
      fontSize: '1.2rem'
    },
    '@media (min-width: 960px)': {
      textShadow: '2px 2px #333',
      fontSize: '1.5rem',
      padding: '0 10px'
    },
    '@media (min-width: 1200px)': {
      fontSize: '1.8rem'
    }
  },
  button: {
    margin: '0 auto',
    minWidth: '100px',
    '@media (min-width: 1200px)': {
      marginBottom: '10px'
    }
  },
  checkIcon: {
    color: '#4CAF50'
  }
});

const UpcomingEvent = ({ classes }) => {
  const handleClick = () => {};

  return (
    <Wrapper>
      <Content>
        <Typography
          variant="h5"
          align="center"
          color="primary"
          classes={{ root: classes.newsletter }}
        >
          UPCOMING EVENT
        </Typography>
        <Typography
          variant="h1"
          align="center"
          color="primary"
          classes={{ root: classes.joya }}
        >
          JOYA
        </Typography>
        <Data>
          <FlexItem>
            <Typography
              variant="body1"
              align="center"
              color="primary"
              classes={{ root: classes.info }}
            >
              October 10, 11, 12
            </Typography>
          </FlexItem>
          <FlexItem>
            <Typography
              variant="body1"
              align="center"
              color="primary"
              classes={{ root: classes.info }}
            >
              BARCELONA ART
            </Typography>
          </FlexItem>
          <FlexItem>
            <Typography
              variant="body1"
              align="center"
              color="primary"
              classes={{ root: classes.info }}
            >
              JEWELLERY &amp; OBJECTS
            </Typography>
          </FlexItem>
        </Data>
        <ButtonWrapper>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            classes={{ root: classes.button }}
            onClick={handleClick}
          >
            Learn more
          </Button>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
};

UpcomingEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpcomingEvent);
