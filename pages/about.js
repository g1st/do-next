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
  }
});

const About = ({ pathname, collections, classes }) => (
  <Layout pathname={pathname} collections={collections}>
    <Wrapper>
      <Left>
        <PortraitWrapper>
          <Image src="/static/images/fff-2.JPG" alt="Dovile's Portrait" />
          <Caption>
            <Typography variant="subtitle2" align="right">
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
                <Typography variant="body1">2011</Typography>
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
      </Left>
      <Divider className={classes.divider} />
      <Right>
        <ImageWrapper>
          <Image src="/static/images/s-1.JPG" alt="Model wearing brooch" />
          <Caption>
            <Typography variant="subtitle2" align="right">
              photo credit &copy;Agne Bekeraityte
            </Typography>
          </Caption>
        </ImageWrapper>
        <ArtistStatement>
          <Typography variant="h5" className={classes.marginTop} paragraph>
            ARTIST'S STATEMENT
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            doloremque cupiditate optio voluptatem veniam rem fugit sed atque
            inventore vero.
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            doloremque cupiditate optio voluptatem veniam rem fugit sed atque
            inventore vero. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nesciunt doloremque cupiditate optio voluptatem veniam rem
            fugit sed atque inventore vero.
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            doloremque cupiditate optio voluptatem veniam rem fugit sed atque
            inventore vero.
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
