import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import { Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import slides from '../util/getSlideNumber';
import Card from './Gallery/Card';

const styles = {
  heading: {
    fontSize: '2rem',
    padding: '4rem 0'
  }
};

const Container = styled.div`
  background: #fafafa;
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
    data.length && (
      <Container>
        <Typography
          variant="h3"
          align="center"
          color="secondary"
          className={classes.heading}
        >
          FEATURED
        </Typography>
        <CarouselProvider
          totalSlides={data.length}
          visibleSlides={visibleSlides}
          isIntrinsicHeight
          infinite
        >
          <SliderContainer>
            <Slider className="slider">
              {data.map(item => (
                <Slide key={item._id} index={0} className="slide">
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Featured);
