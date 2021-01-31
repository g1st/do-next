import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowRight } from '@material-ui/icons';

import { addToCart } from '../store/actions';
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
  MarginBottomWrapper,
  PathLineContainer,
  SelectionWrapper,
} from '../styles/Piece';
import { Mail, Strong, StyledAnchorLink } from '../styles/Shared';

import DialogForm from '../components/DialogForm/DialogForm';
import SizeInput from '../components/Piece/SizeInput';
import SilverFinishInput from '../components/Piece/SilverFinishInput';
import SizesInfo from '../components/Piece/SizesDialog';
import StripeCheckoutButton from '../components/Stripe/StripeCheckoutButton';
import { pluralise, deslugify, onImageError } from '../util/helpers';
import Error from './_error';

const styles = {
  price: {
    marginBottom: '2rem',
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    fontSize: '1.25rem',
    '@media (min-width: 960px)': {
      fontSize: '1.6rem',
    },
  },
  button: {
    padding: '10px',
    margin: '2rem auto',
    width: '100%',
  },
  filterLine: {
    color: '#595959',
    letterSpacing: '0.5px',
    lineHeight: '45px',
  },
  svg: {
    top: '.3em',
    position: 'relative',
    color: '#595959',
    margin: '0 0.2rem',
    '@media (min-width: 420px)': {
      margin: '0 0.8rem',
    },
  },
  boldLink: {
    fontWeight: 500,
  },
  mt: {
    marginTop: '1rem',
  },
  heading: {
    fontSize: '1.5rem',
    '@media (min-width: 600px)': {
      fontSize: '2rem',
    },
    '@media (min-width: 960px)': {
      fontSize: '2.75rem',
    },
  },
};

class Piece extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.arrayOf(PropTypes.string),
    onePieceData: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.string,
    addToCart: PropTypes.func,
    data: PropTypes.array,
  };

  state = {
    size: '',
    silverFinishStyle: '',
    error: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { size, silverFinishStyle } = this.state;
    if (size !== nextState.size) return false;
    if (silverFinishStyle !== nextState.silverFinishStyle) return false;
    return true;
  }

  checkInputs = (item) => {
    const { onePieceData } = this.props;
    const silverFinishRequired = onePieceData[0].silverFinish;
    const { size, silverFinishStyle } = this.state;

    if (item.madeToOrder && item.category === 'ring') {
      item.ringSize = size;
      if (size === '') {
        this.setState({ error: true });
        return true;
      }
    }

    if (silverFinishRequired) {
      item.silverFinishStyle = silverFinishStyle;
      if (silverFinishStyle === '') {
        this.setState({ error: true });
        return true;
      }
    }
  };

  handleAddToCart = (cartData) => {
    const { addToCart: addToCartRedux } = this.props;
    if (this.checkInputs(cartData)) {
      // there are not selected inputs
      return;
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
      silverFinish,
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
      silverFinishStyle,
    };

    const gallery = images.reduce((acc, image) => {
      const galleryFormatted = {
        original: `${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${image.medium}`,
        thumbnail: `${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${image.thumb}`,
        originalAlt: description,
        thumbnailAlt: name,
        srcSet: `${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${image.medium} 300w, ${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${image.big} 900w`,
        sizes: '82vw',
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
            <Typography display="inline" variant="body1">
              Edit
            </Typography>
          </AdminLink>
        </Link>
        <Link href="/admin">
          <AdminLink>
            <Typography display="inline" variant="body1">
              Add new
            </Typography>
          </AdminLink>
        </Link>
      </div>
    );

    const notAvailable = (
      <Typography variant="body1" paragraph>
        This item is <Strong>NOT AVAILABLE</Strong> for purchasing because of
        exhibiting at the various events or it’s already sold.
      </Typography>
    );

    const pathLine = (
      <PathLineContainer>
        <Link href="/gallery">
          <AnchorLink>
            <Typography
              display="inline"
              variant="body1"
              className={classes.filterLine}
            >
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
            <Typography
              display="inline"
              variant="body1"
              className={classes.filterLine}
            >
              {deslugify(collection)}
            </Typography>
          </AnchorLink>
        </Link>
        <ArrowRight fontSize="small" className={classes.svg} />
        <Typography
          display="inline"
          variant="body1"
          className={classes.filterLine}
        >
          {pluralise(category)}
        </Typography>
      </PathLineContainer>
    );

    return (
      <Layout
        pathname="/gallery"
        piecePath={`${process.env.NEXT_PUBLIC_APP_URL}/piece/${slug}`}
        collections={collections}
        title={`${name} | Dovile Ko`}
        description={`${description} | ${materials}`}
        user={user}
        image={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${images[0].big}`}
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
                <Typography key={i} variant="body1">
                  {paragraph}
                </Typography>
              ))}
              <ListInfo>
                {materials && (
                  <li>
                    <Typography variant="body1">
                      Materials: {materials}
                    </Typography>
                  </li>
                )}
                {size && (
                  <li>
                    <Typography variant="body1" display="inline">
                      Dimensions: {size}{' '}
                    </Typography>
                    {category === 'ring' && !madeToOrder ? (
                      <SizesInfo forDimensions />
                    ) : null}
                  </li>
                )}
                {weight && (
                  <li>
                    <Typography variant="body1">Weight: {weight}</Typography>
                  </li>
                )}
                {available && madeToOrder && (
                  <li>
                    <Typography variant="body1">
                      This is <Strong>made to order</Strong> item. PLEASE NOTE
                      that estimated producing time for this item is{' '}
                      {producingTime}.
                    </Typography>
                  </li>
                )}
              </ListInfo>
              <SelectionWrapper>
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
              </SelectionWrapper>
              <Typography
                display="inline"
                variant="body1"
                className={classes.boldLink}
              >
                Free worldwide shipping.{' '}
              </Typography>
              <Typography display="inline" variant="body1">
                Please note, for orders outside of the UK customs charges might
                apply.{' '}
              </Typography>
              <Typography variant="body1" paragraph className={classes.mt}>
                All purchases come in a branded box. All items being sold as
                gold or silver are hallmarked to confirm that they meet the
                legal standard in accordance with the British Assay Office.
              </Typography>
              <MarginBottomWrapper>
                <Typography display="inline" variant="body1" paragraph>
                  Please read{' '}
                </Typography>
                <Link href="/care-guide">
                  <StyledAnchorLink>
                    <Typography
                      display="inline"
                      variant="body1"
                      className={classes.boldLink}
                    >
                      jewellery care guide
                    </Typography>
                  </StyledAnchorLink>
                </Link>
                <Typography display="inline" variant="body1">
                  .
                </Typography>
              </MarginBottomWrapper>

              {available ? (
                <ButtonsWrapper>
                  <StripeCheckoutButton
                    items={[dataForCart]}
                    name="buy it now"
                    checkInputs={this.checkInputs}
                  />
                  <Button
                    size="large"
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
                <Typography variant="body1" paragraph>
                  Please note this is ONE OF A KIND piece, therefore,
                  commissions are welcome in related designs to meet your
                  personal needs.
                </Typography>
              ) : (
                ''
              )}
              <Typography variant="body1" paragraph>
                If interested in ordering customized design please contact me at{' '}
                <Mail
                  href="mailto:&#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;"
                  target="_top"
                >
                  &#104;&#101;&#108;&#108;&#111;&#064;&#100;&#111;&#118;&#105;&#108;&#101;&#106;&#101;&#119;&#101;&#108;&#108;&#101;&#114;&#121;&#046;&#099;&#111;&#109;
                </Mail>{' '}
                or by contact form below.
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
    let onePieceDataFromServer;

    if (slug) {
      const data = await db.collection('works').find().toArray();

      onePieceDataFromServer = data.filter((obj) => {
        if (obj.slug) {
          return (
            obj.slug.toLowerCase() === slug.toLowerCase() ||
            obj._id.toString() === slug
          );
        }
        return false;
      });
    } else {
      onePieceDataFromServer = [];
    }

    return { onePieceData: onePieceDataFromServer };
  }

  const onePieceDataFromAPI = await axios
    .get('/api/single', { params: { slug: query.slug } })
    .then((res) => res.data);

  return { onePieceData: [onePieceDataFromAPI] };
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Piece));
