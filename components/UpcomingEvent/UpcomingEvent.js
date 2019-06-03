import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  Wrapper,
  Data,
  Content,
  FlexItem,
  AnchorLink,
  WrapData,
  DataInner,
  ForBiggerScreens
} from '../../styles/UpcomingEvent';

const styles = () => ({
  joya: {
    fontWeight: '600',
    fontSize: '5rem',
    letterSpacing: '5px',
    '@media (min-width: 800px)': {
      fontSize: '6rem'
    }
  },
  infoDate: {
    textShadow: '1px 1px #333',
    fontWeight: 400,
    fontSize: '1.4rem',
    lineHeight: '24px',
    '@media (min-width: 700px)': {
      fontSize: '1.5rem',
      paddingLeft: '10px',
      lineHeight: 'unset',
      marginLeft: '14px'
    },
    '@media (min-width: 800px)': {
      fontSize: '1.7rem'
    }
  },
  infoTitle: {
    textShadow: '1px 1px #333',
    fontWeight: 400,
    fontSize: '1.4rem',
    lineHeight: '24px',
    '@media (min-width: 700px)': {
      fontSize: '1.5rem',
      paddingLeft: '10px',
      lineHeight: 'unset'
    },
    '@media (min-width: 800px)': {
      fontSize: '1.7rem'
    }
  },
  link: {
    textAlign: 'center',
    fontWeight: 300,
    letterSpacing: '1px',
    marginTop: '8px',
    '@media (min-width: 700px)': {
      fontSize: '1.1rem'
    },
    '@media (min-width: 800px)': {
      fontSize: '1.1rem',
      marginTop: 0
    },
    '@media (min-width: 900px)': {
      display: 'none'
    }
  },
  linkBig: {
    fontWeight: 300,
    fontSize: '1.4rem',
    paddingLeft: '40px'
  }
});

const UpcomingEvent = ({ classes }) => (
  <Wrapper>
    <Content>
      <WrapData>
        <Typography
          variant="h1"
          align="center"
          color="primary"
          classes={{ root: classes.joya }}
        >
          JOYA
        </Typography>
        <Data>
          <DataInner>
            <FlexItem>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                classes={{ root: classes.infoDate }}
              >
                10, 11, 12 October
              </Typography>
              <ForBiggerScreens>
                <AnchorLink
                  href="http://www.joyabarcelona.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Official JOYA website"
                >
                  <Typography
                    color="primary"
                    variant="body1"
                    align="center"
                    classes={{ root: classes.linkBig }}
                  >
                    www.joyabarcelona.com
                  </Typography>
                </AnchorLink>
              </ForBiggerScreens>
            </FlexItem>
            <FlexItem>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                classes={{ root: classes.infoTitle }}
              >
                Barcelona Art Jewellery &amp; Objects
              </Typography>
            </FlexItem>
          </DataInner>
        </Data>
      </WrapData>
      <AnchorLink
        href="https://www.joyabarcelona.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Official JOYA website"
      >
        <Typography
          color="primary"
          variant="body1"
          align="center"
          classes={{ root: classes.link }}
        >
          www.joyabarcelona.com
        </Typography>
      </AnchorLink>
    </Content>
  </Wrapper>
);

UpcomingEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpcomingEvent);
