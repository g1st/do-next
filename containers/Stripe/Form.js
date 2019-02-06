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
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import StripeElementWrapper from './StripeElementWrapper';

import { clearCart, clearBuyItNow } from '../../store/actions';
import { cart } from '../../util/helpers';
import CartDrawerContent from '../../components/CartDrawer/CartDrawerContent';
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

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      letterSpacing: '0.025em'
      // '::placeholder': {
      //   color: '#aab7c4'
      // }
    },
    invalid: {
      color: '#9e2146'
    }
  }
};

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
    card_number: { complete: false, error: null },
    card_expiration: { complete: false, error: null },
    CVC_number: { complete: false, error: null },
    zip_code: { complete: false, error: null },
    stripe_errors: false,
    backend_validation_errors: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleBlur = () => {
    console.log('[blur]');
  };
  handleStripeChange = (element, name) => {
    console.log(element, name);

    if (!element.empty && element.complete) {
      return this.setState({
        [name]: { complete: true, error: null }
      });
    }
    // if (element.empty) {
    //   this.setState({
    //     [name]: { complete: false, error: null },
    //     stripe_errors: true
    //   });
    // }
    // if (element.error) {
    console.log('[change]', element, name);
    console.log(this.state);
    return this.setState({
      [name]: {
        complete: false,
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
    console.log('checking for stripe errors');
    console.log(this.state.CVC_number);
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
      this.setState(() => {
        return { stripe_errors: false };
      });
      return true;
    }

    // that means fields are left blank
    this.setState(() => {
      return { stripe_errors: true };
    });

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
          .map((error, i) => {
            return <span key={i}>{error.msg}</span>;
          })
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
            {this.state.backend_validation_errors
              ? this.state.backend_validation_errors
                  .filter(error => error.param == '_error')
                  .map((error, i) => {
                    return <p key={i}>{error.msg}</p>;
                  })
              : null}
            {/* use MUI Grid? */}
            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="first_name"
                  label="First name"
                  type="text"
                  placeholder="Your first name"
                  onChange={this.handleChange('first_name')}
                  value={this.state.first_name}
                  margin="dense"
                  required
                  fullWidth
                  InputLabelProps={{ required: false }} //get rid of asterisk
                />
                {this.isNotValid('additional.first_name')}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="last_name"
                  label="Last name"
                  type="text"
                  placeholder="Your last name"
                  onChange={this.handleChange('last_name')}
                  margin="dense"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
                />
                {this.isNotValid('additional.last_name')}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  label="Email address"
                  type="email"
                  placeholder="your@email.com"
                  onChange={this.handleChange('email')}
                  margin="dense"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
                />
                {this.isNotValid('additional.email')}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  label="Phone number"
                  type="tel"
                  placeholder="+440123456789"
                  onChange={this.handleChange('phone')}
                  margin="dense"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address1"
                  label="Address line 1"
                  type="text"
                  placeholder="House number and street name"
                  onChange={this.handleChange('address1')}
                  margin="dense"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
                />
                {this.isNotValid('additional.address1')}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address2"
                  label="Address line 2"
                  type="text"
                  placeholder="Apartment number, floor number etc."
                  onChange={this.handleChange('address2')}
                  margin="normal"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  label="Town / City"
                  type="text"
                  placeholder="Town / City"
                  onChange={this.handleChange('city')}
                  margin="normal"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
                />
                {this.isNotValid('additional.city')}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <FormControl className={classes.formControl}> */}
                <FormControl style={{ minWidth: 220, margin: '16px 0 8px 0' }}>
                  <InputLabel htmlFor="country">Country</InputLabel>
                  <Select
                    value={this.state.country}
                    onChange={this.handleChange('country')}
                    inputProps={{
                      name: 'country',
                      id: 'country'
                    }}
                    // defaultValue="GB"
                    // required
                  >
                    <MenuItem value="AF">Afghanistan</MenuItem>
                    <MenuItem value="AX">Åland Islands</MenuItem>
                    <MenuItem value="AL">Albania</MenuItem>
                    <MenuItem value="DZ">Algeria</MenuItem>
                    <MenuItem value="AS">American Samoa</MenuItem>
                    <MenuItem value="AD">Andorra</MenuItem>
                    <MenuItem value="AO">Angola</MenuItem>
                    <MenuItem value="AI">Anguilla</MenuItem>
                    <MenuItem value="AQ">Antarctica</MenuItem>
                    <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                    <MenuItem value="AR">Argentina</MenuItem>
                    <MenuItem value="AM">Armenia</MenuItem>
                    <MenuItem value="AW">Aruba</MenuItem>
                    <MenuItem value="AU">Australia</MenuItem>
                    <MenuItem value="AT">Austria</MenuItem>
                    <MenuItem value="AZ">Azerbaijan</MenuItem>
                    <MenuItem value="BS">Bahamas</MenuItem>
                    <MenuItem value="BH">Bahrain</MenuItem>
                    <MenuItem value="BD">Bangladesh</MenuItem>
                    <MenuItem value="BB">Barbados</MenuItem>
                    <MenuItem value="BY">Belarus</MenuItem>
                    <MenuItem value="BE">Belgium</MenuItem>
                    <MenuItem value="BZ">Belize</MenuItem>
                    <MenuItem value="BJ">Benin</MenuItem>
                    <MenuItem value="BM">Bermuda</MenuItem>
                    <MenuItem value="BT">Bhutan</MenuItem>
                    <MenuItem value="BO">
                      Bolivia, Plurinational State of
                    </MenuItem>
                    <MenuItem value="BQ">
                      Bonaire, Sint Eustatius and Saba
                    </MenuItem>
                    <MenuItem value="BA">Bosnia and Herzegovina</MenuItem>
                    <MenuItem value="BW">Botswana</MenuItem>
                    <MenuItem value="BV">Bouvet Island</MenuItem>
                    <MenuItem value="BR">Brazil</MenuItem>
                    <MenuItem value="IO">
                      British Indian Ocean Territory
                    </MenuItem>
                    <MenuItem value="BN">Brunei Darussalam</MenuItem>
                    <MenuItem value="BG">Bulgaria</MenuItem>
                    <MenuItem value="BF">Burkina Faso</MenuItem>
                    <MenuItem value="BI">Burundi</MenuItem>
                    <MenuItem value="KH">Cambodia</MenuItem>
                    <MenuItem value="CM">Cameroon</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                    <MenuItem value="CV">Cape Verde</MenuItem>
                    <MenuItem value="KY">Cayman Islands</MenuItem>
                    <MenuItem value="CF">Central African Republic</MenuItem>
                    <MenuItem value="TD">Chad</MenuItem>
                    <MenuItem value="CL">Chile</MenuItem>
                    <MenuItem value="CN">China</MenuItem>
                    <MenuItem value="CX">Christmas Island</MenuItem>
                    <MenuItem value="CC">Cocos (Keeling) Islands</MenuItem>
                    <MenuItem value="CO">Colombia</MenuItem>
                    <MenuItem value="KM">Comoros</MenuItem>
                    <MenuItem value="CG">Congo</MenuItem>
                    <MenuItem value="CD">
                      Congo, the Democratic Republic of the
                    </MenuItem>
                    <MenuItem value="CK">Cook Islands</MenuItem>
                    <MenuItem value="CR">Costa Rica</MenuItem>
                    <MenuItem value="CI">Côte d'Ivoire</MenuItem>
                    <MenuItem value="HR">Croatia</MenuItem>
                    <MenuItem value="CU">Cuba</MenuItem>
                    <MenuItem value="CW">Curaçao</MenuItem>
                    <MenuItem value="CY">Cyprus</MenuItem>
                    <MenuItem value="CZ">Czech Republic</MenuItem>
                    <MenuItem value="DK">Denmark</MenuItem>
                    <MenuItem value="DJ">Djibouti</MenuItem>
                    <MenuItem value="DM">Dominica</MenuItem>
                    <MenuItem value="DO">Dominican Republic</MenuItem>
                    <MenuItem value="EC">Ecuador</MenuItem>
                    <MenuItem value="EG">Egypt</MenuItem>
                    <MenuItem value="SV">El Salvador</MenuItem>
                    <MenuItem value="GQ">Equatorial Guinea</MenuItem>
                    <MenuItem value="ER">Eritrea</MenuItem>
                    <MenuItem value="EE">Estonia</MenuItem>
                    <MenuItem value="ET">Ethiopia</MenuItem>
                    <MenuItem value="FK">Falkland Islands (Malvinas)</MenuItem>
                    <MenuItem value="FO">Faroe Islands</MenuItem>
                    <MenuItem value="FJ">Fiji</MenuItem>
                    <MenuItem value="FI">Finland</MenuItem>
                    <MenuItem value="FR">France</MenuItem>
                    <MenuItem value="GF">French Guiana</MenuItem>
                    <MenuItem value="PF">French Polynesia</MenuItem>
                    <MenuItem value="TF">French Southern Territories</MenuItem>
                    <MenuItem value="GA">Gabon</MenuItem>
                    <MenuItem value="GM">Gambia</MenuItem>
                    <MenuItem value="GE">Georgia</MenuItem>
                    <MenuItem value="DE">Germany</MenuItem>
                    <MenuItem value="GH">Ghana</MenuItem>
                    <MenuItem value="GI">Gibraltar</MenuItem>
                    <MenuItem value="GR">Greece</MenuItem>
                    <MenuItem value="GL">Greenland</MenuItem>
                    <MenuItem value="GD">Grenada</MenuItem>
                    <MenuItem value="GP">Guadeloupe</MenuItem>
                    <MenuItem value="GU">Guam</MenuItem>
                    <MenuItem value="GT">Guatemala</MenuItem>
                    <MenuItem value="GG">Guernsey</MenuItem>
                    <MenuItem value="GN">Guinea</MenuItem>
                    <MenuItem value="GW">Guinea-Bissau</MenuItem>
                    <MenuItem value="GY">Guyana</MenuItem>
                    <MenuItem value="HT">Haiti</MenuItem>
                    <MenuItem value="HM">
                      Heard Island and McDonald Islands
                    </MenuItem>
                    <MenuItem value="VA">
                      Holy See (Vatican City State)
                    </MenuItem>
                    <MenuItem value="HN">Honduras</MenuItem>
                    <MenuItem value="HK">Hong Kong</MenuItem>
                    <MenuItem value="HU">Hungary</MenuItem>
                    <MenuItem value="IS">Iceland</MenuItem>
                    <MenuItem value="IN">India</MenuItem>
                    <MenuItem value="ID">Indonesia</MenuItem>
                    <MenuItem value="IR">Iran, Islamic Republic of</MenuItem>
                    <MenuItem value="IQ">Iraq</MenuItem>
                    <MenuItem value="IE">Ireland</MenuItem>
                    <MenuItem value="IM">Isle of Man</MenuItem>
                    <MenuItem value="IL">Israel</MenuItem>
                    <MenuItem value="IT">Italy</MenuItem>
                    <MenuItem value="JM">Jamaica</MenuItem>
                    <MenuItem value="JP">Japan</MenuItem>
                    <MenuItem value="JE">Jersey</MenuItem>
                    <MenuItem value="JO">Jordan</MenuItem>
                    <MenuItem value="KZ">Kazakhstan</MenuItem>
                    <MenuItem value="KE">Kenya</MenuItem>
                    <MenuItem value="KI">Kiribati</MenuItem>
                    <MenuItem value="KP">
                      Korea, Democratic People's Republic of
                    </MenuItem>
                    <MenuItem value="KR">Korea, Republic of</MenuItem>
                    <MenuItem value="KW">Kuwait</MenuItem>
                    <MenuItem value="KG">Kyrgyzstan</MenuItem>
                    <MenuItem value="LA">
                      Lao People's Democratic Republic
                    </MenuItem>
                    <MenuItem value="LV">Latvia</MenuItem>
                    <MenuItem value="LB">Lebanon</MenuItem>
                    <MenuItem value="LS">Lesotho</MenuItem>
                    <MenuItem value="LR">Liberia</MenuItem>
                    <MenuItem value="LY">Libya</MenuItem>
                    <MenuItem value="LI">Liechtenstein</MenuItem>
                    <MenuItem value="LT">Lithuania</MenuItem>
                    <MenuItem value="LU">Luxembourg</MenuItem>
                    <MenuItem value="MO">Macao</MenuItem>
                    <MenuItem value="MK">
                      Macedonia, the former Yugoslav Republic of
                    </MenuItem>
                    <MenuItem value="MG">Madagascar</MenuItem>
                    <MenuItem value="MW">Malawi</MenuItem>
                    <MenuItem value="MY">Malaysia</MenuItem>
                    <MenuItem value="MV">Maldives</MenuItem>
                    <MenuItem value="ML">Mali</MenuItem>
                    <MenuItem value="MT">Malta</MenuItem>
                    <MenuItem value="MH">Marshall Islands</MenuItem>
                    <MenuItem value="MQ">Martinique</MenuItem>
                    <MenuItem value="MR">Mauritania</MenuItem>
                    <MenuItem value="MU">Mauritius</MenuItem>
                    <MenuItem value="YT">Mayotte</MenuItem>
                    <MenuItem value="MX">Mexico</MenuItem>
                    <MenuItem value="FM">
                      Micronesia, Federated States of
                    </MenuItem>
                    <MenuItem value="MD">Moldova, Republic of</MenuItem>
                    <MenuItem value="MC">Monaco</MenuItem>
                    <MenuItem value="MN">Mongolia</MenuItem>
                    <MenuItem value="ME">Montenegro</MenuItem>
                    <MenuItem value="MS">Montserrat</MenuItem>
                    <MenuItem value="MA">Morocco</MenuItem>
                    <MenuItem value="MZ">Mozambique</MenuItem>
                    <MenuItem value="MM">Myanmar</MenuItem>
                    <MenuItem value="NA">Namibia</MenuItem>
                    <MenuItem value="NR">Nauru</MenuItem>
                    <MenuItem value="NP">Nepal</MenuItem>
                    <MenuItem value="NL">Netherlands</MenuItem>
                    <MenuItem value="NC">New Caledonia</MenuItem>
                    <MenuItem value="NZ">New Zealand</MenuItem>
                    <MenuItem value="NI">Nicaragua</MenuItem>
                    <MenuItem value="NE">Niger</MenuItem>
                    <MenuItem value="NG">Nigeria</MenuItem>
                    <MenuItem value="NU">Niue</MenuItem>
                    <MenuItem value="NF">Norfolk Island</MenuItem>
                    <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                    <MenuItem value="NO">Norway</MenuItem>
                    <MenuItem value="OM">Oman</MenuItem>
                    <MenuItem value="PK">Pakistan</MenuItem>
                    <MenuItem value="PW">Palau</MenuItem>
                    <MenuItem value="PS">
                      Palestinian Territory, Occupied
                    </MenuItem>
                    <MenuItem value="PA">Panama</MenuItem>
                    <MenuItem value="PG">Papua New Guinea</MenuItem>
                    <MenuItem value="PY">Paraguay</MenuItem>
                    <MenuItem value="PE">Peru</MenuItem>
                    <MenuItem value="PH">Philippines</MenuItem>
                    <MenuItem value="PN">Pitcairn</MenuItem>
                    <MenuItem value="PL">Poland</MenuItem>
                    <MenuItem value="PT">Portugal</MenuItem>
                    <MenuItem value="PR">Puerto Rico</MenuItem>
                    <MenuItem value="QA">Qatar</MenuItem>
                    <MenuItem value="RE">Réunion</MenuItem>
                    <MenuItem value="RO">Romania</MenuItem>
                    <MenuItem value="RU">Russian Federation</MenuItem>
                    <MenuItem value="RW">Rwanda</MenuItem>
                    <MenuItem value="BL">Saint Barthélemy</MenuItem>
                    <MenuItem value="SH">
                      Saint Helena, Ascension and Tristan da Cunha
                    </MenuItem>
                    <MenuItem value="KN">Saint Kitts and Nevis</MenuItem>
                    <MenuItem value="LC">Saint Lucia</MenuItem>
                    <MenuItem value="MF">Saint Martin (French part)</MenuItem>
                    <MenuItem value="PM">Saint Pierre and Miquelon</MenuItem>
                    <MenuItem value="VC">
                      Saint Vincent and the Grenadines
                    </MenuItem>
                    <MenuItem value="WS">Samoa</MenuItem>
                    <MenuItem value="SM">San Marino</MenuItem>
                    <MenuItem value="ST">Sao Tome and Principe</MenuItem>
                    <MenuItem value="SA">Saudi Arabia</MenuItem>
                    <MenuItem value="SN">Senegal</MenuItem>
                    <MenuItem value="RS">Serbia</MenuItem>
                    <MenuItem value="SC">Seychelles</MenuItem>
                    <MenuItem value="SL">Sierra Leone</MenuItem>
                    <MenuItem value="SG">Singapore</MenuItem>
                    <MenuItem value="SX">Sint Maarten (Dutch part)</MenuItem>
                    <MenuItem value="SK">Slovakia</MenuItem>
                    <MenuItem value="SI">Slovenia</MenuItem>
                    <MenuItem value="SB">Solomon Islands</MenuItem>
                    <MenuItem value="SO">Somalia</MenuItem>
                    <MenuItem value="ZA">South Africa</MenuItem>
                    <MenuItem value="GS">
                      South Georgia and the South Sandwich Islands
                    </MenuItem>
                    <MenuItem value="SS">South Sudan</MenuItem>
                    <MenuItem value="ES">Spain</MenuItem>
                    <MenuItem value="LK">Sri Lanka</MenuItem>
                    <MenuItem value="SD">Sudan</MenuItem>
                    <MenuItem value="SR">Suriname</MenuItem>
                    <MenuItem value="SJ">Svalbard and Jan Mayen</MenuItem>
                    <MenuItem value="SZ">Swaziland</MenuItem>
                    <MenuItem value="SE">Sweden</MenuItem>
                    <MenuItem value="CH">Switzerland</MenuItem>
                    <MenuItem value="SY">Syrian Arab Republic</MenuItem>
                    <MenuItem value="TW">Taiwan, Province of China</MenuItem>
                    <MenuItem value="TJ">Tajikistan</MenuItem>
                    <MenuItem value="TZ">Tanzania, United Republic of</MenuItem>
                    <MenuItem value="TH">Thailand</MenuItem>
                    <MenuItem value="TL">Timor-Leste</MenuItem>
                    <MenuItem value="TG">Togo</MenuItem>
                    <MenuItem value="TK">Tokelau</MenuItem>
                    <MenuItem value="TO">Tonga</MenuItem>
                    <MenuItem value="TT">Trinidad and Tobago</MenuItem>
                    <MenuItem value="TN">Tunisia</MenuItem>
                    <MenuItem value="TR">Turkey</MenuItem>
                    <MenuItem value="TM">Turkmenistan</MenuItem>
                    <MenuItem value="TC">Turks and Caicos Islands</MenuItem>
                    <MenuItem value="TV">Tuvalu</MenuItem>
                    <MenuItem value="UG">Uganda</MenuItem>
                    <MenuItem value="UA">Ukraine</MenuItem>
                    <MenuItem value="AE">United Arab Emirates</MenuItem>
                    <MenuItem value="GB">United Kingdom</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="UM">
                      United States Minor Outlying Islands
                    </MenuItem>
                    <MenuItem value="UY">Uruguay</MenuItem>
                    <MenuItem value="UZ">Uzbekistan</MenuItem>
                    <MenuItem value="VU">Vanuatu</MenuItem>
                    <MenuItem value="VE">
                      Venezuela, Bolivarian Republic of
                    </MenuItem>
                    <MenuItem value="VN">Viet Nam</MenuItem>
                    <MenuItem value="VG">Virgin Islands, British</MenuItem>
                    <MenuItem value="VI">Virgin Islands, U.S.</MenuItem>
                    <MenuItem value="WF">Wallis and Futuna</MenuItem>
                    <MenuItem value="EH">Western Sahara</MenuItem>
                    <MenuItem value="YE">Yemen</MenuItem>
                    <MenuItem value="ZM">Zambia</MenuItem>
                    <MenuItem value="ZW">Zimbabwe</MenuItem>
                  </Select>
                </FormControl>

                {this.isNotValid('additional.country')}
              </Grid>

              <Grid item xs={7} sm={6}>
                <StripeElementWrapper
                  label="Card Number"
                  placeholder="1234 1234 1234 1234"
                  component={CardNumberElement}
                  name={'card_number'}
                  onChange={this.handleStripeChange}
                />
                {this.state.stripe_errors ? (
                  this.state.card_number.error ? (
                    <Typography variant="body2" color="error">
                      {this.state.card_number.error}
                    </Typography>
                  ) : this.state.card_number.complete ? null : (
                    <Typography variant="body2" color="error">
                      Your card's number is blank.
                    </Typography>
                  )
                ) : null}
              </Grid>
              <Grid item xs={5} sm={6}>
                <StripeElementWrapper
                  label="Expiry (MM / YY)"
                  component={CardExpiryElement}
                  name={'card_expiration'}
                  onChange={this.handleStripeChange}
                />
                {this.state.stripe_errors ? (
                  this.state.card_expiration.error ? (
                    <Typography variant="body2" color="error">
                      {this.state.card_expiration.error}
                    </Typography>
                  ) : this.state.card_expiration.complete ? null : (
                    <Typography variant="body2" color="error">
                      Your card's expiration date is blank.
                    </Typography>
                  )
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <StripeElementWrapper
                  label="CVC"
                  component={CardCVCElement}
                  name={'CVC_number'}
                  onChange={this.handleStripeChange}
                />
                {this.state.stripe_errors ? (
                  this.state.CVC_number.error ? (
                    <Typography variant="body2" color="error">
                      {this.state.CVC_number.error}
                    </Typography>
                  ) : this.state.CVC_number.complete ? null : (
                    <Typography variant="body2" color="error">
                      Your card's security code is blank.
                    </Typography>
                  )
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <StripeElementWrapper
                  label="Postal / ZIP code"
                  component={PostalCodeElement}
                  name={'zip_code'}
                  onChange={this.handleStripeChange}
                />
                {this.state.stripe_errors ? (
                  this.state.zip_code.error ? (
                    <Typography variant="body2" color="error">
                      {this.state.zip_code.error}
                    </Typography>
                  ) : this.state.zip_code.complete ? null : (
                    <Typography variant="body2" color="error">
                      Your postal code is blank.
                    </Typography>
                  )
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="additional_info"
                  label="Additional information"
                  multiline={true}
                  fullWidth
                  rows={4}
                  type="text"
                  placeholder="Anything else you would like to add"
                  onChange={this.handleChange('additional_info')}
                  margin="normal"
                  fullWidth
                  required
                  error={this.state.backend_validation_errors}
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

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart()),
    clearBuyItNow: () => dispatch(clearBuyItNow())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeForm);
