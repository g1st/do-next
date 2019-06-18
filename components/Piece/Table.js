import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import { dimensions, usSizes, ukSizes, euSizes } from '../../util/globals';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fafafa'
    }
  }
};

const SizesTable = ({ classes }) => (
  <Table className={classes.root}>
    <TableHead>
      <TableRow>
        <TableCell padding="dense" align="center">
          Diameter (mm)
        </TableCell>
        <TableCell padding="dense" align="center">
          UK
        </TableCell>
        <TableCell padding="dense" align="center">
          EU
        </TableCell>
        <TableCell padding="dense" align="center">
          US
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {dimensions.map((dimension, index) => (
        <TableRow key={index} className={classes.row}>
          <TableCell align="center" padding="dense">
            {dimension}
          </TableCell>
          <TableCell align="center" padding="dense">
            {ukSizes[index]}
          </TableCell>
          <TableCell align="center" padding="dense">
            {euSizes[index]}
          </TableCell>
          <TableCell align="center" padding="dense">
            {usSizes[index]}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

SizesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SizesTable);
