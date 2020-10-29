import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import { changeDisplay } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    color: '#595959',
    letterSpacing: '0.5px',
  },
  option: {
    color: '#595959',
  },
}));

const ShowAvailable = ({ changeDisplayRedux }) => {
  const classes = useStyles();
  const [available, setAvailable] = useState('all');

  const handleChange = (event) => {
    const { value } = event.target;
    setAvailable(value);
    changeDisplayRedux(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="display-select-label"
          id="display-select"
          value={available}
          onChange={handleChange}
          disableUnderline
          className={classes.select}
        >
          <MenuItem value="all" selected className={classes.option}>
            All
          </MenuItem>
          <MenuItem value="available" className={classes.option}>
            Available to buy
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

ShowAvailable.propTypes = {
  changeDisplayRedux: PropTypes.func,
};

const mapStateToProps = (state) => ({
  option: state.filter.display,
});

const mapDispatchToProps = (dispatch) => ({
  changeDisplayRedux: (display) => dispatch(changeDisplay(display)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowAvailable);
