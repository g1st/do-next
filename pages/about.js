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
  Education,
  ProffesionalPosition,
  UpcomingShows,
  LatestEvents,
  WhereToFind,
  Time
} from '../styles/About';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
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
            <Typography
              variant="body2"
              classes={{ subtitle1: classes.subtitle1 }}
            >
              Born 19/3/1989 in Dusetos, Lithuania
            </Typography>
          </AuthorNameText>
          <Education>
            <Typography
              variant="subtitle1"
              classes={{ subtitle1: classes.subtitle1 }}
            >
              EDUCATION
            </Typography>
          </Education>
          <table>
            <tr>
              <td>
                <Typography variant="body2">
                  <Time>2008-2012</Time>
                </Typography>
              </td>
              <td>
                <Typography variant="body2">
                  BA degree in jewellery and smithery, Vilnius Academy of Arts,
                  Lithuania
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body2">
                  <Time>2011</Time>
                </Typography>
              </td>
              <td>
                <Typography variant="body2">
                  Study exchange Escola Massana, Barcelona, Spain
                </Typography>
              </td>
            </tr>
          </table>
          <ProffesionalPosition>
            <Typography variant="subtitle1">PROFESSIONAL POSITION</Typography>
            <Typography variant="body2">
              2016-CURRENT, Jewellery tutor,{' '}
              <AnchorLink
                href="http://www.thequarterworkshop.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Quarterworkshop
              </AnchorLink>
              , Birmingham, UK
            </Typography>
            <Typography variant="body2">
              2013-2015, Jewellery tutor, Art Studio Ramios Bites, Vilnius,
              Lithuania
            </Typography>
          </ProffesionalPosition>
          <UpcomingShows>
            <Typography variant="subtitle1">UPCOMING SHOWS</Typography>
            <Typography variant="body2">
              3-27 August DAZZLE@DOVECOT, Edinburgh, UK
            </Typography>
          </UpcomingShows>
          <LatestEvents>
            <Typography variant="subtitle1">LATEST EVENTS</Typography>
            <Typography variant="body2">
              2018 Jun THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
            </Typography>
            <Typography variant="body2">
              2018 Mar AMBER TRIP, XV International Baltic Jewellery show,
              Litexpo, Vilnius, Lithuania
            </Typography>
            <Typography variant="body2">
              2017 Nov MAKING IT NOW, group exhibition curated by Gregory
              Parsons, Ruthin Craft Centre, Ruthin, Wales, UK
            </Typography>
            <Typography variant="body2">
              2017 Nov PRESENT, group exhibition, Studio Fusion Gallery, Oxo
              Tower Wharf, London, UK
            </Typography>
            <Typography variant="body2">
              2017 Nov DAZZLE LONDON, group exhibition, Oxo Tower Wharf, London,
              UK
            </Typography>
            <Typography variant="body2">
              2017 Nov MADE BY HAND CARDIFF, contemporary craft fair, Cardiff,
              UK
            </Typography>
            <Typography variant="body2">
              2017 Sep LUMINATES, group exhibition, Mint Shop, London, UK
            </Typography>
            <Typography variant="body2">
              2017 Jul NEW DESIGNERS, ONE YEAR ON, Business Design Centre,
              London, UK
            </Typography>
            <Typography variant="body2">
              2017 Jun THE CONTEMPORARY CRAFT FESTIVAL, Bovey Tracey, Devon, UK
            </Typography>
            <Typography variant="body2">
              2017 Mar AMBER TRIP, Art Jewellery Competition show & jewellery
              show Vilnius, Lithuania.
            </Typography>
            <Typography variant="body2">
              2017 Jan NATURE MORTE: Contemporary artists reinvigorate the
              Still-Life tradition, group exhibition, Wroclaw National Museum.
              Wroclav, Poland.
            </Typography>
            <Typography variant="body2">
              2016 Jan THE EYE/HOME, group exhibition, Magan gallery, London, UK
            </Typography>
            <Typography variant="body2">
              2015 Sep THE EYE, Contemporary Jewellery Symposium, Telsiai,
              Lithuania
            </Typography>
          </LatestEvents>
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
