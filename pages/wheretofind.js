import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import Layout from '../components/Layout';
import {
  Wrapper,
  Stockist,
  UpcomingEvents,
  Events,
  LatestEvents,
  ImageWrapper,
  Image
} from '../styles/WhereToFind';
import { AnchorLink, Table, Row, Data } from '../styles/Shared';

const WhereToFind = ({ pathname, collections }) => (
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
        <Typography variant="h5" gutterBottom>
          STOCKIST
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AnchorLink
            href="https://studiofusiongallery.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Studio Fusion Gallery
          </AnchorLink>
          , London
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AnchorLink
            href="https://www.artisan-alchemy.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Artisan Alchemy Gallery
          </AnchorLink>
          , Birmingham
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AnchorLink
            href="http://www.vda.lt/lt/galerija-argentum/apie-galerija"
            target="_blank"
            rel="noopener noreferrer"
          >
            Argentum Gallery
          </AnchorLink>
          , Vilnius
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AnchorLink
            href="https://www.facebook.com/theplaces17/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Place
          </AnchorLink>
          , Vilnius
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AnchorLink
            href="https://miutto.com/collections/dovile-jewellery"
            target="_blank"
            rel="noopener noreferrer"
          >
            miutto
          </AnchorLink>
        </Typography>
      </Stockist>
      <Events>
        <UpcomingEvents>
          <ImageWrapper>
            <Image src="/static/images/gf-14.JPG" alt="dovile jewellery" />
          </ImageWrapper>
          <Typography variant="h5" gutterBottom>
            UPCOMING EVENTS
          </Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">3-27 Aug</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://www.dazzle-exhibitions.co.uk/Exhibitions/Exhibition.aspx?pageid=1674"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body1" gutterBottom>
                      DAZZLE@DOVECOT, Edinburgh, UK
                    </Typography>
                  </AnchorLink>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">3-27 Aug</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://www.dazzle-exhibitions.co.uk/Exhibitions/Exhibition.aspx?pageid=1674"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body1" gutterBottom>
                      DAZZLE@DOVECOT, Edinburgh, UK
                    </Typography>
                  </AnchorLink>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">3-27 Aug</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://www.dazzle-exhibitions.co.uk/Exhibitions/Exhibition.aspx?pageid=1674"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body1" gutterBottom>
                      DAZZLE@DOVECOT, Edinburgh, UK
                    </Typography>
                  </AnchorLink>
                </Data>
              </Row>
            </tbody>
          </Table>
        </UpcomingEvents>
        <LatestEvents>
          <Typography variant="h5" gutterBottom>
            LATEST EVENTS
          </Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2018 Jun</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2018 Mar</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    AMBER TRIP, XV International Baltic Jewellery show, Litexpo,
                    Vilnius, Lithuania
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Nov</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    MAKING IT NOW, group exhibition curated by Gregory Parsons,
                    Ruthin Craft Centre, Ruthin, Wales, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Nov</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    PRESENT, group exhibition, Studio Fusion Gallery, Oxo Tower
                    Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Nov</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    DAZZLE LONDON, group exhibition, Oxo Tower Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Nov</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    MADE BY HAND CARDIFF, contemporary craft fair, Cardiff, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Sep</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    LUMINATES, group exhibition, Mint Shop, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Jul</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    NEW DESIGNERS, ONE YEAR ON, Business Design Centre, London,
                    UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Jun</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Mar</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    AMBER TRIP, Art Jewellery Competition show & jewellery show
                    Vilnius, Lithuania.
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2017 Jan</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    NATURE MORTE: Contemporary artists reinvigorate the
                    Still-Life tradition, group exhibition, Wroclaw National
                    Museum. Wroclav, Poland.
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2016 Jan</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
                    THE EYE/HOME, group exhibition, Magan gallery, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body1">2015 Sep</Typography>
                </Data>
                <Data>
                  <Typography variant="body1" gutterBottom>
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
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

WhereToFind.getInitialProps = async ({ pathname }) => ({ pathname });

export default WhereToFind;
