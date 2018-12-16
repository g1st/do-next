import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Subscribe } from 'unstated';
import {
  Elements,
  injectStripe,
  StripeProvider,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  CardNumberElement
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';

import withContext from '../hoc/withUnstated';
import Layout from '../components/Layout';
import CartContainer from '../containers/CartContainer';
import {
  ElementContainer,
  Input,
  TextArea,
  Select,
  Wrapper,
  ShippmentForm,
  Cart
} from '../styles/Checkout';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
};

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};
class _CardForm extends Component {
  state = {
    complete: false,
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
    country: 'GB'
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = ev => {
    ev.preventDefault();
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
          const {
            count,
            selectedItems,
            totalItems,
            totalPrice
          } = this.props.state;

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
                count,
                selectedItems,
                totalItems,
                totalPrice
              }
            })
            .then(res => {
              if (res.status == 200) {
                console.log('Purchase completed successfully');
                this.setState(() => ({ complete: true }));
              }
              console.log('its ok ', res);
            })
            .catch(err => {
              console.log('its not ok ', err);
              this.setState(() => ({ error: true }));
            });
        });
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
  };

  componentDidMount() {
    console.log('hi');
    console.log(this.props.state);
  }

  render() {
    const purchase = this.state.complete ? (
      <p>Purchase Complete.</p>
    ) : (
      <div>
        <p>Would you like to complete the purchase?</p>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="first_name">
            <Typography variant="body1">First name *</Typography>
            <Input
              type="text"
              placeholder="First name"
              id="first_name"
              onChange={this.handleChange('first_name')}
              required
            />
          </label>
          <label htmlFor="last_name">
            <Typography variant="body1">Last name *</Typography>
            <Input
              type="text"
              placeholder="Last name"
              id="last_name"
              onChange={this.handleChange('last_name')}
              required
            />
          </label>
          <label htmlFor="email">
            <Typography variant="body1">Email address *</Typography>
            <Input
              type="email"
              placeholder="Email address"
              id="email"
              onChange={this.handleChange('email')}
              required
            />
          </label>
          <label htmlFor="phone">
            <Typography variant="body1">Phone</Typography>
            <Input
              type="text"
              placeholder="Phone number"
              id="phone"
              onChange={this.handleChange('phone')}
            />
          </label>
          <label htmlFor="address-1">
            <Typography variant="body1">Address line 1 *</Typography>
            <Input
              type="text"
              placeholder="House number and street name"
              id="address-1"
              onChange={this.handleChange('address1')}
              required
            />
          </label>
          <label htmlFor="address-2">
            <Typography variant="body1">Address line 2</Typography>
            <Input
              type="text"
              placeholder="Apartment number, floor number etc."
              onChange={this.handleChange('address2')}
              id="address-2"
            />
          </label>
          <label htmlFor="city">
            <Typography variant="body1">Town / City *</Typography>
            <Input type="text" id="city" onChange={this.handleChange('city')} />
          </label>
          <label htmlFor="country">
            <Typography variant="body1">Country *</Typography>
          </label>

          <Select
            id="country"
            name="country"
            onChange={this.handleChange('country')}
            defaultValue="GB"
            required
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
            <option value="CD">Congo, the Democratic Republic of the</option>
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
            <option value="HM">Heard Island and McDonald Islands</option>
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
            <option value="KP">Korea, Democratic People's Republic of</option>
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
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </Select>

          <label>
            Card number *
            <ElementContainer>
              <CardNumberElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label>
            <Typography variant="body1">Expiration date *</Typography>
            <ElementContainer>
              <CardExpiryElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label>
            <Typography variant="body1">CVC *</Typography>

            <ElementContainer>
              <CardCVCElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label>
            <Typography variant="body1">Postal code *</Typography>

            <ElementContainer>
              <PostalCodeElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label htmlFor="additional_info">
            <Typography variant="body1">Additional information</Typography>

            <TextArea
              rows="4"
              id="additional_info"
              placeholder="Anything else you would like to add"
              onChange={this.handleChange('additional_info')}
            />
          </label>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!this.props.stripe || this.state.disable}
          >
            Pay
          </Button>
        </form>
      </div>
    );

    return (
      <div>
        <div>Checkout component</div>
        {this.state.error ? (
          <p>
            We cannot process your payment. Please check your payment details
            and try again.
          </p>
        ) : (
          <Wrapper>
            <ShippmentForm>{purchase}</ShippmentForm>

            <Cart>
              <div>Unique items: {this.props.state.count}</div>
              <div>Total items: {this.props.state.totalItems}</div>
              <div>Total price: {this.props.state.totalPrice}£</div>
            </Cart>
          </Wrapper>
        )}
      </div>
    );
  }
}

// because injectStripe cannot be used on the same element that renders the Elements component;
// it must be used on the child component of Elements
const CardForm = injectStripe(withContext(_CardForm));
class PulledOutElements extends Component {
  render() {
    return (
      <Elements>
        <CardForm />
      </Elements>
    );
  }
}
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { stripe: null };
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_CkPX0rsL8Rg0GT3vYyQoe0jq')
      });
    } else {
      const stripeJs = document.createElement('script');
      stripeJs.src = 'https://js.stripe.com/v3/';
      stripeJs.async = true;
      stripeJs.onload = () => {
        this.setState({
          stripe: window.Stripe('pk_test_CkPX0rsL8Rg0GT3vYyQoe0jq')
        });
      };
      document.body && document.body.appendChild(stripeJs);
    }
  }

  render() {
    return (
      <Layout pathname={false}>
        <StripeProvider stripe={this.state.stripe}>
          <PulledOutElements />
        </StripeProvider>
      </Layout>
    );
  }
}

export default Checkout;
