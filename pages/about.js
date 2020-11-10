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
              READ ARTIST'S STATEMENT
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
                  2016 - current
                </Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  Jewellery tutor,{' '}
                  <AnchorLink
                    href="http://www.thequarterworkshop.com/"
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
            ARTIST'S STATEMENT
          </Typography>
          <Typography variant="h4" className={classes.h4} paragraph>
            THE DIALOGUE BETWEEN PAST, PRESENT AND FUTURE
          </Typography>
          <Typography variant="body1" paragraph>
            The central concept of my jewellery is time and natural ageing
            processes. This is shown through the use of hand-carved amber and
            wood, their interplay, giving a sense of the growth to the wearer.
            My task is to make an object which itself cannot be measured clearly
            within a timescale. The shapes I am making could look like driftwood
            or a still growing structure. To me, ageing is an absolutely
            gorgeous process which naturally creates such great lines no matter
            if it is my face getting wrinkles, a tree bark or a bud of flower
            starting to bloom or even a coming wave. It could take seconds or
            centuries.
          </Typography>
          <Typography variant="body1" paragraph>
            The materials I have chosen to work with have gone through long
            ageing processes until they have reached my hands as natural raw
            Baltic amber and bog oak and other naturally black hardwoods. Amber
            as a material is deeply rooted in my Baltic identity and, sadly, is
            not a self-renewable resource. Its overuse within commercial mass
            produced jewellery design has inspired me to explore the material
            within my own work with a hope to modify the image of amber and to
            use it in a more considered and contemporary way.
          </Typography>
          <Typography variant="body1" paragraph>
            I bring wood and amber together into sculptural shapes. The visual
            confrontation of hard black wood and fragile amber and dynamic
            volume creates intriguing dialogue. Every design in shaping comes
            spontaneously without sketching or modelling. It is a satisfying
            journey following the very special material and my inner mood.
            Sometimes it goes into a very dramatic structure sometimes turn into
            a still and light design.
          </Typography>
          <Typography variant="body1" paragraph>
            Over the time and with wear the objects will change, the surface may
            rub off, may crack and polish naturally. It is sustainable
            jewellery, which after wearing could be dropped into the bog or the
            sea again to continue the processes.
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
