import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  Figure,
  Text,
  List,
  ListItem,
} from '../styles/CareGuide';
import { ImageWrapper } from '../styles/TermsAndConditions';
import Necklaces from '../public/images/f-5.JPG';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    margin: '4rem 0 2rem 0',
  },
});

const CareGuide = ({ collections, classes, user }) => (
  // false for Material UI Tabs to know this endpoint not needed
  <Layout
    pathname={false}
    collections={collections}
    title="Care Guide | Dovile Ko"
    user={user}
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src={Necklaces} alt="Crafts market" />
        </Figure>
      </ImageWrapper>
      <Text>
        <Typography
          align="left"
          color="secondary"
          variant="h2"
          paragraph
          className={classes.heading}
        >
          GENERAL JEWELLERY CARE GUIDE
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Store your jewellery separately, so the pieces don’t rub and
              scratch against each other. It is especially important for
              oxidized silver, gold-plated metals to keep them all separated.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Damp and hot conditions will cause jewellery to tarnish so do not
              store jewellery next to heating vents, windowsills or in the
              bathroom.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Perfumes, lotions, creams and hair products can react with the
              jewellery, causing silver to tarnish and gold to erode. Apply any
              scents or cosmetics before you put on your jewellery.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Remove jewellery when exercising, cleaning, gardening or carrying
              out any other rough or physical work.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Try not to wear your jewellery overnight.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Hot weather, bright sunlight and perspiration can speed up the
              tarnishing process and damage gemstones. Jewellery should always
              be taken off before the pool, shower or sea.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              A Silver 'Dip' treatment is a great way to clean silver jewellery,
              but always make sure the jewellery is rinsed thoroughly with water
              afterwards and the instructions for the product are strictly
              followed.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Gold-plated jewellery can be cleaned with warm soapy water. Then
              rinse thoroughly and dry well with a soft cloth.
            </Typography>
          </ListItem>
        </List>
        <Typography
          align="left"
          color="secondary"
          variant="h2"
          paragraph
          className={classes.heading}
        >
          WOOD AND AMBER JEWELLERY CARE
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Never leave amber jewellery under direct sunlight. It could cause
              a colour change from yellow to orange.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Wood and amber jewellery is water resistant but should not be
              immersed in water or kept in high humidity; if it does get wet
              however, immediately blot dry.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              To keep the wood smooth and to help maintain its dark colour, rub
              it with oil such as linseed, olive or even baby oil with a soft
              cloth.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              All Dovile's jewellery is made from solid, natural hardwood; do
              not try to force or bend it and be careful not to drop it.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Always make sure earrings and brooches with amber are locked
              correctly while wearing it.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Pay attention when handling these designs because amber could be
              brittle. Although it is presented as a gemstone that does not mean
              it is hard as a stone.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Please note, that amber rings are not suitable for everyday wear.
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" paragraph color="secondary">
          Amber is authentic and organic gem material. It is still breathing and
          interacting with the environment. Amber colour may change over time,
          this is expected and contributes to the unique, intensely individual
          nature of Baltic Amber. Each piece of amber ages differently because
          of its combination of plant materials and fossil inclusions.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

CareGuide.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

export default withStyles(styles)(CareGuide);
