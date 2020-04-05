import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import axios from 'axios';
import { connect } from 'react-redux';
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowRight } from '@material-ui/icons';

import { awsBucket, appUrl } from '../config';
import { addToCart, buyItNow } from '../store/actions';
import Layout from '../components/Layout.js';
import PieceGallery from '../components/Gallery/PieceGallery';
import {
  Wrapper,
  Images,
  Info,
  ButtonsWrapper,
  Text,
  AnchorLink,
  ListInfo,
  AdminLink,
  SizesWrapper,
  SilverFinishWrapper,
  MarginBottomWrapper
} from '../styles/Piece';
import {
  WidthContainer,
  Mail,
  Strong,
  StyledAnchorLink
} from '../styles/Shared';

import DialogForm from '../components/DialogForm/DialogForm';
import SizeInput from '../components/Piece/SizeInput';
import SilverFinishInput from '../components/Piece/SilverFinishInput';
import SizesInfo from '../components/Piece/SizesDialog';
import { pluralise, deslugify, onImageError } from '../util/helpers';
import Error from './_error';

import * as gtag from '../lib/gtag';

const styles = {
  price: {
    marginBottom: '2rem',
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    fontSize: '1.6rem'
  },
  button: {
    padding: '10px',
    margin: '0 auto 20px auto',
    width: '100%'
  },
  filterLine: {
    color: '#595959',
    letterSpacing: '1px',
    lineHeight: '43px'
  },
  svg: {
    top: '.3em',
    position: 'relative',
    color: '#595959',
    margin: '0 12px'
  },
  boldLink: {
    fontWeight: 500
  },
  heading: {
    fontSize: '2.75rem'
  }
};

class Piece extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.arrayOf(PropTypes.string),
    onePieceData: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.string,
    buyItNow: PropTypes.func,
    addToCart: PropTypes.func,
    data: PropTypes.array
  };

  state = {
    size: '',
    silverFinishStyle: '',
    error: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { size, silverFinishStyle } = this.state;
    if (size !== nextState.size) return false;
    if (silverFinishStyle !== nextState.silverFinishStyle) return false;
    return true;
  }

  handleBuyItNow = item => {
    const { buyItNow: buyItNowRedux, onePieceData } = this.props;
    const silverFinishRequired = onePieceData[0].silverFinish;
    const { size, silverFinishStyle } = this.state;
    gtag.event({
      action: 'click_buyitnow',
      category: 'Purchase',
      label: 'BuyItNow'
    });

    if (item.madeToOrder && item.category === 'ring') {
      item.ringSize = size;
      if (size === '') {
        return this.setState({ error: true });
      }
    }

    if (silverFinishRequired) {
      item.silverFinishStyle = silverFinishStyle;
      if (silverFinishStyle === '') {
        return this.setState({ error: true });
      }
    }

    buyItNowRedux(item);
    Router.push('/checkout');
  };

  handleAddToCart = cartData => {
    const { addToCart: addToCartRedux, onePieceData } = this.props;
    const silverFinishRequired = onePieceData[0].silverFinish;

    const { size, silverFinishStyle } = this.state;

    gtag.event({
      action: 'click_addToCart',
      category: 'Purchase',
      label: 'AddToCart'
    });

    if (cartData.madeToOrder && cartData.category === 'ring') {
      cartData.ringSize = size;
      if (size === '') {
        return this.setState({ error: true });
      }
    }

    if (silverFinishRequired) {
      cartData.silverFinishStyle = silverFinishStyle;
      if (silverFinishStyle === '') {
        return this.setState({ error: true });
      }
    }

    addToCartRedux(cartData);
  };

  handleSizeChange = ({ target: { value } }) => {
    this.setState({ size: value, error: false });
  };

  handleSilverFinishChange = ({ target: { value } }) => {
    this.setState({ silverFinishStyle: value, error: false });
  };

  render() {
    const { onePieceData, classes, user, collections, data } = this.props;
    const { error, size: ringSize, silverFinishStyle } = this.state;

    if (onePieceData.length < 1 || onePieceData[0] === null) {
      return (
        <Error pathname="/gallery" statusCode={404} collections={collections} />
      );
    }

    const {
      name,
      slug,
      description,
      materials,
      price,
      size,
      weight,
      _id,
      images,
      available,
      group: collection,
      category,
      frontImage,
      madeToOrder,
      producingTime,
      oneOfAKind,
      silverFinish
    } = onePieceData[0];

    const dataForCart = {
      name,
      slug,
      price,
      images,
      _id,
      available,
      quantity: 1,
      madeToOrder,
      category,
      ringSize,
      silverFinishStyle
    };

    const gallery = images.reduce((acc, image) => {
      const galleryFormatted = {
        original: `${awsBucket}/${image.medium}`,
        thumbnail: `${awsBucket}/${image.thumb}`,
        originalAlt: description,
        thumbnailAlt: name,
        srcSet: `${awsBucket}/${image.medium} 300w, ${awsBucket}/${image.big} 900w`,
        sizes: '(max-width: 800px) 80vw, (max-width: 960px) 65vw, 45vw'
      };
      if (image.medium === frontImage) {
        // add in front of array to be first in gallery
        acc.unshift(galleryFormatted);
      } else {
        acc.push(galleryFormatted);
      }
      return acc;
    }, []);

    const edit = (
      <div>
        <Link href={`/edit?slug=${slug}`} as={`/edit/${slug}`}>
          <AdminLink>
            <Typography inline variant="body1">
              Edit
            </Typography>
          </AdminLink>
        </Link>
        <Link href="/admin">
          <AdminLink>
            <Typography inline variant="body1">
              Add new
            </Typography>
          </AdminLink>
        </Link>
      </div>
    );

    const notAvailable = (
      <Typography variant="body2" paragraph>
        This item is <Strong>NOT AVAILABLE</Strong> for purchasing because of
        exhibiting at the various events or it’s already sold.
      </Typography>
    );

    const pathLine = (
      <WidthContainer>
        <Link href="/gallery">
          <AnchorLink>
            <Typography inline variant="body2" className={classes.filterLine}>
              gallery
            </Typography>
          </AnchorLink>
        </Link>
        <ArrowRight fontSize="small" className={classes.svg} />
        <Link
          href={`/gallery?collection=${collection}`}
          as={`/gallery/${collection}`}
        >
          <AnchorLink>
            <Typography inline variant="body2" className={classes.filterLine}>
              {deslugify(collection)}
            </Typography>
          </AnchorLink>
        </Link>
        <ArrowRight fontSize="small" className={classes.svg} />
        <Typography inline variant="body2" className={classes.filterLine}>
          {pluralise(category)}
        </Typography>
      </WidthContainer>
    );

    return (
      <Layout
        pathname="/gallery"
        piecePath={`${appUrl}/piece/${slug}`}
        collections={collections}
        title={`${name} | Dovile Jewellery`}
        description={`${description} | ${materials}`}
        user={user}
        image={`${awsBucket}/${images[0].big}`}
      >
        {pathLine}
        <Wrapper>
          <Images>
            <ImageGallery
              items={gallery}
              lazyLoad
              showNav
              showPlayButton={false}
              showFullscreenButton
              onThumbnailError={onImageError}
              onImageError={onImageError}
            />
          </Images>
          <Info>
            <Text>
              {user && edit}
              <Typography variant="h2" className={classes.heading}>
                {name}
              </Typography>
              <Typography variant="body1" classes={{ body1: classes.price }}>
                £{price}
              </Typography>
              {description.split('\n').map((paragraph, i) => (
                <Typography key={i} variant="body2">
                  {paragraph}
                </Typography>
              ))}
              <ListInfo>
                {materials && (
                  <li>
                    <Typography variant="body2">
                      Materials: {materials}
                    </Typography>
                  </li>
                )}
                {size && (
                  <li>
                    <Typography inline variant="body2">
                      Dimensions: {size}{' '}
                    </Typography>
                    {category === 'ring' && !madeToOrder ? (
                      <SizesInfo forDimensions />
                    ) : null}
                  </li>
                )}
                {weight && (
                  <li>
                    <Typography variant="body2">Weight: {weight}</Typography>
                  </li>
                )}
                {available && madeToOrder && (
                  <li>
                    <Typography variant="body2">
                      This is <Strong>made to order</Strong> item. PLEASE NOTE
                      that estimated producing time for this item is{' '}
                      {producingTime}.
                    </Typography>
                  </li>
                )}
              </ListInfo>
              {available && silverFinish && (
                <SilverFinishWrapper>
                  <SilverFinishInput
                    handleChange={this.handleSilverFinishChange}
                    error={error}
                    errorText="Please choose silver finish style."
                  />
                </SilverFinishWrapper>
              )}
              {available && category === 'ring' && madeToOrder && (
                <SizesWrapper>
                  <SizeInput
                    handleChange={this.handleSizeChange}
                    error={error}
                    errorText="Please select ring size."
                  />
                  <SizesInfo />
                </SizesWrapper>
              )}
              <Typography variant="body2" paragraph>
                All purchases come in a branded box.
              </Typography>
              <Typography variant="body2" paragraph>
                All items being sold as gold or silver are hallmarked to confirm
                that they meet the legal standard in accordance with the British
                Assay Office.
              </Typography>
              <MarginBottomWrapper>
                <Typography inline variant="body2" paragraph>
                  Please read{' '}
                </Typography>
                <Link href="/care-guide">
                  <StyledAnchorLink>
                    <Typography
                      inline
                      variant="body2"
                      className={classes.boldLink}
                    >
                      jewellery care guide
                    </Typography>
                  </StyledAnchorLink>
                </Link>
                <Typography inline variant="body2">
                  .
                </Typography>
              </MarginBottomWrapper>

              {available ? (
                <ButtonsWrapper>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.handleBuyItNow(dataForCart)}
                  >
                    Buy It Now
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleAddToCart(dataForCart)}
                    className={classes.button}
                  >
                    Add To Cart
                  </Button>
                </ButtonsWrapper>
              ) : (
                notAvailable
              )}
              {oneOfAKind ? (
                <Typography variant="body2" paragraph>
                  Please note this is ONE OF A KIND piece, therefore,
                  commissions are welcome in related designs to meet your
                  personal needs.
                </Typography>
              ) : (
                ''
              )}
              <Typography variant="body2" paragraph>
                If interested in ordering customized design please contact me
                directly to{' '}
                <Mail
                  href="mailto:&#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;"
                  target="_top"
                >
                  &#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;
                </Mail>{' '}
                or open contact form below.
              </Typography>
              <DialogForm />
            </Text>
          </Info>
        </Wrapper>
        <PieceGallery data={data} currentItem={onePieceData[0]} />
      </Layout>
    );
  }
}

Piece.getInitialProps = async ({ req, query }) => {
  if (req) {
    const { db } = req;
    const { slug } = req.params;

    const data = await db
      .collection('works')
      .find()
      .toArray();

    const onePieceDataFromServer = data.filter(
      obj =>
        obj.slug.toLowerCase() === slug.toLowerCase() ||
        obj._id.toString() === slug
    );

    return { onePieceData: onePieceDataFromServer };
  }

  const onePieceDataFromAPI = await axios
    .get('/api/single', { params: { slug: query.slug } })
    .then(res => res.data);

  return { onePieceData: [onePieceDataFromAPI] };
};

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item)),
  buyItNow: item => dispatch(buyItNow(item))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Piece));
