import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import Layout from '../components/Layout';
import {
  AnchorLink,
  AuthorNameText,
  WhereToFind,
  ShopOnline,
  Table,
  Row
} from '../styles/About';

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
  }
});

class About extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout
        pathname={this.props.pathname}
        collections={this.props.collections}
      >
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
                <td>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2008-2012
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    BA degree in jewellery and smithery, Vilnius Academy of
                    Arts, Lithuania
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2011
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    Study exchange Escola Massana, Barcelona, Spain
                  </Typography>
                </td>
              </Row>
            </tbody>
          </Table>
          <Typography variant="subtitle1">PROFESSIONAL POSITION</Typography>
          <Table>
            <tbody>
              <Row>
                <td>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2016-current
                  </Typography>
                </td>
                <td>
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
                </td>
              </Row>
              <Row>
                <td>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2013-2015
                  </Typography>
                </td>
                <td>
                  {' '}
                  <Typography variant="body2">
                    Jewellery tutor, Art Studio Ramios Bites, Vilnius, Lithuania
                  </Typography>
                </td>
              </Row>
            </tbody>
          </Table>

          <Typography variant="subtitle1">UPCOMING SHOWS</Typography>
          <Table>
            <tbody>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    3-27 Aug
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    DAZZLE@DOVECOT, Edinburgh, UK
                  </Typography>
                </td>
              </Row>
            </tbody>
          </Table>

          <Typography variant="subtitle1">LATEST EVENTS</Typography>

          <Table>
            <tbody>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2018 Jun
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2018 Mar
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    AMBER TRIP, XV International Baltic Jewellery show, Litexpo,
                    Vilnius, Lithuania
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    MAKING IT NOW, group exhibition curated by Gregory Parsons,
                    Ruthin Craft Centre, Ruthin, Wales, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    PRESENT, group exhibition, Studio Fusion Gallery, Oxo Tower
                    Wharf, London, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    DAZZLE LONDON, group exhibition, Oxo Tower Wharf, London, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Nov
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    MADE BY HAND CARDIFF, contemporary craft fair, Cardiff, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Sep
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    LUMINATES, group exhibition, Mint Shop, London, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Jul
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    NEW DESIGNERS, ONE YEAR ON, Business Design Centre, London,
                    UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Jun
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Mar
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    AMBER TRIP, Art Jewellery Competition show & jewellery show
                    Vilnius, Lithuania.
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2017 Jan
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    NATURE MORTE: Contemporary artists reinvigorate the
                    Still-Life tradition, group exhibition, Wroclaw National
                    Museum. Wroclav, Poland.
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2016 Jan
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    THE EYE/HOME, group exhibition, Magan gallery, London, UK
                  </Typography>
                </td>
              </Row>
              <Row>
                <td>
                  {' '}
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    2015 Sep
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    THE EYE, Contemporary Jewellery Symposium, Telsiai,
                    Lithuania
                  </Typography>
                </td>
              </Row>
            </tbody>
          </Table>

          <WhereToFind>
            <Typography variant="subtitle1">
              WHERE TO FIND DOVILE JEWELLERY ​
            </Typography>
            <Typography variant="body2">
              <AnchorLink href="https://studiofusiongallery.co.uk/">
                STUDIO FUSION GALLERY
              </AnchorLink>
              , London
            </Typography>
            <Typography variant="body2">
              <AnchorLink href="https://www.artisan-alchemy.co.uk/">
                ARTISAN ALCHEMY GALLERY
              </AnchorLink>
              , Birmingham
            </Typography>
            <Typography variant="body2">
              <AnchorLink href="http://www.vda.lt/lt/galerija-argentum/apie-galerija">
                ARGENTUM GALLERY
              </AnchorLink>
              , Vilnius
            </Typography>
            <Typography variant="body2">
              <AnchorLink href="https://www.facebook.com/theplaces17/">
                THE PLACE
              </AnchorLink>
              , Vilnius
            </Typography>
          </WhereToFind>
          <ShopOnline>
            <Typography variant="subtitle1">SHOP ONLINE</Typography>
            <Typography variant="body2">
              <AnchorLink href="https://miutto.com/collections/dovile-jewellery">
                miutto
              </AnchorLink>
            </Typography>
          </ShopOnline>
        </div>
      </Layout>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

About.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

export default withStyles(styles)(About);
