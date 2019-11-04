import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Typography,
  ListItem,
  ListItemText,
  Input,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';

import Error from '../Error/Error';
import { appUrl } from '../../config';
import { addDiscount } from '../../store/actions';

const styles = {
  textRight: {
    textAlign: 'right',
    padding: 0
  },
  button: {
    all: 'unset',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  inputRoot: {
    fontSize: '14px',
    maxWidth: '120px',
    background: '#fff',
    padding: '0 4px',
    borderRadius: '3px 0 0 3px',
    height: '30px'
  },
  root: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  wrapper: {
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: '#9E9E9E',
    '&:hover': {
      backgroundColor: '#212121'
    }
  },
  buttonProgress: {
    color: '#4CAF50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  newsletter: {
    textShadow: '2px 2px #333',
    alignItems: 'center',
    marginBottom: '10px',
    letterSpacing: '2px'
  },
  discover: {
    textShadow: '1px 1px #333',
    alignItems: 'center',
    marginBottom: '20px'
  },
  checkIcon: {
    color: '#4CAF50'
  }
};

const PromoCode = ({ classes }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [code, setCode] = useState('');
  const [submit, setSubmit] = useState('');
  const [promoCodeApplied, setPromoCodeApplied] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const firstLoad = useRef();
  const discount = useSelector(state => state.promo.discount);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect hook');
    console.log('firstLoad', firstLoad);
    const checkPromoCode = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const result = await axios(`${appUrl}/api/promo`, {
          params: { code: submit }
        });

        const { validCode } = result.data;
        console.log(validCode);
        setIsLoading(false);
        setPromoCodeApplied(validCode);
        if (validCode) {
          console.log('dispatchina');
          dispatch(addDiscount(submit));
        } else {
          setError(true);
        }
      } catch (err) {
        setError(err);
      }
      // console.log('data = ', data);
    };
    // don't run on initial render
    if (firstLoad.current) {
      checkPromoCode();
    }
  }, [dispatch, firstLoad, submit]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(code);
    console.log('submit');
  };

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter' || key === ' ') {
      setInputVisible(!inputVisible);
    }
  };

  return (
    <ListItem>
      <ListItemText className={classes.textRight}>
        {discount ? (
          <Typography variant="body2">-{discount}% off applied</Typography>
        ) : (
          <>
            {!inputVisible && (
              <button type="button" className={classes.button}>
                <Typography
                  variant="body2"
                  onClick={() => setInputVisible(!inputVisible)}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  role="button"
                >
                  Got promo code?
                </Typography>
              </button>
            )}
            {inputVisible &&
              (promoCodeApplied ? null : (
                <form onSubmit={handleSubmit}>
                  <IconButton
                    style={{
                      color: 'rgba(0, 0, 0, 0.26)',
                      marginLeft: '4px'
                    }}
                    aria-label="Toggle promo code input"
                    onClick={() => {
                      setInputVisible(!inputVisible);
                      setCode('');
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                  <Input
                    ref={firstLoad}
                    value={code}
                    id="promocode"
                    inputProps={{
                      'aria-label': 'Promotional code',
                      required: true
                    }}
                    type="text"
                    disableUnderline
                    className={classes.inputRoot}
                    onChange={e => setCode(e.target.value)}
                    error={error}
                    placeholder="Promo code"
                    disabled={isLoading}
                  />
                  <div className={classes.root}>
                    <div className="wrapper">
                      {promoCodeApplied ? (
                        <CheckIcon classes={{ root: classes.checkIcon }} />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="small"
                          className={
                            promoCodeApplied ? classes.buttonSuccess : ''
                          }
                          disabled={isLoading}
                        >
                          Apply
                          {isLoading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {error && <Error>Wrong code</Error>}
                </form>
              ))}
          </>
        )}
      </ListItemText>
    </ListItem>
  );
};

PromoCode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PromoCode);
