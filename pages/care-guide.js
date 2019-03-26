import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';

import { Wrapper, Image, Figure, Caption, Text } from '../styles/CareGuide';

const style = {
  headline: {
    paddingTop: '20px'
  }
};

const CareGuide = props => (
  // false for Material UI Tabs to know this endpoint not needed
  <Layout pathname={false} collections={props.collections}>
    <Wrapper>
      <Figure>
        <Image src="../static/images/supa.jpg" alt="Crafts market" />
        <Caption>
          <Typography align="left" color="textSecondary">
            If you love jewellery as much as I do, jewellery needs your tender
            loving care.
          </Typography>
        </Caption>
      </Figure>
      <Text>
        <Typography
          align="left"
          color="secondary"
          variant="h5"
          gutterBottom
          style={style.headline}
        >
          WEARING
        </Typography>
        <Typography align="left" paragraph color="secondary">
          All sterling silver will tarnish over time, but it will happen much
          faster when it comes into contact with agents such as perfume, salty
          air, sulphur, skin creams, hairspray, chlorine and acidic skin ph. The
          amount of tarnishing (oxidation) that occurs is dependent on the skin
          and care habits of the wearer. Tarnishing is therefore not a
          manufacturing fault.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          I encourage customers to remove the jewellery prior to cleaning,
          bathing and swimming and ensure that the jewellery is not exposed to UV
          light, hairspray, perfume and cosmetics. I also recommend that you do
          not wear your jewellery whilst bathing, whilst in bed or during
          sporting activities.
        </Typography>
        <Typography
          align="left"
          color="secondary"
          variant="h5"
          gutterBottom
          style={style.headline}
        >
          CLEANING
        </Typography>
        <Typography align="left" paragraph color="secondary">
          In order to care for Dovile Jewellery, I recommend using a polishing
          cloth regularly to prevent the natural process of tarnishing.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Clean your jewellery using lukewarm soapy water and a soft brush.
          It is especially recommended for cleaning gemstones. I do not
          recommend the use of silver polish and silver dip as they may destroy
          the delicate oxidised details of your jewellery.
        </Typography>
        <Typography
          align="left"
          color="secondary"
          variant="h5"
          gutterBottom
          style={style.headline}
        >
          STORAGE
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Please store your jewellery safe in its original box or in a jewellery
          organiser. Make sure the chain is fastened to prevent tangling.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Keep dark oxidized items separate from other jewellery you have,
          because the black oxide can cause tarnish too.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

CareGuide.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string)
};

export default CareGuide;
