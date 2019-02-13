import React, { Component } from 'react';
import axios from 'axios';

import ModalLoader from '../UI/ModalLoader/ModalLoader';

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
    available: 'available',
    updating: false,
    updated: false,
    errors: null
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
      collection,
      size,
      price,
      category,
      available
    } = this.state;

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
    let validationErrors = '';
    if (this.state.errors) {
      validationErrors = Object.values(this.state.errors).map((err, i) => (
        <p style={{ color: 'red' }} key={i}>
          {err}
        </p>
      ));
    }

    return (
      <div>
        {validationErrors}
        {this.state.updated ? (
          <p>Piece added</p>
        ) : (
          <form
            encType="multipart/form-data"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange('title')}
                // required={true}
              />
              {this.state.errors ? (
                this.state.errors.name ? (
                  <p>{this.state.errors.name}</p>
                ) : null
              ) : null}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange('description')}
                required={true}
              />
            </div>
            {this.state.errors ? (
              this.state.errors.description ? (
                <p>{this.state.errors.description}</p>
              ) : null
            ) : null}
            <div>
              <label htmlFor="collection">Collection</label>
              <input
                type="text"
                id="collection"
                name="collection"
                value={this.state.collection}
                onChange={this.handleChange('collection')}
                required={true}
              />
            </div>
            {this.state.errors ? (
              this.state.errors.collection ? (
                <p>{this.state.errors.collection}</p>
              ) : null
            ) : null}
            <div>
              <label htmlFor="images">Images</label>
              <input
                type="file"
                multiple
                id="images"
                accept="image/*"
                // value={this.state.images}
                name="photos[]"
                onChange={this.handleImages}
                required={true}
              />
              {this.state.errors ? (
                this.state.errors['images.0'] ? (
                  <p>{this.state.errors['images.0']}</p>
                ) : null
              ) : null}
            </div>
            <div>
              <label htmlFor="materials">materials</label>
              <input
                type="text"
                id="materials"
                name="materials"
                value={this.state.materials}
                onChange={this.handleChange('materials')}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="size">size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={this.state.size}
                onChange={this.handleChange('size')}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="price">price</label>
              <input
                type="number"
                id="price"
                value={this.state.price}
                name="price"
                onChange={this.handleChange('price')}
                required={true}
              />
              {this.state.errors ? (
                this.state.errors.price ? (
                  <p>{this.state.errors.price}</p>
                ) : null
              ) : null}
            </div>
            <fieldset>
              <legend>Select category</legend>
              <div>
                <input
                  type="radio"
                  name="category"
                  id="ring"
                  value="ring"
                  checked={this.state.category === 'ring'}
                  onChange={this.handleChange('category')}
                />
                <label htmlFor="ring">Ring</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  checked={this.state.category === 'brooch'}
                  id="brooch"
                  onChange={this.handleChange('category')}
                  value="brooch"
                />
                <label htmlFor="brooch">Brooch</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  checked={this.state.category === 'earring'}
                  id="earring"
                  onChange={this.handleChange('category')}
                  value="earring"
                />
                <label htmlFor="earring">Earring</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  checked={this.state.category === 'necklace'}
                  id="necklace"
                  onChange={this.handleChange('category')}
                  value="necklace"
                />
                <label htmlFor="necklace">Necklace</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  checked={this.state.category === 'bracelet'}
                  id="bracelet"
                  onChange={this.handleChange('category')}
                  value="bracelet"
                />
                <label htmlFor="bracelet">Bracelet</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  id="other"
                  value="other"
                  onChange={this.handleChange('category')}
                  checked={this.state.category === 'other'}
                />
                <label htmlFor="other">Other</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Availability</legend>
              <div>
                <input
                  type="radio"
                  name="availability"
                  id="available"
                  value="available"
                  checked={this.state.available === 'available'}
                  onChange={this.handleChange('available')}
                />
                <label htmlFor="available">Available</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="availability"
                  checked={this.state.available === 'not_available'}
                  id="not_available"
                  value="not_available"
                  onChange={this.handleChange('available')}
                />
                <label htmlFor="not_available">Not available</label>
              </div>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
        {this.state.updating ? <ModalLoader /> : null}
      </div>
    );
  }
}

export default AdminForm;
