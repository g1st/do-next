import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, InputLabel, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Error from '../Error/Error';

const styles = {
  labelRoot: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  formControl: {
    minWidth: '13rem',
    marginTop: '1rem',
  },
};

const SelectSize = ({ error, errorText, handleChange, classes }) => {
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(true);

  const changeSize = (e) => {
    const ringSize = e.target.value;
    setSize(ringSize);
    if (ringSize) {
      setSizeError(false);
    } else {
      setSizeError(true);
    }
    handleChange(e);
  };

  return (
    <FormControl
      error={error && sizeError}
      classes={{ root: classes.formControl }}
      color="secondary"
    >
      <InputLabel htmlFor="size-native" classes={{ root: classes.labelRoot }}>
        Size
      </InputLabel>
      <Select
        native
        value={size}
        onChange={changeSize}
        inputProps={{
          name: 'size',
          id: 'size-native',
        }}
      >
        <option value="" aria-label="default blank" />
        <option value="13.3 | D">13.3 | D</option>
        <option value="13.5 | D 1/2">13.5 | D 1/2</option>
        <option value="13.7 | E">13.7 | E </option>
        <option value="13.9 | E 1/2">13.9 | E 1/2</option>
        <option value="14.1 | F">14.1 | F </option>
        <option value="14.3 | F 1/2">14.3 | F 1/2</option>
        <option value="14.5 | G">14.5 | G</option>
        <option value="14.7 | G 1/2">14.7 | G 1/2</option>
        <option value="14.9 | H">14.9 | H</option>
        <option value="15.1 | H 1/2">15.1 | H 1/2</option>
        <option value="15.3 | I">15.3 | I</option>
        <option value="15.5 | I 1/2">15.5 | I 1/2</option>
        <option value="15.7 | J">15.7 | J</option>
        <option value="15.9 | J 1/2">15.9 | J 1/2</option>
        <option value="16.1 | K">16.1 | K</option>
        <option value="16.3 | K 1/2">16.3 | K 1/2</option>
        <option value="16.5 | L">16.5 | L</option>
        <option value="16.7 | L 1/2">16.7 | L 1/2</option>
        <option value="16.9 | M">16.9 | M</option>
        <option value="17.1 | M 1/2">17.1 | M 1/2</option>
        <option value="17.3 | N">17.3 | N</option>
        <option value="17.5 | N 1/2">17.5 | N 1/2</option>
        <option value="17.7 | O">17.7 | O</option>
        <option value="17.9 | O 1/2">17.9 | O 1/2</option>
        <option value="18.1 | P">18.1 | P</option>
        <option value="18.3 | P 1/2">18.3 | P 1/2</option>
        <option value="18.5 | Q">18.5 | Q</option>
        <option value="18.7 | Q 1/2">18.7 | Q 1/2</option>
        <option value="18.9 | R">18.9 | R</option>
        <option value="19.1 | R 1/2">19.1 | R 1/2</option>
        <option value="19.3 | S">19.3 | S</option>
        <option value="19.5 | S 1/2">19.5 | S 1/2</option>
        <option value="19.7 | T">19.7 | T</option>
        <option value="19.9 | T 1/2">19.9 | T 1/2</option>
        <option value="20.1 | U">20.1 | U</option>
        <option value="20.3 | U 1/2">20.3 | U 1/2</option>
        <option value="20.5 | V">20.5 | V</option>
        <option value="20.7 | V 1/2">20.7 | V 1/2</option>
        <option value="20.9 | W">20.9 | W</option>
      </Select>
      {error && sizeError && <Error>{errorText}</Error>}
    </FormControl>
  );
};

SelectSize.propTypes = {
  error: PropTypes.bool,
  errorText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectSize);
