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
import Link from 'next/link';

import Error from '../Error/Error';
import ModalLoader from '../UI/ModalLoader/ModalLoader';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
    margin: theme.spacing.unit
  },
  collection: {
    margin: theme.spacing.unit
  },
  added: {
    margin: '10px',
    [theme.breakpoints.up('md')]: {
      margin: '10px 40px'
    }
  },
  singleImage: {
    maxWidth: '146px',
    maxHeight: '146px',
    display: 'inline-block'
  },
  imagesToEdit: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: theme.spacing.unit
  }
});

class AdminForm extends Component {
  state = {
    name: '',
    description: '',
    images: '',
    size: '',
    price: '',
    category: 'ring',
    materials: '',
    collection: '',
    existingCollection: this.props.collections[0] || '',
    available: 'available',
    updating: false,
    errors: null,
    work: null
  };

  componentDidMount = () => {
    if (this.props.itemToEdit) {
      this.setState(state => ({
        ...state,
        ...this.props.itemToEdit,
        selectedImages: Object.assign(
          {},
          ...this.props.itemToEdit.images.map(img => ({ [img.thumb]: false }))
        )
      }));
    }
  };

  handleChange = (name, event, thumb) => {
    if (name === 'available')
      return this.setState({ [name]: event.target.checked });
    if (name === 'selectedImages')
      return this.setState({
        selectedImages: {
          ...this.state.selectedImages,
          [thumb]: event.target.checked
        }
      });

    this.setState({ [name]: event.target.value });
  };

  handleImages = event => {
    this.setState({ images: event.target.files });
  };

  // only when creating new item
  resetForm = () => {
    this.setState({
      name: '',
      description: '',
      images: '',
      size: '',
      price: '',
      category: 'ring',
      materials: '',
      collection: '',
      existingCollection: this.props.collections[0] || '',
      available: 'available'
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({ updating: true }));

    const {
      _id,
      name,
      description,
      images,
      materials,
      size,
      price,
      category,
      available,
      selectedImages
    } = this.state;

    const imagesToRemove = [];
    for (const key in selectedImages) {
      // truthy when user selected for removal
      selectedImages[key] ? imagesToRemove.push(key) : null;
    }

    const collection = this.state.collection
      ? this.state.collection
      : this.state.existingCollection;

    let formData = new FormData();

    formData.append('_id', _id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('materials', materials);
    formData.append('size', size);
    formData.append('collection', collection);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('available', available);
    formData.append('imagesToRemove', imagesToRemove);

    for (const photo of images) {
      formData.append('photos[]', photo);
    }

    if (this.props.itemToEdit) {
      // axios call for edit

      axios
        // change for deployment
        .patch('http://localhost:3000/api/update', formData)
        .then(response => {
          const errors = response.data.errors;

          let err = {};

          for (const prop in errors) {
            if (errors[prop].hasOwnProperty('message')) {
              err[prop] = errors[prop].message;
            }
          }

          const { _id: id, name, group, images } = response.data.work;

          this.setState({
            errors: err,
            updating: false,
            work: {
              id,
              name,
              collection: group
            },
            images,
            selectedImages: Object.assign(
              {},
              ...images.map(item => ({ [item.thumb]: false }))
            )
          });
        })
        .catch(err => {
          this.setState({ errors: err, updating: false });
          console.log(err);
        });
    } else {
      // creating new item

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

          const { _id: id, name, group } = response.data.work;

          this.setState(
            () => ({
              errors: err,
              updating: false,
              work: {
                id,
                name,
                collection: group
              }
            }),
            () => this.resetForm()
          );
        })
        .catch(err => {
          this.setState({ errors: err, updating: false });
          console.log(err);
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { selectedImages } = this.state;

    let workInfo = null;

    if (this.state.work) {
      const { name, collection, id } = this.state.work;
      workInfo = (
        <div className={classes.added}>
          <Typography variant="body2">
            Piece{' '}
            <Link href={`/piece?id=${id}`} as={`/piece/${id}`}>
              <a>{name}</a>
            </Link>{' '}
            was {this.props.itemToEdit ? 'updated' : 'added'} to a collection{' '}
            <Link
              href={`/works?collection=${collection}`}
              as={`/works/${collection}`}
            >
              <a>{collection}</a>
            </Link>{' '}
            successfuly.
          </Typography>
        </div>
      );
    }

    return (
      <div>
        {workInfo}
        <form
          encType="multipart/form-data"
          onSubmit={e => this.handleSubmit(e)}
          className={classes.form}
        >
          <TextField
            className={classes.root}
            id="name"
            label="Piece name"
            value={this.state.name}
            onChange={e => this.handleChange('name', e)}
            margin="normal"
            required
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
            onChange={e => this.handleChange('description', e)}
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
                onChange={e => this.handleChange('existingCollection', e)}
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
              onChange={e => this.handleChange('collection', e)}
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
                Add images
              </Typography>
            </label>
            <input
              type="file"
              multiple
              id="images"
              accept="image/*"
              name="photos[]"
              onChange={this.handleImages}
              required={this.props.itemToEdit ? false : true}
            />
            {/* for edit view show current photos and let select for deleting */}
            {selectedImages ? (
              <div>
                <Typography variant="body2">
                  Or select images below which you would like to remove
                </Typography>
                <FormGroup className={classes.imagesToEdit}>
                  {Object.keys(selectedImages).map(item => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={
                            this.state.selectedItems &&
                            this.state.selectedImages[item]
                          }
                          onChange={e =>
                            this.handleChange('selectedImages', e, item)
                          }
                          value={
                            this.state.selectedImages &&
                            `${this.state.selectedImages[item]}`
                          }
                          color="secondary"
                        />
                      }
                      label={
                        <img
                          className={classes.singleImage}
                          src={`/static/uploads/${item}`}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            ) : null}
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
            onChange={e => this.handleChange('materials', e)}
            margin="normal"
          />
          <TextField
            className={classes.root}
            id="size"
            label="Size (optional)"
            value={this.state.size}
            onChange={e => this.handleChange('size', e)}
            margin="normal"
          />
          <TextField
            className={classes.root}
            id="price"
            label="Price"
            value={this.state.price}
            onChange={e => this.handleChange('price', e)}
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
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="brooch"
                control={<Radio color="secondary" />}
                label="Brooch"
                labelPlacement="end"
                checked={this.state.category === 'brooch'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="earring"
                control={<Radio color="secondary" />}
                label="Earring"
                labelPlacement="end"
                checked={this.state.category === 'earring'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="necklace"
                control={<Radio color="secondary" />}
                label="Necklace"
                labelPlacement="end"
                checked={this.state.category === 'necklace'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="bracelet"
                control={<Radio color="secondary" />}
                label="Bracelet"
                labelPlacement="end"
                checked={this.state.category === 'bracelet'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="other"
                control={<Radio color="secondary" />}
                label="Other"
                labelPlacement="end"
                checked={this.state.category === 'other'}
                onChange={e => this.handleChange('category', e)}
              />
            </RadioGroup>
          </FormControl>
          <FormGroup className={classes.root}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.available}
                  onChange={e => this.handleChange('available', e)}
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
          >
            {this.props.itemToEdit ? 'Edit item' : 'Add item'}
          </Button>
        </form>
        {this.state.updating ? <ModalLoader /> : null}
      </div>
    );
  }
}

AdminForm.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string)
};

export default withWidth()(withStyles(styles)(AdminForm));
