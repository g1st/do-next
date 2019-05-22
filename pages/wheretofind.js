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
  LatestEvents,
  ImageWrapper,
  Image,
  Data
} from '../styles/WhereToFind';
import { AnchorLink, Table, Row } from '../styles/Shared';

const styles = () => ({
  fontSize: {
    fontSize: '1.2rem'
  }
});

const WhereToFind = ({ pathname, collections, classes }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="Where To Find | Dovile Jewellery"
  >
    <Wrapper>
      <Stockist>
        <ImageWrapper>
          <Image src="/static/images/ef-13.JPG" alt="dovile jewellery" />
        </ImageWrapper>
        <Typography variant="body1" gutterBottom className={classes.fontSize}>
          STOCKIST
        </Typography>
        <StockistText>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://studiofusiongallery.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              STUDIO FUSION GALLERY
            </AnchorLink>
            , Unit 1:06, Oxo Tower Wharf, Bargehouse Street, London SE1 9PH, UK
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://www.artisan-alchemy.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARTISAN ALCHEMY GALLERY
            </AnchorLink>
            , 85 Caroline Street, Birmingham, B3 1UP, UK
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="http://www.vda.lt/lt/galerija-argentum/apie-galerija"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARGENTUM GALLERY
            </AnchorLink>
            , Latako g. 2, Vilnius, Lithuania
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://www.facebook.com/theplaces17/"
              target="_blank"
              rel="noopener noreferrer"
            >
              THE PLACE
            </AnchorLink>
            , Subaciaus g. 17-33, Vilnius, Lithuania
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://miutto.com/collections/dovile-jewellery"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIUTTO
            </AnchorLink>
          </Typography>
        </StockistText>
      </Stockist>
      <Events>
        <UpcomingEvents>
          <ImageWrapper>
            <Image src="/static/images/gf-14.JPG" alt="dovile jewellery" />
          </ImageWrapper>
          <Typography variant="body1" gutterBottom className={classes.fontSize}>
            UPCOMING EVENTS
          </Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">May - July</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://www.lgac.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body2" gutterBottom inline>
                      SUMMER SHOWCASE
                    </Typography>
                  </AnchorLink>
                  <Typography cariant="body2" gutterBottom inline>
                    {' '}
                    at Llantarnam Grange Arts Centre, Wales, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">10-12 Oct</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://preview.joyabarcelona.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body2" gutterBottom inline>
                      JOYA Barcelona Art Jewellery & Objects
                    </Typography>
                  </AnchorLink>
                  <Typography cariant="body2" gutterBottom inline>
                    , Barcelona, Spain
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>
        </UpcomingEvents>
        <LatestEvents>
          <Typography variant="body1" gutterBottom className={classes.fontSize}>
            LATEST EVENTS
          </Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2019</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    AMBER TRIP, XV International Baltic Jewellery show, Litexpo,
                    Vilnius, Lithuania
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2018</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    DAZZLE LONDON, Oxo Tower Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2018</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    MADE IN LEAMINGTON, Town Hall, Entertainments Venue,
                    Leamington Spa, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2018</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    DAZZLE @ DOVECOT, Edinburgh, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2018</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2018</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    AMBER TRIP, XV International Baltic Jewellery show, Litexpo,
                    Vilnius, Lithuania
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    DAZZLE LONDON, group exhibition, Oxo Tower Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    MADE BY HAND CARDIFF, contemporary craft fair, Cardiff, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    DAZZLE LONDON, group exhibition, Oxo Tower Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    NEW DESIGNERS, ONE YEAR ON, Business Design Centre, London,
                    UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    AMBER TRIP, Art Jewellery Competition show & jewellery show
                    Vilnius, Lithuania
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">2017</Typography>
                </Data>
                <Data>
                  <Typography variant="body2" gutterBottom>
                    THE EYE, Contemporary Jewellery Symposium, Telsiai,
                    Lithuania
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>
        </LatestEvents>
      </Events>
    </Wrapper>
  </Layout>
);

WhereToFind.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  classes: PropTypes.object.isRequired
};

WhereToFind.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(WhereToFind);
