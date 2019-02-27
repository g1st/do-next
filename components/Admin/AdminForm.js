import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import Error from '../Error/Error';
import ModalLoader from '../UI/ModalLoader/ModalLoader';

const styles = theme => ({
  root: {
    display: 'flex',
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  form: {
    backgroundColor: 'white',
    margin: '0 10px',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto'
    }
  },
  imageInput: {
    marginTop: '30px',
    // width: '500px',
    display: 'flex',
    flexDirection: 'column',
    hideImageInput: {
      display: 'none'
    }
  },
  formGroup: {
    flexDirection: 'row'
  },
  newCollection: {
    marginTop: 0
  }
  // collections: {
  //   display: 'flex',
  //   first: {
  //     flexGrow: 2
  //   },
  //   second: {

  //   }
  // },
});

class AdminForm extends Component {
  state = {
    title: '',
    description: '',
    images: '',
    size: '',
    price: '',
    category: 'ring',
    materials: '',
    collection: '',
    existingCollection: '',
    available: 'available',
    updating: false,
    updated: false,
    errors: null
  };

  handleChange = name => event => {
    name === 'available'
      ? this.setState({ [name]: event.target.checked })
      : this.setState({ [name]: event.target.value });
  };

  handleImages = event => {
    this.setState({ images: event.target.files });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({ updating: true }));

    const {
      title,
      description,
      images,
      materials,
      size,
      price,
      category,
      available
    } = this.state;

    const collection = this.state.collection
      ? this.state.collection
      : this.state.existingCollection;

    let formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('materials', materials);
    formData.append('size', size);
    formData.append('collection', collection);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('available', available);

    for (const photo of images) {
      formData.append('photos[]', photo);
    }

    axios
      // change for deployment
      .post('http://localhost:3000/api/update', formData)
      .then(response => {
        const errors = response.data.errors;

        let err = {};

        for (const prop in errors) {
          if (errors[prop].hasOwnProperty('message')) {
            err[prop] = errors[prop].message;
          }
        }

        this.setState(() => ({ errors: err, updating: false }));
        // updated: true
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.updated ? (
          <p>Piece added</p>
        ) : (
          <form
            encType="multipart/form-data"
            onSubmit={e => this.handleSubmit(e)}
            className={classes.form}
          >
            <TextField
              className={classes.root}
              id="title"
              label="Piece title"
              value={this.state.title}
              onChange={this.handleChange('title')}
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ required: false }}
              error={
                this.state.errors
                  ? this.state.errors.name
                    ? true
                    : false
                  : false
              }
              helperText={this.state.errors && this.state.errors.name}
            />
            <TextField
              className={classes.root}
              id="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleChange('description')}
              margin="normal"
              multiline
              rows={4}
              required
              InputLabelProps={{ required: false }}
              error={
                this.state.errors
                  ? this.state.errors.description
                    ? true
                    : false
                  : false
              }
              helperText={this.state.errors && this.state.errors.description}
            />
            <div>
              <FormControl
                className={classes.collection}
                disabled={!!this.state.collection}
              >
                <InputLabel htmlFor="collection" shrink>
                  Select Collection
                </InputLabel>
                <Select
                  native
                  value={this.state.existingCollection}
                  onChange={this.handleChange('existingCollection')}
                >
                  {this.props.collections.map((collection, i) => (
                    <option value={collection} key={i}>
                      {collection}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <TextField
                className={classes.newCollection}
                id="collection"
                label="Or Add New Collection"
                value={this.state.collection}
                onChange={this.handleChange('collection')}
                margin="normal"
                InputLabelProps={{ required: false }}
                error={
                  this.state.errors
                    ? this.state.errors.collection
                      ? true
                      : false
                    : false
                }
                helperText={this.state.errors && this.state.errors.collection}
              />
            </div>
            <div className={classes.imageInput}>
              <label htmlFor="images">
                <Typography variant="body2" gutterBottom>
                  Select images
                </Typography>
              </label>
              <input
                type="file"
                multiple
                id="images"
                accept="image/*"
                name="photos[]"
                onChange={this.handleImages}
                required={true}
              />
              {this.state.errors ? (
                this.state.errors.images ? (
                  <Error>{this.state.errors.images}</Error>
                ) : null
              ) : null}
            </div>
            <TextField
              className={classes.root}
              id="materials"
              label="Materials (optional)"
              value={this.state.materials}
              onChange={this.handleChange('materials')}
              margin="normal"
            />
            <TextField
              className={classes.root}
              id="size"
              label="Size (optional)"
              value={this.state.size}
              onChange={this.handleChange('size')}
              margin="normal"
            />
            <TextField
              className={classes.root}
              id="price"
              label="Price"
              value={this.state.price}
              onChange={this.handleChange('price')}
              margin="normal"
              required
              InputLabelProps={{ required: false }}
              error={
                this.state.errors
                  ? this.state.errors.price
                    ? true
                    : false
                  : false
              }
              helperText={this.state.errors && this.state.errors.price}
            />
            <FormControl component="fieldset" className={classes.root}>
              <FormLabel component="legend" color="primary">
                Category
              </FormLabel>
              <RadioGroup
                className={classes.formGroup}
                aria-label="category"
                name="category"
                value={this.state.category}
              >
                <FormControlLabel
                  value="ring"
                  control={<Radio color="secondary" />}
                  label="Ring"
                  labelPlacement="end"
                  checked={this.state.category === 'ring'}
                  onChange={this.handleChange('category')}
                />
                <FormControlLabel
                  value="brooch"
                  control={<Radio color="secondary" />}
                  label="Brooch"
                  labelPlacement="end"
                  checked={this.state.category === 'brooch'}
                  onChange={this.handleChange('category')}
                />
                <FormControlLabel
                  value="earring"
                  control={<Radio color="secondary" />}
                  label="Earring"
                  labelPlacement="end"
                  checked={this.state.category === 'earring'}
                  onChange={this.handleChange('category')}
                />
                <FormControlLabel
                  value="necklace"
                  control={<Radio color="secondary" />}
                  label="Necklace"
                  labelPlacement="end"
                  checked={this.state.category === 'necklace'}
                  onChange={this.handleChange('category')}
                />
                <FormControlLabel
                  value="bracelet"
                  control={<Radio color="secondary" />}
                  label="Bracelet"
                  labelPlacement="end"
                  checked={this.state.category === 'bracelet'}
                  onChange={this.handleChange('category')}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="secondary" />}
                  label="Other"
                  labelPlacement="end"
                  checked={this.state.category === 'other'}
                  onChange={this.handleChange('category')}
                />
              </RadioGroup>
            </FormControl>
            <FormGroup className={classes.root}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.available}
                    onChange={this.handleChange('available')}
                    value="available"
                    color="secondary"
                  />
                }
                label="Available to buy"
              />
            </FormGroup>
            <Button
              className={classes.button}
              type="submit"
              size="medium"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        )}
        {this.state.updating ? <ModalLoader /> : null}
      </div>
    );
  }
}

AdminForm.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string)
};

export default withWidth()(withStyles(styles)(AdminForm));
