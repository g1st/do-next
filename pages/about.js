import React from 'react';
import PropTypes from 'prop-types';
import { buildUrl } from 'instafeed-lite';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import InstagramGallery from '../components/Gallery/InstagramGallery';
import Layout from '../components/Layout';
import {
  AnchorLink,
  AuthorNameText,
  WhereToFind,
  ShopOnline,
  Table,
  Row,
  Data,
  ImageGalleryWrapper
} from '../styles/About';
import { onImageError } from '../util/helpers';

const options = {
  accessToken: '1759380932.1677ed0.eb657c77753b4871aee13b962fe9b3b9',
  clientId: '30dea650b15e4a8b821fe1db7ce9cc54',
  get: 'user', // popular, user
  locationId: null,
  resolution: 'low_resolution', // thumbnail, low_resolution, standard_resolution
  sortBy: 'most-recent', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
  tagName: null,
  userId: 1759380932
};
const instagramUrl = buildUrl(options);

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  },
  body2: {
    whiteSpace: 'nowrap'
  },
  tbody: {
    verticalAlign: 'top'
  },
  h3: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '48px',
      fontWeight: '400'
    }
  },
  subtitle1: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px'
    }
  }
});

class About extends React.Component {
  _renderItem = item => {
    const { classes } = this.props;

    return (
      <div className="image-gallery-image">
        {item.imageSet ? (
          <picture onError={onImageError}>
            {item.imageSet.map((source, index) => (
              <source
                key={index}
                media={source.media}
                srcSet={source.srcSet}
                type={source.type}
              />
            ))}
            <img alt={item.originalAlt} src={item.original} />
          </picture>
        ) : (
          <img
            src={item.original}
            alt={item.originalAlt}
            srcSet={item.srcSet}
            sizes={item.sizes}
            title={item.originalTitle}
            onError={onImageError}
          />
        )}

        {item.description && (
          <div
            className="image-gallery-description"
            style={{ right: '0', left: 'initial' }}
          >
            <div>
              <Typography
                className={classes.h3}
                variant="h6"
                color="primary"
                align="right"
              >
                {item.description.split('|')[0]}
              </Typography>
              <Typography
                className={classes.subtitle1}
                variant="body2"
                color="primary"
                align="right"
              >
                {item.description.split('|')[1]}
              </Typography>
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    const gallery = [
      {
        original: `/static/images/dove.jpg`,
        originalAlt: "Dovile's Portrait",
        originalTitle: 'Image Title',
        renderItem: this._renderItem
      },
      {
        originalAlt: 'Dovile Jewellery Studio',
        originalTitle: 'the studio',
        // pipe [ '|' ] separates heading from body
        description:
          'the studio | is that special place where my time flies much faster than anywhere else.',
        original: `/static/images/dove.jpg`,
        renderItem: this._renderItem
      },
      {
        originalAlt: 'Works',
        originalTitle: 'the pieces',
        original: `/static/images/dove.jpg`,
        description:
          'the pieces | are all one of a kind made with lots of patience, accuracy and passion.',
        renderItem: this._renderItem
      },
      {
        originalAlt: 'Works',
        originalTitle: 'the pieces',
        original: `/static/images/dove.jpg`,
        description:
          'the pieces | are all one of a kind made with lots of patience, accuracy and passion.',
        renderItem: this._renderItem
      }
    ];

    const { classes, instagram, pathname, collections } = this.props;

    return (
      <Layout pathname={pathname} collections={collections}>
        <ImageGalleryWrapper>
          <ImageGallery
            items={gallery}
            showNav={false}
            showPlayButton
            showFullscreenButton={false}
            showThumbnails={false}
            autoPlay
            slideInterval={4000}
            showBullets
          />
        </ImageGalleryWrapper>

        <div>
          <AuthorNameText>
            <Typography variant="h5">Dovile Kondrasovaite</Typography>
            <Typography variant="body2">
              Born 19/3/1989 in Dusetos, Lithuania
            </Typography>
          </AuthorNameText>
          <Typography variant="subtitle1">EDUCATION</Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2008-2012
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    BA degree in jewellery and smithery, Vilnius Academy of
                    Arts, Lithuania
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2011
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    Study exchange Escola Massana, Barcelona, Spain
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>
          <Typography variant="subtitle1">PROFESSIONAL POSITION</Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2016-current
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
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
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2013-2015
                  </Typography>
                </Data>
                <Data>
                  {' '}
                  <Typography variant="body2">
                    Jewellery tutor, Art Studio Ramios Bites, Vilnius, Lithuania
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>

          <Typography variant="subtitle1">UPCOMING SHOWS</Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    3-27 Aug
                  </Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://www.dazzle-exhibitions.co.uk/Exhibitions/Exhibition.aspx?pageid=1674"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body2">
                      DAZZLE@DOVECOT, Edinburgh, UK
                    </Typography>
                  </AnchorLink>
                </Data>
              </Row>
            </tbody>
          </Table>
          <Typography variant="subtitle1">LATEST EVENTS</Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2018 Jun
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2018 Mar
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    AMBER TRIP, XV International Baltic Jewellery show, Litexpo,
                    Vilnius, Lithuania
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    MAKING IT NOW, group exhibition curated by Gregory Parsons,
                    Ruthin Craft Centre, Ruthin, Wales, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    PRESENT, group exhibition, Studio Fusion Gallery, Oxo Tower
                    Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    DAZZLE LONDON, group exhibition, Oxo Tower Wharf, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    MADE BY HAND CARDIFF, contemporary craft fair, Cardiff, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Sep
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    LUMINATES, group exhibition, Mint Shop, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Jul
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    NEW DESIGNERS, ONE YEAR ON, Business Design Centre, London,
                    UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Jun
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Mar
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    AMBER TRIP, Art Jewellery Competition show & jewellery show
                    Vilnius, Lithuania.
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Jan
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    NATURE MORTE: Contemporary artists reinvigorate the
                    Still-Life tradition, group exhibition, Wroclaw National
                    Museum. Wroclav, Poland.
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2016 Jan
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    THE EYE/HOME, group exhibition, Magan gallery, London, UK
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2015 Sep
                  </Typography>
                </Data>
                <Data>
                  <Typography variant="body2">
                    THE EYE, Contemporary Jewellery Symposium, Telsiai,
                    Lithuania
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>

          <WhereToFind>
            <Typography variant="subtitle1">
              WHERE TO FIND DOVILE JEWELLERY
            </Typography>
            <Typography variant="body2">
              <AnchorLink
                href="https://studiofusiongallery.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Studio Fusion Gallery
              </AnchorLink>
              , London
            </Typography>
            <Typography variant="body2">
              <AnchorLink
                href="https://www.artisan-alchemy.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Artisan Alchemy Gallery
              </AnchorLink>
              , Birmingham
            </Typography>
            <Typography variant="body2">
              <AnchorLink
                href="http://www.vda.lt/lt/galerija-argentum/apie-galerija"
                target="_blank"
                rel="noopener noreferrer"
              >
                Argentum Gallery
              </AnchorLink>
              , Vilnius
            </Typography>
            <Typography variant="body2">
              <AnchorLink
                href="https://www.facebook.com/theplaces17/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Place
              </AnchorLink>
              , Vilnius
            </Typography>
          </WhereToFind>
          <ShopOnline>
            <Typography variant="subtitle1">SHOP ONLINE</Typography>
            <Typography variant="body2">
              <AnchorLink
                href="https://miutto.com/collections/dovile-jewellery"
                target="_blank"
                rel="noopener noreferrer"
              >
                miutto
              </AnchorLink>
            </Typography>
          </ShopOnline>
        </div>
        {instagram && (
          <InstagramGallery
            data={instagram.data}
            imageSize={options.resolution}
          />
        )}
      </Layout>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  instagram: PropTypes.object
};

About.getInitialProps = async ({ pathname }) => {
  const instagram = await axios
    .get(instagramUrl)
    .then(res => res.data)
    .catch(err => console.log(err));
  return { pathname, instagram };
};

export default withStyles(styles)(About);
