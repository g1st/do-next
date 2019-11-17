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
  buttonProgress: {
    color: '#4CAF50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  inputWrapper: {
    display: 'inline-block',
    position: 'relative'
  },
  errorWrapper: {
    position: 'absolute',
    top: '1.5em'
  },
  iconButton: {
    color: 'rgba(0, 0, 0, 0.26)',
    marginLeft: '4px'
  }
};

const PromoCode = ({ classes }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [code, setCode] = useState('');
  const [submit, setSubmit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Wrong code');
  const firstLoad = useRef();
  const discount = useSelector(state => state.promo.discount);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPromoCode = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const result = await axios(`${appUrl}/api/promo`, {
          params: { code: submit }
        });
        const { validCode } = result.data;

        setIsLoading(false);
        if (validCode) {
          dispatch(addDiscount(submit));
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
        setErrorMessage(err.message || 'Error occurred');
        setIsLoading(false);
      }
    };
    // don't run on first load
    if (firstLoad.current) {
      checkPromoCode();
    }
  }, [dispatch, submit]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(code);
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
          <Typography variant="body2" inline>
            -{discount}% off applied
          </Typography>
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
                  Have coupon?
                </Typography>
              </button>
            )}
            {inputVisible && (
              <form onSubmit={handleSubmit}>
                <IconButton
                  className={classes.IconButton}
                  aria-label="Toggle promo code input"
                  onClick={() => {
                    setInputVisible(!inputVisible);
                    setCode('');
                    setError(false);
                    setIsLoading(false);
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
                <div className={classes.inputWrapper}>
                  <Input
                    ref={firstLoad}
                    value={code}
                    id="promocode"
                    inputProps={{
                      'aria-label': 'Coupon code',
                      required: true
                    }}
                    type="text"
                    disableUnderline
                    className={classes.inputRoot}
                    onChange={e => setCode(e.target.value)}
                    error={!!error}
                    placeholder="Coupon code"
                    disabled={isLoading}
                  />
                  <div className={classes.errorWrapper}>
                    {error && <Error>{errorMessage}</Error>}
                  </div>
                </div>
                <div className={classes.root}>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="small"
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
                  </div>
                </div>
              </form>
            )}
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
