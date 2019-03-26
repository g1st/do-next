import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import { Wrapper, Image, Text, Figure } from '../styles/TermsAndConditions';

const TermsAndConditions = props => (
  // For Material UI Tabs to know this endpoint not needed
  <Layout pathname={false} collections={props.collections}>
    <Wrapper>
      <Figure>
        <Image
          src="../static/images/send.jpg"
          alt="Jewellery packaging boxes"
        />
      </Figure>
      <Text>
        <Typography
          align="left"
          color="secondary"
          variant="h5"
          gutterBottom
          style={{
            paddingTop: '20px'
          }}
        >
          SHIPPING
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Packages will be mailed by Royal Mail within 3 business days of
          purchase and payment. Any duties, brokerage fees or customs charges
          are the responsibility of the buyer.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Delivery times will vary but usually, it is 1-2 days for UK, 3-5 days
          for Europe and 5-10 days for US and Canada. I always obtain proof of
          postage but if you would like to upgrade postage or make any changes
          to how your item is shipped please contact me and I will be happy to
          supply pricing for alternative methods.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          If you are an international customer, please note that you are
          responsible for any duties and customs charges that may be incurred.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Please be sure you have entered the correct shipping address at
          checkout. If your purchase is a gift, please make a note of that.
        </Typography>
        <Typography
          align="left"
          color="secondary"
          variant="h5"
          gutterBottom
          style={{
            paddingTop: '20px'
          }}
        >
          REFUND
        </Typography>
        <Typography align="left" paragraph color="secondary">
          All of my jewellery is handmade and OOAK so I hope that you're
          completely happy with your item when it arrives. If you are unhappy
          with it for any reason, please just let me know first to resolve the
          issue.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          I accept returns provided the request is made within 14 days after
          receiving the item. Refund will be made once I receive the item unused
          to its original condition and in its original packaging. If you do not
          have the original packaging, the item(s) should be packaged carefully to
          ensure safe arrival as it was shipped to you. I will refund the total
          amount of purchase.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Return shipping costs are the responsibility of the buyer.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Custom made items cannot be returned & refunded.
        </Typography>
        <Typography align="left" paragraph color="secondary">
          Items cannot be refunded in the event of exceeding the 14 days return
          policy.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

TermsAndConditions.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string)
};

TermsAndConditions.getInitialProps = async ({ pathname }) => ({ pathname });

export default TermsAndConditions;
