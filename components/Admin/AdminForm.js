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

import DangerZone from './DangerZone';
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
    available: 'available',
    updating: false,
    errors: null,
    work: null,
    deletedItem: null,
    deletedCollection: null,
    imageFiles: []
  };

  componentDidMount = () => {
    const { collections, itemToEdit } = this.props;

    if (itemToEdit) {
      this.setState(state => ({
        ...state,
        ...itemToEdit,
        existingCollection: itemToEdit.group,
        selectedImages: Object.assign(
          {},
          ...itemToEdit.images.map(img => ({ [img.thumb]: false }))
        )
      }));
      if (!collections.includes(itemToEdit.group)) {
        collections.push(itemToEdit.group);
      }
    }
  };

  removeItem = name => {
    this.setState({ deletedItem: name });
  };

  removeCollection = name => {
    this.setState({ deletedCollection: name });
  };

  handleChange = (name, event, thumb) => {
    const { checked } = event.target;
    if (name === 'available') return this.setState({ [name]: checked });
    if (name === 'selectedImages')
      return this.setState(({ selectedImages }) => ({
        selectedImages: {
          ...selectedImages,
          [thumb]: checked
        }
      }));

    this.setState({ [name]: event.target.value });
  };

  handleImages = event => {
    this.setState({ imageFiles: event.target.files });
  };

  // only when creating new item
  resetForm = () => {
    document.getElementById('images').value = null;

    this.setState({
      name: '',
      description: '',
      images: '',
      size: '',
      price: '',
      category: 'ring',
      materials: '',
      collection: '',
      existingCollection: '',
      available: 'available'
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({
      updating: true
    }));

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
      selectedImages,
      imageFiles,
      collection,
      existingCollection
    } = this.state;

    const imagesToRemove = [];

    if (selectedImages) {
      Object.entries(selectedImages).forEach(([key, value]) => {
        // truthy when user selected for removal
        if (value) {
          imagesToRemove.push(key);
        }
      });
    }

    // 'various' is default collection when collection is not specified
    // or specified for 'various' explicitly
    const currentCollection = collection || existingCollection || 'various';

    const formData = new FormData();

    formData.append('_id', _id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('materials', materials);
    formData.append('size', size);
    formData.append('collection', currentCollection);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('available', available);
    formData.append('imagesToRemove', imagesToRemove);
    formData.append('imageCount', images.length);

    for (const photo of imageFiles) {
      formData.append('photos[]', photo);
    }
    const { itemToEdit } = this.props;
    if (itemToEdit) {
      // axios call for edit

      axios
        // change for deployment
        .patch('http://localhost:3000/api/update', formData)
        .then(response => {
          const { errors } = response.data;

          if (
            errors &&
            Object.prototype.hasOwnProperty.call(errors, 'images')
          ) {
            return this.setState({
              errors,
              updating: false
            });
          }
          const keys = errors ? Object.keys(errors) : [];
          const err = keys.reduce((acc, k) => {
            if (Object.prototype.hasOwnProperty.call(errors[k], 'message')) {
              acc[k] = errors[k].message;
              return acc;
            }
            return acc;
          }, {});

          const {
            _id: id,
            group,
            images: justUpdatedImages
          } = response.data.work;

          this.setState({
            errors: err,
            updating: false,
            work: {
              id,
              name,
              collection: group
            },
            images: justUpdatedImages,
            selectedImages: Object.assign(
              {},
              ...justUpdatedImages.map(item => ({
                [item.thumb]: false
              }))
            )
          });
        })
        .catch(err => {
          this.setState({
            errors: err,
            updating: false
          });
          console.log(err);
        });
    } else {
      // creating new item
      axios
        // change for deployment
        .post('http://localhost:3000/api/update', formData)
        .then(response => {
          const { errors } = response.data;

          const keys = errors ? Object.keys(errors) : [];
          const err = keys.reduce((acc, k) => {
            if (Object.prototype.hasOwnProperty.call(errors[k], 'message')) {
              acc[k] = errors[k].message;
              return acc;
            }
            return acc;
          }, {});

          const { _id: id, group } = response.data.work;

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
          this.setState({
            errors: err,
            updating: false
          });
          console.log(err);
        });
    }
  };

  render() {
    const { classes, collections, itemToEdit } = this.props;
    const {
      available,
      category,
      collection,
      description,
      errors,
      existingCollection,
      materials,
      name,
      price,
      selectedImages,
      selectedItems,
      size,
      updating,
      work
    } = this.state;

    let workInfo = null;

    if (work) {
      // TODO: check name, collection in state === work.name work.collection
      // ! Answer: it is not (all the time). work = justUpdatedItem,
      // ! state could be reseted (when creating new items) and work
      // !will still have data of previously created one
      const {
        id,
        name: justCreatedName,
        collection: justCreatedCollection
      } = work;
      workInfo = (
        <div className={classes.added}>
          <Typography variant="body2">
            Piece{' '}
            <Link href={`/piece?id=${id}`} as={`/piece/${id}`}>
              <a>{justCreatedName}</a>
            </Link>{' '}
            was {itemToEdit ? 'updated' : 'added'} to a collection{' '}
            <Link
              href={`/works?collection=${justCreatedCollection}`}
              as={`/works/${justCreatedCollection}`}
            >
              <a>{justCreatedCollection}</a>
            </Link>{' '}
            successfuly.
          </Typography>
        </div>
      );
    }
    const { deletedItem } = this.state;
    if (deletedItem) {
      return (
        <div>
          <Typography variant="body2">
            Item {deletedItem} was deleted.
          </Typography>
          <Typography variant="body2">
            <Link href="/admin">
              <a>Add new piece</a>
            </Link>
          </Typography>
        </div>
      );
    }
    const { deletedCollection } = this.state;
    if (deletedCollection) {
      return (
        <div>
          <Typography variant="body2">
            Collection {deletedCollection} was deleted.
          </Typography>
          <Typography variant="body2">
            <Link href="/admin">
              <a>Add new piece</a>
            </Link>
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
            value={name}
            onChange={e => this.handleChange('name', e)}
            margin="normal"
            required
            InputLabelProps={{ required: false }}
            error={errors ? !!errors.name : false}
            helperText={errors && errors.name}
          />
          <TextField
            className={classes.root}
            id="description"
            label="Description"
            value={description}
            onChange={e => this.handleChange('description', e)}
            margin="normal"
            multiline
            rows={4}
            required
            InputLabelProps={{ required: false }}
            error={errors ? !!errors.description : false}
            helperText={errors && errors.description}
          />
          <div>
            <FormControl
              className={classes.collection}
              disabled={!!collection}
              required={!collection}
            >
              <InputLabel htmlFor="collection" shrink required={false}>
                Select Collection
              </InputLabel>
              <Select
                native
                value={existingCollection}
                onChange={e => this.handleChange('existingCollection', e)}
              >
                <option value="default" key="empty" />
                {collections.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </Select>
            </FormControl>

            <TextField
              className={classes.newCollection}
              id="collection"
              label="Or Add New Collection"
              value={collection}
              onChange={e => this.handleChange('collection', e)}
              margin="normal"
              InputLabelProps={{ required: false }}
              error={errors ? !!errors.collection : false}
              helperText={errors && errors.collection}
            />
          </div>
          <div className={classes.imageInput}>
            <label id="linting" htmlFor="images">
              <Typography variant="body2" gutterBottom>
                Add images
              </Typography>
              <input
                type="file"
                multiple
                id="images"
                accept="image/*"
                name="photos[]"
                onChange={this.handleImages}
                required={!itemToEdit}
              />
            </label>
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
                          checked={selectedItems && selectedImages[item]}
                          onChange={e =>
                            this.handleChange('selectedImages', e, item)
                          }
                          value={selectedImages && `${selectedImages[item]}`}
                          color="secondary"
                        />
                      }
                      label={
                        <img
                          alt=""
                          className={classes.singleImage}
                          src={`/static/uploads/${item}`}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            ) : null}
            {errors && errors.images ? <Error>{errors.images}</Error> : null}
          </div>
          <TextField
            className={classes.root}
            id="materials"
            label="Materials (optional)"
            value={materials}
            onChange={e => this.handleChange('materials', e)}
            margin="normal"
          />
          <TextField
            className={classes.root}
            id="size"
            label="Size (optional)"
            value={size}
            onChange={e => this.handleChange('size', e)}
            margin="normal"
          />
          <TextField
            className={classes.root}
            type="number"
            id="price"
            label="Price"
            value={price}
            onChange={e => this.handleChange('price', e)}
            margin="normal"
            required
            InputLabelProps={{ required: false }}
            error={errors ? !!errors.price : false}
            helperText={errors && errors.price}
          />
          <FormControl component="fieldset" className={classes.root}>
            <FormLabel component="legend" color="primary">
              Category
            </FormLabel>
            <RadioGroup
              className={classes.formGroup}
              aria-label="category"
              name="category"
              value={category}
            >
              <FormControlLabel
                value="ring"
                control={<Radio color="secondary" />}
                label="Ring"
                labelPlacement="end"
                checked={category === 'ring'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="brooch"
                control={<Radio color="secondary" />}
                label="Brooch"
                labelPlacement="end"
                checked={category === 'brooch'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="earring"
                control={<Radio color="secondary" />}
                label="Earring"
                labelPlacement="end"
                checked={category === 'earring'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="necklace"
                control={<Radio color="secondary" />}
                label="Necklace"
                labelPlacement="end"
                checked={category === 'necklace'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="bracelet"
                control={<Radio color="secondary" />}
                label="Bracelet"
                labelPlacement="end"
                checked={category === 'bracelet'}
                onChange={e => this.handleChange('category', e)}
              />
              <FormControlLabel
                value="other"
                control={<Radio color="secondary" />}
                label="Other"
                labelPlacement="end"
                checked={category === 'other'}
                onChange={e => this.handleChange('category', e)}
              />
            </RadioGroup>
          </FormControl>
          <FormGroup className={classes.root}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={available}
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
            {itemToEdit ? 'Edit item' : 'Add item'}
          </Button>
        </form>
        {itemToEdit ? (
          <DangerZone
            itemID={itemToEdit._id.toString()}
            collection={itemToEdit.group}
            removeItem={this.removeItem}
            removeCollection={this.removeCollection}
          />
        ) : null}
        {updating ? <ModalLoader /> : null}
      </div>
    );
  }
}

AdminForm.propTypes = {
  classes: PropTypes.object.isRequired,
  collections: PropTypes.arrayOf(PropTypes.string),
  itemToEdit: PropTypes.object
};

export default withWidth()(withStyles(styles)(AdminForm));
