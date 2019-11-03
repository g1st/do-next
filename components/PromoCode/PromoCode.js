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
  const [input, setInput] = useState(false);
  const [code, setCode] = useState('');
  const [submit, setSubmit] = useState('');
  const [data, setData] = useState('');
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
        setData(validCode);
        if (validCode) {
          console.log('dispatchina');
          dispatch(addDiscount(submit));
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
  }, [dispatch, firstLoad, setData, submit]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(code);
    console.log('submit');
  };

  return (
    <ListItem>
      <ListItemText className={classes.textRight}>
        {!input && (
          <button type="button" className={classes.button}>
            <Typography variant="body2" onClick={() => setInput(!input)}>
              Got promo code?
            </Typography>
          </button>
        )}
        {input &&
          (data ? (
            <div>promo successfully applied</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <IconButton
                style={{ color: 'rgba(0, 0, 0, 0.26)', marginLeft: '4px' }}
                aria-label="Toggle promo code input"
                onClick={() => {
                  setInput(!input);
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
                  {data ? (
                    <CheckIcon classes={{ root: classes.checkIcon }} />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="small"
                      className={data ? classes.buttonSuccess : ''}
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
            </form>
          ))}
        <div>discount: {discount}</div>
      </ListItemText>
    </ListItem>
  );
};

PromoCode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PromoCode);
