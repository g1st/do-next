import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import { Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import slides from '../util/getSlideNumber';
import Card from './Gallery/Card';

const styles = {
  heading: {
    fontSize: '1rem',
    padding: '4rem 0',
    '@media (min-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (min-width: 960px)': {
      fontSize: '2rem',
    },
  },
};

const Container = styled.div`
  background: rgba(0, 0, 0, 0.03);
  margin-top: 4rem;

  @media screen and (min-width: 960px) {
    margin-bottom: 2rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
`;

const Featured = ({ data, classes }) => {
  const windowData = slides();

  const [visibleSlides, setVisibleSlides] = useState(1);
  useEffect(() => {
    setVisibleSlides(windowData.visibleSlides);
  }, [windowData]);

  return (
    data &&
    data.length > 0 && (
      <Container>
        <Typography
          variant="h3"
          align="center"
          color="secondary"
          className={classes.heading}
        >
          Reclaimed dark hardwood and natural Baltic amber jewellery | FLOW
          COLLECTION
        </Typography>
        <CarouselProvider
          totalSlides={data.length}
          visibleSlides={visibleSlides}
          isIntrinsicHeight
          infinite
        >
          <SliderContainer>
            <Slider>
              {data.map((item, key) => (
                <Slide
                  key={item._id}
                  index={key}
                  className="slide"
                  tabIndex={-1}
                >
                  <Card item={item} />
                </Slide>
              ))}
            </Slider>
            <ButtonBack className={`${'buttonBack nav-button'}`}>
              <ChevronLeft />
            </ButtonBack>
            <ButtonNext className={`${'buttonNext nav-button'}`}>
              <ChevronRight />
            </ButtonNext>
          </SliderContainer>
        </CarouselProvider>
      </Container>
    )
  );
};

Featured.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Featured);
