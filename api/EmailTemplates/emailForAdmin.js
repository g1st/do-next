/* eslint-disable camelcase */
const mjml2html = require('mjml');

module.exports = function emailForClient(
  data,
  price,
  shippingCost,
  clientInfo,
  withDiscount
) {
  const {
    address1,
    additional_info,
    address2,
    city,
    full_country_name,
    email,
    first_name,
    last_name,
    postal_code,
    phone
  } = clientInfo;

  const options = {};

  const htmlOutput = mjml2html(
    `
  <mjml lang="en">
  <mj-head>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
    <mj-title>Purchase @dovilejewellery.com</mj-title>
    <mj-preview>Purchase @dovilejewellery.com</mj-preview>
    <mj-attributes>
      <mj-body background-color="#ffffff" />
      <mj-all font-family="Roboto, Helvetica, Arial, sans-serif" />
      <mj-text font-size="16px" line-height="24px" color="#212121" />
      <mj-button padding="0px" background-color="#fff" />
      <mj-table font-size="16px" line-height="24px" color="#212121" />
      <mj-divider border-color="#eeeeee" border-width="1px" border-style="solid" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image src="https://www.dovilejewellery.com/images/terms-conditions.JPG" alt="Dovile Jewellery FLOW brooch" />
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>
          Hello Doviliuk!
        </mj-text>
        <mj-text>
          a new order just have been placed!
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>Order details:</mj-text>
         <mj-table>
          ${data
            .map(
              item => `
            <tr style="text-align:left;">
              <th style="font-weight: normal">Item</th>
              <td>
                <a href="${
                  item.link
                }" target="_blank" style="color: #212121; text-decoration:underline;">${
                item.name
              }</a>${item.quantity > 1 ? `, #${item.quantity}` : ''}
              </td>
            </tr>
            ${
              item.ringSize
                ? `<tr style="text-align:left;">
                <th style="font-weight: normal; padding-left: 15px;">Size</th>
                <td>${item.ringSize}</td>
              </tr>`
                : ''
            }
            ${
              item.silverFinishStyle
                ? `<tr style="text-align:left;">
                <th style="font-weight: normal; padding-left: 15px;">Silver finish</th>
                <td>${item.silverFinishStyle}</td>
              </tr>`
                : ''
            }
          `
            )
            .join(' ')}
          <tr style="text-align:left;">
            <th style="font-weight: normal">Purchase time</th>
            <td>${new Date().toLocaleString()}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Amount</th>
            <td>£${price}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Shipping cost</th>
            <td>${shippingCost === 0 ? 'Free' : `£${shippingCost}`}</td>
          </tr>
          ${
            withDiscount
              ? `
              <tr style="text-align:left;">
                <th style="font-weight: normal">Amount before discount
                </th>
                <td>£${price + shippingCost}</td>
              </tr>
              <tr style="text-align:left;">
                <th style="font-weight: normal">Discount
                </th>
                <td>"${withDiscount.code}"  -${
                  withDiscount.discountPercentage
                }% off</td>
              </tr>
              <tr style="border-top:1px solid #ecedee;text-align:left;;">
                <th>Total amount paid
                </th>
                <td><strong>£${withDiscount.discountedPrice}</strong></td>
              </tr>
            `
              : `<tr style="border-top:1px solid #ecedee;text-align:left;">
              <th>Total amount</th>
              <td><strong>£${price + shippingCost}</strong></td>
            </tr>`
          }
        </mj-table>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>Client info:</mj-text>
         <mj-table>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Name</th>
            <td>${first_name} ${last_name}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Email</th>
            <td>${email}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Phone</th>
            <td>${phone || 'Not provided'}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Address1</th>
            <td>${address1}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Address2</th>
            <td>${address2 || 'Not provided'}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">City</th>
            <td>${city}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">ZIP / Postal Code</th>
            <td>${postal_code}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Country</th>
            <td>${full_country_name}</td>
          </tr>
          </mj-table>
          ${additional_info &&
            `
          <mj-text>Additional order information:</mj-text>
          ${additional_info
            .split('\n')
            .map(
              p => `
          <mj-text>${p}</mj-text>
        `
            )
            .join(' ')}
          `}
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="0">
      <mj-column>
        <mj-divider padding-bottom="0" />
      </mj-column>
    </mj-section>
    <mj-section padding-top="0">
      <mj-column>
        <mj-text align="center">
          <a href="https://www.dovilejewellery.com/" target="_blank" style="color: #bdbdbd; font-size: 10px; text-decoration: none;">dovilejewellery</a>
          <a href="https://www.instagram.com/dovilejewellery/" target="_blank" style="color: #bdbdbd; font-size: 10px; text-decoration: none; padding: 0 20px">instagram</a>
          <a href="https://www.facebook.com/artdovile/" target="_blank" style="color: #bdbdbd; font-size: 10px; text-decoration: none;">facebook</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
    options
  );

  return htmlOutput.html;
};
