import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import axios from 'axios';

import { Wrapper, Image, Figure, Caption, Text } from '../styles/CareGuide';

const style = {
  headline: {
    paddingTop: '20px'
  }
};

class CareGuide extends React.Component {
  static async getInitialProps({ pathname, req }) {
    // credits http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
    if (req) {
      // If `req` is defined, we're rendering on the server and should use
      // MongoDB directly. One could also use the REST API, but that's slow
      // and inelegant.
      const { db } = req;
      // Note that `db` above comes from express middleware

      const data = await db
        .collection('works')
        .find()
        .toArray();

      const collections = data.reduce((acc, next) => {
        acc.push(next.group);
        return acc;
      }, []);

      return {
        data: JSON.stringify(data),
        pathname,
        from: 'server',
        collections
      };
    }
    // we are on a client and can access localStorage - no need for api call
    if (localStorage.getItem('data')) {
      return {
        data: localStorage.getItem('data'),
        collections: localStorage.getItem('collections').split(',')
      };
    }
    // Otherwise, we're rendering on the client with no localStorage and need to use the API
    const works = await axios.get('/api').then(res => {
      return res.data;
    });

    const collections = works.reduce((acc, next) => {
      acc.push(next.group);
      return acc;
    }, []);

    return {
      data: JSON.stringify(works),
      pathname,
      from: 'rest api',
      collections
    };
  }

  componentDidMount() {
    // there are no saved data or data was updated, update localStorage
    if (
      !localStorage.getItem('data') ||
      localStorage.getItem('data') !== this.props.data
    ) {
      localStorage.setItem('collections', this.props.collections);
      localStorage.setItem('data', this.props.data);
    }
  }

  render() {
    return (
      // false for Material UI Tabs to know this endpoint not needed
      <Layout pathname={false} collections={this.props.collections}>
        <Wrapper>
          <Figure>
            <Image src="../static/images/supa.jpg" alt="Crafts market" />
            <Caption>
              <Typography align="left" color="textSecondary">
                If you love jewellery as much as I do, jewellery needs your
                tender loving care.
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
              All sterling silver will tarnish over time, but it will happen
              much faster when it comes into contact with agents such as
              perfume, salty air, sulphur, skin creams, hairspray, chlorine and
              acidic skin ph. The amount of tarnishing (oxidation) that occurs
              is dependent on the skin and care habits of the wearer. Tarnishing
              is therefore not a manufacturing fault.
            </Typography>
            <Typography align="left" paragraph color="secondary">
              I encourage customers to remove the jewellery prior to cleaning,
              bathing and swimming and ensure that the jewellery is not exposed
              UV light, hairspray, perfume and cosmetics. I also recommend that
              you do not wear your jewellery whilst bathing, whilst in bed or
              during sporting activities.
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
              In order to care for Dovile Jewellery, I recommend using a
              polishing cloth regularly to prevent the natural process of
              tarnishing.
            </Typography>
            <Typography align="left" paragraph color="secondary">
              Clean your jewellery using lukewarm soapy water and a soft brush.
              Especially it is recommended for cleaning gemstones. I do not
              recommend the use of silver polish and silver dip as it may
              destroy the delicate oxidised details of your jewellery.
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
              Please store your jewellery safe in its original box or in a
              jewellery organiser. Make sure the chain is fastened to prevent
              tangling.
            </Typography>
            <Typography align="left" paragraph color="secondary">
              Keep dark oxidized items separate from other jewellery you have,
              because the black oxide can cause tarnish too.
            </Typography>
          </Text>
        </Wrapper>
      </Layout>
    );
  }
}

export default CareGuide;
