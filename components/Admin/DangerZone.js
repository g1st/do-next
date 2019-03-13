import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: '#9e2146',
    color: 'fff'
  }
});

const DangerZone = ({ classes, itemID, collection, removeItem }) => {
  console.log(itemID, collection);

  const deleteItem = id => {
    console.log('deleting item...');
    axios
      .delete('http://localhost:3000/api/delete', { params: { _id: id } })
      .then(res => {
        console.log(res.data.deletedItem);
        removeItem(res.data.deletedItem);
      })
      .catch(err => console.log(err));

    // todo: update view
  };

  return (
    <div>
      <Typography variant="h5" color="error" align="center">
        Danger zone
      </Typography>
      <Button
        className={classes.button}
        type="submit"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={() => {
          window.confirm('Are you sure you want to delete this item?') &&
            deleteItem(itemID);
        }}
      >
        Delete item
      </Button>
      <Button
        className={classes.button}
        type="submit"
        size="medium"
        variant="contained"
        color="secondary"
      >
        Delete whole collection
      </Button>
    </div>
  );
};

DangerZone.propTypes = {
  collection: PropTypes.string.isRequired,
  itemID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default withStyles(styles)(DangerZone);
