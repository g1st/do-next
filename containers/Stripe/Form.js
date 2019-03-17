import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  CardNumberElement
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import StripeElementWrapper from './StripeElementWrapper';

import { clearCart, clearBuyItNow } from '../../store/actions';
import { cart } from '../../util/helpers';
import CartDrawerContent from '../../components/CartDrawer/CartDrawerContent';
import Error from '../../components/Error/Error';
import {
  ElementContainer,
  Input,
  Label,
  GroupInput,
  TextArea,
  // Select,
  Wrapper,
  ShippmentForm,
  Cart,
  FormWrapper
} from '../../styles/Checkout';

class StripeForm extends Component {
  state = {
    orderComplete: false,
    error: false,
    disable: false,
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    additional_info: '',
    country: 'GB',
    card_number: { complete: false, error: null, empty: true },
    card_expiration: {
      complete: false,
      error: null,
      empty: true
    },
    CVC_number: { complete: false, error: null, empty: true },
    zip_code: { complete: false, error: null, empty: true },
    stripe_errors: false,
    backend_validation_errors: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleStripeChange = (element, name) => {
    if (!element.empty && element.complete) {
      return this.setState({
        [name]: { complete: true, error: null, empty: false }
      });
    }

    return this.setState({
      [name]: {
        complete: false,
        empty: element.empty,
        error: element.error ? element.error.message : null
      }
    });
  };

  handleFocus = () => {
    console.log('[focus]');
  };

  handleReady = () => {
    console.log('[ready]');
  };

  isStripesInputsOk = () => {
    if (
      this.state.card_number.error ||
      this.state.card_expiration.error ||
      this.state.CVC_number.error ||
      this.state.zip_code.error
    ) {
      this.setState({ stripe_errors: true });
      return false;
    }
    if (
      this.state.card_number.complete &&
      this.state.card_expiration.complete &&
      this.state.CVC_number.complete &&
      this.state.zip_code.complete
    ) {
      this.setState(() => ({ stripe_errors: false }));
      return true;
    }

    // that means fields are left blank
    this.setState(() => ({ stripe_errors: true }));

    return false;
  };

  handleSubmit = ev => {
    ev.preventDefault();
    if (!this.isStripesInputsOk() || this.stripe_errors) return;
    this.setState(() => ({ disable: true }));
    if (this.props.stripe) {
      this.props.stripe
        .createToken({
          name: `${this.state.first_name} ${this.state.last_name}`,
          address_line1: this.state.address1,
          address_line2: this.state.address2,
          address_city: this.state.city,
          address_country: this.state.country
        })
        .then(payload => {
          const {
            email,
            first_name,
            last_name,
            phone,
            address1,
            address2,
            city,
            additional_info,
            country
          } = this.state;

          let purchaseDetails;
          if (this.props.buyItNowItem.hasOwnProperty('name')) {
            console.log('is buyitnow pirko');
            purchaseDetails = {
              ...this.props.buyItNowItem,
              shippingCost: this.props.shippingCost,
              boughtFrom: 'buyItNow'
            };
          } else {
            console.log('is cart pirko');
            const count = this.props.cart.length;
            const selectedItems = this.props.cart;
            const totalItems = cart.totalItems(this.props.cart);
            const totalPrice = cart.totalPrice(this.props.cart);
            purchaseDetails = {
              count,
              selectedItems,
              totalItems,
              totalPrice,
              boughtFrom: 'cart',
              shippingCost: this.props.shippingCost
            };
          }

          axios
            .post('http://localhost:3000/api/charge', {
              token: payload.token.id,
              payload,
              additional: {
                email,
                first_name,
                last_name,
                phone,
                address1,
                address2,
                city,
                additional_info,
                country,
                purchaseDetails
              }
            })
            .then(res => {
              // backend did not validate form
              if (res.data.errors) {
                console.log(res.data.errors);
                console.log('terminatinu?');
                this.setState({
                  // backend_validation_errors: { ...res.data.errors },
                  backend_validation_errors: res.data.errors,
                  disable: false
                });

                return;
              }
              if (res.status == 200) {
                console.log('Purchase completed successfully');
                this.setState(() => ({ orderComplete: true }));
                // empty redux state
                this.props.clearCart();
                this.props.clearBuyItNow();
                console.log('its ok ', res);
              }
            })
            .catch(err => {
              console.log('its not ok ', err.response);
              console.log(err);
              console.log(err.errors);

              this.setState(() => ({ error: true }));
            });
        });
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
  };

  isNotValid = element => {
    const output = this.state.backend_validation_errors
      ? this.state.backend_validation_errors
          .filter(error => error.param === element)
          .map((error, i) => error.msg)
      : null;
    return output;
  };

  render() {
    const purchase = this.state.orderComplete ? (
      <p>Purchase Complete.</p>
    ) : (
      <div>
        <FormWrapper>
          <form onSubmit={e => this.handleSubmit(e)}>
            {/* invalid quantity, price or similar errors from backend */}
            {this.state.backend_validation_errors
              ? this.state.backend_validation_errors
                  .filter(error => error.param == '_error')
                  .map((error, i) => <Error key={i}>{error.msg}</Error>)
              : null}
            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="first_name"
                  label="First name"
                  type="text"
                  onChange={this.handleChange('first_name')}
                  value={this.state.first_name}
                  margin="dense"
                  required
                  fullWidth
                  InputLabelProps={{ required: false }} // to get rid of asterisk
                  error={this.state.backend_validation_errors.some(
                    err => err.param == 'additional.first_name'
                  )}
                  helperText={this.isNotValid('additional.first_name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="last_name"
                  label="Last name"
                  type="text"
                  onChange={this.handleChange('last_name')}
                  margin="dense"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors.some(
                    err => err.param == 'additional.last_name'
                  )}
                  InputLabelProps={{ required: false }}
                  helperText={this.isNotValid('additional.last_name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  label="Email address"
                  type="email"
                  onChange={this.handleChange('email')}
                  margin="dense"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors.some(
                    err => err.param == 'additional.email'
                  )}
                  InputLabelProps={{ required: false }}
                  helperText={this.isNotValid('additional.email')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  label="Phone number (optional)"
                  type="tel"
                  onChange={this.handleChange('phone')}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address1"
                  label="Address"
                  type="text"
                  onChange={this.handleChange('address1')}
                  margin="dense"
                  fullWidth
                  required
                  InputLabelProps={{ required: false }}
                  error={this.state.backend_validation_errors.some(
                    err => err.param == 'additional.address1'
                  )}
                  helperText={this.isNotValid('additional.address1')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  label="Apartment, suite, etc. (optional)"
                  type="text"
                  onChange={this.handleChange('address2')}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  style={{ margin: '16px 0 8px 0' }}
                  error={this.state.backend_validation_errors.some(
                    err => err.param == 'additional.country'
                  )}
                >
                  <InputLabel htmlFor="country">Country</InputLabel>
                  <Select
                    value={this.state.country}
                    onChange={this.handleChange('country')}
                  >
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia, Plurinational State of</option>
                    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="IO">British Indian Ocean Territory</option>
                    <option value="BN">Brunei Darussalam</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos (Keeling) Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Côte d'Ivoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CW">Curaçao</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands (Malvinas)</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="TF">French Southern Territories</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HM">
                      Heard Island and McDonald Islands
                    </option>
                    <option value="VA">Holy See (Vatican City State)</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran, Islamic Republic of</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KP">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="KR">Korea, Republic of</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Lao People's Democratic Republic</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MK">
                      Macedonia, the former Yugoslav Republic of
                    </option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia, Federated States of</option>
                    <option value="MD">Moldova, Republic of</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestinian Territory, Occupied</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Réunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="RW">Rwanda</option>
                    <option value="BL">Saint Barthélemy</option>
                    <option value="SH">
                      Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="MF">Saint Martin (French part)</option>
                    <option value="PM">Saint Pierre and Miquelon</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Principe</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SX">Sint Maarten (Dutch part)</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan Mayen</option>
                    <option value="SZ">Swaziland</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syrian Arab Republic</option>
                    <option value="TW">Taiwan, Province of China</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania, United Republic of</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos Islands</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="UM">
                      United States Minor Outlying Islands
                    </option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VE">
                      Venezuela, Bolivarian Republic of
                    </option>
                    <option value="VN">Viet Nam</option>
                    <option value="VG">Virgin Islands, British</option>
                    <option value="VI">Virgin Islands, U.S.</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </Select>
                  {this.isNotValid('additional.country') && (
                    <Error>{this.isNotValid('additional.country')}</Error>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="city"
                  label="City"
                  type="text"
                  onChange={this.handleChange('city')}
                  margin="normal"
                  fullWidth
                  required
                  InputLabelProps={{ required: false }}
                  error={this.state.backend_validation_errors.some(
                    err => err.param == 'additional.city'
                  )}
                  helperText={this.isNotValid('additional.city')}
                />
              </Grid>

              <Grid item xs={7} sm={6}>
                <StripeElementWrapper
                  label="Card Number"
                  placeholder="1234 1234 1234 1234"
                  component={CardNumberElement}
                  name="card_number"
                  onChange={this.handleStripeChange}
                  error={
                    this.state.card_number.error
                      ? this.state.card_number.error
                      : this.state.stripe_errors
                      ? this.state.card_number.empty
                        ? `Your card's number is blank`
                        : null
                      : null
                  }
                />
              </Grid>
              <Grid item xs={5} sm={6}>
                <StripeElementWrapper
                  label="Expiry (MM / YY)"
                  component={CardExpiryElement}
                  name="card_expiration"
                  onChange={this.handleStripeChange}
                  error={
                    this.state.card_expiration.error
                      ? this.state.card_expiration.error
                      : this.state.stripe_errors
                      ? this.state.card_expiration.empty
                        ? `Your card's expiration day is blank.`
                        : null
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <StripeElementWrapper
                  label="CVC"
                  component={CardCVCElement}
                  name="CVC_number"
                  onChange={this.handleStripeChange}
                  error={
                    this.state.CVC_number.error
                      ? this.state.CVC_number.error
                      : this.state.stripe_errors
                      ? this.state.CVC_number.empty
                        ? `Your card's security number is blank.`
                        : null
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <StripeElementWrapper
                  label="Postal / ZIP code"
                  component={PostalCodeElement}
                  name="zip_code"
                  onChange={this.handleStripeChange}
                  error={
                    this.state.zip_code.error
                      ? this.state.zip_code.error
                      : this.state.stripe_errors
                      ? this.state.zip_code.empty
                        ? `Your card's postal code is blank.`
                        : null
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="additional_info"
                  label="Additional information (optional)"
                  multiline
                  fullWidth
                  rows={4}
                  type="text"
                  placeholder="Anything else you would like to add"
                  onChange={this.handleChange('additional_info')}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ required: false }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!this.props.stripe || this.state.disable}
            >
              Buy
            </Button>
          </form>
        </FormWrapper>
      </div>
    );

    let buyItNow = false;

    if (this.props.buyItNowItem.hasOwnProperty('name')) {
      buyItNow = true;
    }

    let checkoutPossible = false;
    if (buyItNow || this.props.cart.length > 0) {
      checkoutPossible = true;
    }

    return (
      <div>
        {this.state.error ? (
          <div>
            We cannot process your payment. Please check your payment details
            and try again.
            <p>asa</p>
          </div>
        ) : checkoutPossible ? (
          <Wrapper>
            <Cart>
              <CartDrawerContent buyItNow={buyItNow} />
            </Cart>
            <ShippmentForm>{purchase}</ShippmentForm>
          </Wrapper>
        ) : this.state.orderComplete ? (
          <div>order complete, clear cart</div>
        ) : (
          <Typography variant="body1">Your Cart is empty.</Typography>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  buyItNowItem: state.buyItNow,
  shippingCost: state.shippingCost
});

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart()),
  clearBuyItNow: () => dispatch(clearBuyItNow())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeForm);
