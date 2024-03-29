import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Stockist,
  StockistText,
  UpcomingEvents,
  Events,
  ImageWrapper,
  Image,
  Data,
} from '../styles/WhereToFind';
import { AnchorLink, Table, Row } from '../styles/Shared';
import WhereToFindImage1 from '../public/images/wheretofind1.JPG';
import WhereToFindImage2 from '../public/images/wheretofind2.JPG';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    marginBottom: '3rem',
  },
});

const WhereToFind = ({ pathname, collections, classes, user }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="Where To Find | Dovile Ko"
    user={user}
  >
    <Wrapper>
      <Stockist>
        <ImageWrapper>
          <Image src={WhereToFindImage1} alt="Dovile Ko Flow collection" />
        </ImageWrapper>
        <StockistText>
          <Typography variant="h2" className={classes.heading}>
            STOCKISTS
          </Typography>
          <Typography variant="body1">
            <AnchorLink
              href="https://www.artisan-alchemy.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARTISAN ALCHEMY GALLERY
            </AnchorLink>
            , 85 Caroline Street, Birmingham, B3 1UP, UK
          </Typography>
        </StockistText>
      </Stockist>
      <Events>
        <UpcomingEvents>
          <ImageWrapper>
            <Image src={WhereToFindImage2} alt="Dovile Ko Flow collection" />
          </ImageWrapper>
          <Typography variant="h2" className={classes.heading}>
            UPCOMING EVENTS
          </Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">30 Sep - 1 Oct</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" display="inline">
                    Open Studios at The Quarterworkshop, 13-15 Fleet St,
                    Birmingham B3 1JP
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">14 - 15 Oct</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" display="inline">
                    Made In Leamington, Contemporary Design & Craft Fair, The
                    Royal Pump Rooms, Leamington Spa CV32 4AA
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>
        </UpcomingEvents>
      </Events>
    </Wrapper>
  </Layout>
);

WhereToFind.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

WhereToFind.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(WhereToFind);
