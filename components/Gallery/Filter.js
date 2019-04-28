import React from 'react';
import PropTypes from 'prop-types';
import { Select, InputLabel, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    marginLeft: 'auto'
  }
});

const Filter = ({ classes, data, option, handleChange }) => (
  <FormControl className={classes.root}>
    <InputLabel htmlFor="filter-gallery" />
    <Select
      native
      value={option}
      onChange={handleChange}
      inputProps={{
        id: 'filter-gallery'
      }}
    >
      <option value="">Show all</option>
      {data
        .reduce((acc, item) => {
          if (!acc.includes(item.category)) acc.push(item.category);
          return acc;
        }, [])
        .map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.substring(1)}
          </option>
        ))}
    </Select>
  </FormControl>
);

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  option: PropTypes.string,
  handleChange: PropTypes.func
};

export default withStyles(styles)(Filter);
