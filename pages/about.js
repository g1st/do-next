import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowDropDown } from '@material-ui/icons';

import Layout from '../components/Layout';
import {
  AuthorNameText,
  Wrapper,
  Left,
  Right,
  ImageWrapper,
  PortraitWrapper,
  Image,
  Caption,
  ArtistStatement,
  WrapLink,
  ToArtistStatement,
} from '../styles/About';
import { AnchorLink, Table, Row, Data } from '../styles/Shared';
import DovilePortait from '../public/images/Dovile-Kondrasovaite.jpeg';
import ManWearingABrooch from '../public/images/s-1.jpeg';

const styles = () => ({
  marginTop: {
    marginTop: '36px',
  },
  credit: {
    fontWeight: 100,
    fontSize: '0.8rem',
    color: 'rgba(0,0,0,0.5)',
  },
  lighterFont: {
    fontWeight: 400,
  },
  fontSize: {
    fontSize: '1.3rem',
  },
  authorName: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    fontSize: '2rem',
  },
  button: {
    lineHeight: '24px',
  },
  icon: {
    alignSelf: 'center',
  },
  h4: {
    fontSize: '1rem',
  },
});

const About = ({ pathname, collections, classes, user }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="About | Dovile Ko"
    user={user}
  >
    <Wrapper>
      <Left>
        <PortraitWrapper>
          <Image
            src={DovilePortait}
            alt="Portrait photo of Dovile Kondrasovaite"
          />
          <Caption>
            <Typography variant="body1">Dovile wearing FLOW ring</Typography>
            <Typography variant="subtitle2" className={classes.credit}>
              &copy;Agne Bekeraityte
            </Typography>
          </Caption>
        </PortraitWrapper>
        <AuthorNameText>
          <Typography variant="h2" className={classes.authorName}>
            Dovile Kondrasovaite
          </Typography>
          <Typography variant="body1" gutterBottom>
            Born 1989, Dusetos, Lithuania
          </Typography>
        </AuthorNameText>
        <WrapLink>
          <ToArtistStatement href="#artist-statement">
            <Typography
              variant="h3"
              className={`${classes.fontSize} ${classes.button}`}
            >
              READ ARTIST&apos;S STATEMENT
            </Typography>
          </ToArtistStatement>
          <ToArtistStatement href="#artist-statement">
            <ArrowDropDown fontSize="small" className={classes.icon} />
          </ToArtistStatement>
        </WrapLink>
        <Typography variant="h3" gutterBottom className={classes.fontSize}>
          EDUCATION
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                <Typography variant="body1">2012</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  BA in jewellery and smithery, Vilnius Academy of Arts,
                  Lithuania
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2011</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  Study exchange at Escola Massana, Barcelona, Spain
                </Typography>
              </Data>
            </Row>
          </tbody>
        </Table>
        <Typography variant="h3" gutterBottom className={classes.fontSize}>
          PROFESSIONAL POSITION
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                <Typography variant="body1" gutterBottom>
                  2020 - current
                </Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  Insignia jeweller,{' '}
                  <AnchorLink
                    href="https://toye.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Toye, Kenning & Spencer
                  </AnchorLink>
                  , Birmingham, UK
                </Typography>{' '}
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1" gutterBottom>
                  2016 - current
                </Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  Jewellery tutor,{' '}
                  <AnchorLink
                    href="https://www.thequarterworkshop.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Quarterworkshop
                  </AnchorLink>
                  , Birmingham, UK
                </Typography>{' '}
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1" gutterBottom>
                  2019 - 2020
                </Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  Artist in Residence,{' '}
                  <AnchorLink
                    href="https://www.bcu.ac.uk/jewellery"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Birmingham School of Jewellery
                  </AnchorLink>
                  , UK
                </Typography>{' '}
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1" gutterBottom>
                  2013 - 2015
                </Typography>
              </Data>
              <Data>
                {' '}
                <Typography variant="body1" gutterBottom>
                  Jewellery tutor, Art Studio Ramios Bites, Vilnius, Lithuania
                </Typography>
              </Data>
            </Row>
          </tbody>
        </Table>
        <Typography variant="h3" gutterBottom className={classes.fontSize}>
          EXHIBITIONS
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                <Typography variant="body1">2021</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  THE DREAMERS, collection preview, Meno Materija, Kaunas,
                  Lithuania
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2019</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  TEKME/FLOW, solo exhibition, Art jewellery gallery ARgenTum,
                  Vilnius, Lithuania
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2019</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  TRIPLE PARADE Biennale for Contemporary Jewellery, How Design
                  Center, Shanghai, China
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2017</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  MAKING IT NOW, group exhibition, Ruthin Craft Centre, Ruthin,
                  Wales, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2017</Typography>
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
                <Typography variant="body1">2017</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  LUMINATES, group exhibition, Mint Shop, London, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2017</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  NATURE MORTE: Contemporary artists reinvigorate the Still-Life
                  tradition, group exhibition, Wroclaw National Museum, Wroclav,
                  Poland
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2016</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  THE EYE / HOME, group exhibition, Magan gallery, London, UK
                </Typography>
              </Data>
            </Row>
          </tbody>
        </Table>
        <Typography variant="h3" gutterBottom className={classes.fontSize}>
          LATEST EVENTS
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2020</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  MADE, Yorkshire Sculpture Park, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2019</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  CENTREPIECE, Birmingham, UK.
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2019</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  JOYA Barcelona Art Jewellery & Objects, Barcelona, Spain.
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2019</Typography>
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
                <Typography variant="body1">2018</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  DAZZLE LONDON, Oxo Tower Wharf, London, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2018</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  MADE IN LEAMINGTON, Town Hall, Entertainments Venue,
                  Leamington Spa, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2018</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  DAZZLE @ DOVECOT, Edinburgh, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2018</Typography>
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
                <Typography variant="body1">2018</Typography>
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
                <Typography variant="body1">2017</Typography>
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
                <Typography variant="body1">2017</Typography>
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
                <Typography variant="body1">2017</Typography>
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
                <Typography variant="body1">2017</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  NEW DESIGNERS, ONE YEAR ON, Business Design Centre, London, UK
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2017</Typography>
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
                <Typography variant="body1">2017</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  AMBER TRIP, Art Jewellery Competition show & jewellery show
                  Vilnius, Lithuania
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                {' '}
                <Typography variant="body1">2017</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  THE EYE, Contemporary Jewellery Symposium, Telsiai, Lithuania
                </Typography>
              </Data>
            </Row>
          </tbody>
        </Table>
      </Left>
      <Right>
        <ArtistStatement>
          <Typography
            variant="h3"
            className={`${classes.fontSize} ${classes.marginTop}`}
            paragraph
            id="artist-statement"
          >
            ARTIST&apos;S STATEMENT
          </Typography>
          <Typography variant="body1" paragraph>
            My artistic journey as a jewellery maker is steeped in the
            exploration of time and the beauty of natural ageing processes. I
            imbue each piece with a sense of life and growth, using hand-carved
            amber and wood, symbolising the timeless allure of nature. Deeply
            rooted in my Baltic identity, I&apos;m committed to sustainable
            sourcing, aiming to redefine the use of amber in contemporary
            jewellery.
          </Typography>
          <Typography variant="body1" paragraph>
            In my creative palette, I also extensively work with precious metals
            and gemstones. My &quot;We Are All Dreamers&quot; earring collection
            is a tribute to the shared human spirit of dreaming, weaving
            intricate silver designs with vibrant gemstones to mirror the
            colourful range of our collective aspirations.
          </Typography>
          <Typography variant="body1" paragraph>
            Inspired by the dynamic volumes of the sea, my &apos;Flow&apos;
            collection breaks the mould of conventional jewellery. It explores
            large, statement pieces that extend the traditional understanding of
            a ring, reflecting the fluidity and ceaseless rhythm of ocean waves.
          </Typography>
          <Typography variant="body1" paragraph>
            Over time, my pieces, like nature, evolve gracefully. Their surfaces
            change, revealing the traces of time and the cyclical journey of
            nature. Through my work, I invite wearers to embrace this
            transformation, encapsulating the cycle of life and time in each
            unique piece.
          </Typography>
        </ArtistStatement>
        <ImageWrapper>
          <Image
            src={ManWearingABrooch}
            alt="A man wearing FLOW silver brooch"
          />
          <Caption>
            <Typography variant="body1">
              A man wearing FLOW silver brooch
            </Typography>
            <Typography
              variant="subtitle2"
              align="right"
              className={classes.credit}
            >
              &copy;Agne Bekeraityte
            </Typography>
          </Caption>
        </ImageWrapper>
      </Right>
    </Wrapper>
  </Layout>
);

About.propTypes = {
  classes: PropTypes.object.isRequired,
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.string,
};

About.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(About);
