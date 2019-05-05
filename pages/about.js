import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  ArtistStatement
} from '../styles/About';
import { AnchorLink, Table, Row, Data } from '../styles/Shared';

const styles = () => ({
  divider: {
    margin: '30px 0',
    '@media (min-width: 960px)': {
      display: 'none'
    }
  },
  marginTop: {
    marginTop: '36px'
  },
  credit: {
    fontWeight: 100,
    fontSize: '0.8rem',
    color: 'rgba(0,0,0,0.5)'
  }
});

const About = ({ pathname, collections, classes }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="About | Dovile Jewellery"
  >
    <Wrapper>
      <Left>
        <PortraitWrapper>
          <Image src="/static/images/fff-2.JPG" alt="Dovile's Portrait" />
          <Caption>
            <Typography
              variant="subtitle2"
              align="right"
              className={classes.credit}
            >
              photo credit &copy;Agne Bekeraityte
            </Typography>
          </Caption>
        </PortraitWrapper>
        <AuthorNameText>
          <Typography variant="h4">Dovile Kondrasovaite</Typography>
          <Typography variant="body1" gutterBottom>
            Born 19/3/1989 in Dusetos, Lithuania
          </Typography>
        </AuthorNameText>
        <Typography variant="h5" gutterBottom>
          EDUCATION
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                <Typography variant="body1">2008-2012</Typography>
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
                <Typography variant="body1">2010-2011</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  Study exchange Escola Massana, Barcelona, Spain
                </Typography>
              </Data>
            </Row>
          </tbody>
        </Table>
        <Typography variant="h5" gutterBottom>
          PROFESSIONAL POSITION
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                <Typography variant="body1" gutterBottom>
                  2016-current
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
                  2013-2015
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
        <Typography variant="h5" gutterBottom>
          EXHIBITIONS
        </Typography>
        <Table>
          <tbody>
            <Row>
              <Data>
                <Typography variant="body1">2008-2012</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  todo
                </Typography>
              </Data>
            </Row>
            <Row>
              <Data>
                <Typography variant="body1">2010-2011</Typography>
              </Data>
              <Data>
                <Typography variant="body1" gutterBottom>
                  todo
                </Typography>
              </Data>
            </Row>
          </tbody>
        </Table>
      </Left>
      <Divider className={classes.divider} />
      <Right>
        <ImageWrapper>
          <Image src="/static/images/s-1.JPG" alt="Model wearing brooch" />
          <Caption>
            <Typography
              variant="subtitle2"
              align="right"
              className={classes.credit}
            >
              photo credit &copy;Agne Bekeraityte
            </Typography>
          </Caption>
        </ImageWrapper>
        <ArtistStatement>
          <Typography variant="h5" className={classes.marginTop} paragraph>
            ARTIST'S STATEMENT
          </Typography>
          <Typography variant="body1" className={classes.marginTop} paragraph>
            THE DIALOGUE BETWEEN PAST, PRESENT AND FUTURE
          </Typography>
          <Typography variant="body1" paragraph align="justify">
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
          <Typography variant="body1" paragraph align="justify">
            The materials I have chosen to work with have gone through long
            ageing processes until they have reached my hands as natural raw
            Baltic amber and bog oak and other naturally black hardwoods. Amber
            as a material is deeply rooted in my Baltic identity and, sadly, is
            not a self-renewable resource. Its overuse within commercial mass
            produced jewellery design has inspired me to explore the material
            within my own work with a hope to modify the image of amber and to
            use it in a more considered and contemporary way.
          </Typography>
          <Typography variant="body1" paragraph align="justify">
            I bring wood and amber together into sculptural shapes. The visual
            confrontation of hard black wood and fragile amber and dynamic
            volume creates intriguing dialogue. Every design in shaping comes
            spontaneously without sketching or modelling. It is a satisfying
            journey following the very special material and my inner mood.
            Sometimes it goes into a very dramatic structure sometimes turn into
            a still and light design.
          </Typography>
          <Typography variant="body1" paragraph align="justify">
            Over the time and with wear the objects will change, the surface may
            rub off, may crack and polish naturally. It is sustainable
            jewellery, which after wearing could be dropped into the bog or the
            sea again to continue the processes.
          </Typography>
        </ArtistStatement>
      </Right>
    </Wrapper>
  </Layout>
);

About.propTypes = {
  classes: PropTypes.object.isRequired,
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

About.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(About);
