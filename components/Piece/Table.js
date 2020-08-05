import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { dimensions, usSizes, ukSizes, euSizes } from '../../util/globals';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fafafa',
    },
  },
  tableCell: {
    fontSize: '16px',
  },
};

const SizesTable = ({ classes }) => (
  <Table stickyHeader className={classes.root}>
    <TableHead>
      <TableRow>
        <TableCell align="center" className={classes.tableCell}>
          Diameter (mm)
        </TableCell>
        <TableCell align="center" className={classes.tableCell}>
          UK
        </TableCell>
        <TableCell align="center" className={classes.tableCell}>
          EU
        </TableCell>
        <TableCell align="center" className={classes.tableCell}>
          US
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {dimensions.map((dimension, index) => (
        <TableRow key={index} className={classes.row}>
          <TableCell align="center" className={classes.tableCell}>
            {dimension}
          </TableCell>
          <TableCell align="center" className={classes.tableCell}>
            {ukSizes[index]}
          </TableCell>
          <TableCell align="center" className={classes.tableCell}>
            {euSizes[index]}
          </TableCell>
          <TableCell align="center" className={classes.tableCell}>
            {usSizes[index]}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

SizesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SizesTable);
