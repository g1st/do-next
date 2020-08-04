import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
    background: '#9e2146',
    color: 'fff',
  },
  paddingTop: {
    paddingTop: '70px',
  },
  dangerButtons: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
});

const DangerZone = ({
  classes,
  itemID,
  collection,
  removeItem,
  removeCollection,
}) => {
  const deleteItem = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete`, {
        params: { _id: itemID },
      })
      .then((res) => {
        removeItem(res.data.deletedItem);
      })
      .catch((err) => console.log(err));
  };

  const deleteCollection = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete`, {
        params: { collection },
      })
      .then((res) => {
        removeCollection(res.data.deletedCollection);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.paddingTop}>
      <Typography variant="h5" color="error" align="center">
        Danger zone
      </Typography>
      <div className={classes.dangerButtons}>
        <Button
          className={classes.button}
          type="submit"
          size="large"
          variant="contained"
          color="secondary"
          onClick={() =>
            window.confirm('Are you sure you want to delete this item?') &&
            deleteItem()
          }
        >
          Delete item
        </Button>
        <Button
          className={classes.button}
          type="submit"
          size="large"
          variant="contained"
          color="secondary"
          onClick={() =>
            window.confirm(
              'Are you sure you want to delete the whole collection?'
            ) && deleteCollection()
          }
        >
          Delete whole collection
        </Button>
      </div>
    </div>
  );
};

DangerZone.propTypes = {
  collection: PropTypes.string.isRequired,
  itemID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  removeCollection: PropTypes.func.isRequired,
};

export default withStyles(styles)(DangerZone);
