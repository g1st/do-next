import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
  InputLabel,
  Select,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { appUrl } from '../../config';
import { StyledAnchorLink } from '../../styles/Shared';
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
  },
  checkbox: {
    color: theme.palette.error.main,
    '&$checked': {
      color: theme.palette.error.main
    }
  },
  checked: {},
  madeToOrder: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit,
    flexDirection: 'row'
  },
  producingTime: {
    flexGrow: 1
  }
});

class AdminForm extends Component {
  state = {
    name: '',
    description: '',
    images: '',
    size: '',
    weight: '',
    price: '',
    category: 'ring',
    materials: '',
    collection: '',
    available: 'available',
    madeToOrder: false,
    producingTime: '',
    updating: false,
    errors: null,
    work: null,
    deletedItem: null,
    deletedCollection: null,
    imageFiles: []
  };

  imageInputRef = React.createRef();

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
    const { checked, value } = event.target;
    if (name === 'available') return this.setState({ [name]: checked });
    if (name === 'madeToOrder') {
      return this.setState({ [name]: checked });
    }
    if (name === 'selectedImages')
      return this.setState(({ selectedImages }) => ({
        selectedImages: {
          ...selectedImages,
          [thumb]: checked
        }
      }));
    if (name === 'frontImage') return this.setState({ frontImage: value });

    this.setState({ [name]: event.target.value });
  };

  handleImages = event => {
    this.setState({ imageFiles: event.target.files });
  };

  // only when creating new item
  resetForm = () => {
    this.imageInputRef.current.value = null;

    this.setState({
      name: '',
      description: '',
      images: '',
      size: '',
      weight: '',
      price: '',
      category: 'ring',
      materials: '',
      collection: '',
      existingCollection: '',
      available: 'available',
      madeToOrder: false,
      producingTime: ''
    });
  };

  handleErrors = error => {
    const keys = error ? Object.keys(error) : [];
    const err = keys.reduce((acc, k) => {
      if (Object.prototype.hasOwnProperty.call(error[k], 'message')) {
        acc[k] = error[k].message;
        return acc;
      }
      return acc;
    }, {});

    if (error) {
      return this.setState({
        errors: err,
        updating: false
      });
    }
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
      weight,
      price,
      category,
      available,
      selectedImages,
      imageFiles,
      collection,
      existingCollection,
      frontImage,
      madeToOrder,
      producingTime
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
    formData.append('weight', weight);
    formData.append('collection', currentCollection);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('available', available);
    formData.append('imagesToRemove', imagesToRemove);
    formData.append('imageCount', images.length);
    formData.append('frontImage', frontImage);
    formData.append('madeToOrder', madeToOrder);
    formData.append('producingTime', producingTime);

    for (const photo of imageFiles) {
      formData.append('photos[]', photo);
    }
    const { itemToEdit } = this.props;
    if (itemToEdit) {
      axios
        .patch(`${appUrl}/api/update`, formData)
        .then(response => {
          const { error } = response.data;

          if (error) return this.handleErrors(error);

          const {
            _id: id,
            group,
            images: justUpdatedImages
          } = response.data.work;

          this.setState({
            errors: null,
            updating: false,
            work: {
              id,
              name,
              collection: group
            },
            images: justUpdatedImages,
            selectedImages: Object.assign(
              {},
              ...justUpdatedImages.map(item => ({ [item.thumb]: false }))
            )
          });

          Router.push(`/piece?id=${id}`, `/piece/${id}`);
        })
        .catch(err => {
          this.setState({ errors: err, updating: false });
        });
    } else {
      // creating new item
      axios
        .post(`${appUrl}/api/update`, formData)
        .then(response => {
          const { error } = response.data;

          if (error) return this.handleErrors(error);

          const { _id: id, group } = response.data.work;

          this.setState(
            () => ({
              errors: null,
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
      weight,
      updating,
      work,
      frontImage,
      madeToOrder,
      producingTime
    } = this.state;

    let workInfo = null;

    if (work) {
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
              href={`/gallery?collection=${justCreatedCollection}`}
              as={`/gallery/${justCreatedCollection}`}
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
          {itemToEdit && (
            <div>
              <Typography inline variant="body2">
                Item's page:{' '}
              </Typography>
              <Link
                href={`/piece?id=${itemToEdit._id}`}
                as={`/piece/${itemToEdit._id}`}
              >
                <StyledAnchorLink>{itemToEdit.name}</StyledAnchorLink>
              </Link>{' '}
            </div>
          )}
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
                ref={this.imageInputRef}
              />
            </label>
            {/* for edit view show current photos and let select for deleting */}
            {selectedImages ? (
              <div>
                <Typography variant="body2">
                  Select images below which you would like to remove
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
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked
                          }}
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
            {selectedImages ? (
              <div>
                <Typography variant="body2">Select your front image</Typography>
                <RadioGroup
                  className={classes.formGroup}
                  aria-label="frontImage"
                  name="frontImage"
                  value={frontImage}
                >
                  {itemToEdit.images.map(image => (
                    <FormControlLabel
                      key={image.medium}
                      value={image.medium}
                      control={<Radio color="secondary" />}
                      labelPlacement="end"
                      checked={image.medium === frontImage}
                      onChange={e => this.handleChange('frontImage', e)}
                      label={
                        <img
                          alt=""
                          className={classes.singleImage}
                          src={`/static/uploads/${image.thumb}`}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
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
            id="weight"
            label="Weight (optional)"
            value={weight}
            onChange={e => this.handleChange('weight', e)}
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
          <FormGroup className={classes.madeToOrder}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={madeToOrder}
                  onChange={e => this.handleChange('madeToOrder', e)}
                  value="madeToOrder"
                  color="secondary"
                />
              }
              label="Made To Order Item"
            />
            {errors && errors.madeToOrder ? (
              <Error>{errors.madeToOrder}</Error>
            ) : null}
            <TextField
              className={classes.producingTime}
              id="producingTime"
              label='required if "Made To Order" is checked, ...producing time for this item is [your input].'
              value={producingTime}
              onChange={e => this.handleChange('producingTime', e)}
              margin="dense"
              required={!!madeToOrder}
              error={errors ? !!errors.producingTime : false}
              helperText={errors && errors.producingTime}
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

export default withStyles(styles)(AdminForm);
