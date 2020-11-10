/* eslint-disable camelcase */
const mjml2html = require('mjml');
const { amountInPounds } = require('../../util/helpers');

module.exports = function emailForClient(data, orderInfo) {
  const {
    shipping: {
      address: { city, country, line1, line2, postal_code },
      name,
    },
    amount_subtotal,
    amount_total,
    total_details: { amount_discount },
  } = orderInfo;

  const options = {};

  const htmlOutput = mjml2html(
    `
  <mjml lang="en">
  <mj-head>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
    <mj-title>Purchase @dovileko.com</mj-title>
    <mj-preview>Purchase @dovileko.com</mj-preview>
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
        <mj-image src="https://www.dovileko.com/images/terms-conditions.JPG" alt="Dovile Ko FLOW brooch" />
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>
          Hello ${name.split(' ')[0]},
        </mj-text>
        <mj-text>
          THANK YOU for your purchase, this e-mail confirms your order.
        </mj-text>
        <mj-text>
          I will contact you when the order will be shipped providing you with a tracking number.
        </mj-text>
        <mj-text font-family="Roboto">
          PLEASE NOTE, that <i>made to order</i> items producing times are indicated at each piece's description. Producing times and delivery options for commissions are discussed individually by e-mail.
        </mj-text>
        <mj-text>
          Delivery times will vary but usually, it is 1-3 days for UK, 3-7 days for Europe and 5-10 days worldwide. Delivery times may be extended during particularly busy periods such as Christmas.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>Your order:</mj-text>
         <mj-table>
          ${data
            .map(
              (item) => `
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
            <th style="font-weight: normal">Amount</th>
            <td>£${amountInPounds(amount_subtotal)}</td>
          </tr>
          <tr style="text-align:left;">
            <th style="font-weight: normal">Shipping</th>
            <td>Free</td>
          </tr>
          ${
            amount_discount > 0
              ? `
              <tr style="text-align:left;">
                <th style="font-weight: normal">Amount before discount
                </th>
                <td>£${amountInPounds(amount_subtotal)}</td>
              </tr>
              <tr style="text-align:left;">
                <th style="font-weight: normal">Discount
                </th>
                <td>-£${amountInPounds(amount_discount)}</td>
              </tr>
              <tr style="border-top:1px solid #ecedee;text-align:left;;">
                <th>Total amount paid
                </th>
                <td><strong>£${amountInPounds(amount_total)}</strong></td>
              </tr>
            `
              : `<tr style="border-top:1px solid #ecedee;text-align:left;">
              <th>Total amount</th>
              <td><strong>£${amountInPounds(amount_total)}</strong></td>
            </tr>`
          }
        </mj-table>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>Shipping address:</mj-text>
        <mj-text padding-bottom="0" padding-top="0">${line1}</mj-text>
        ${
          line2
            ? `<mj-text padding-bottom="0" padding-top="0">${line2}</mj-text>`
            : ''
        }
        <mj-text padding-bottom="0" padding-top="0">${city}</mj-text>
        <mj-text padding-bottom="0" padding-top="0">${postal_code}</mj-text>
        <mj-text padding-bottom="0" padding-top="0">${country}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>
          I strongly recommend you to read my jewellery <a href="https://www.dovileko.com/care-guide" target="_blank" style="color: #212121; text-decoration: underline;">care guide</a>.
        </mj-text>
        <mj-text>
          Please do not hesitate to contact me, if you have any questions.
        </mj-text>
        <mj-spacer height="30px" />
        <mj-text>
          Many thanks,<br />
          Dovile
        </mj-text>
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
          <a href="https://www.dovileko.com/" target="_blank" style="color: #bdbdbd; font-size: 10px; text-decoration: none;">Dovile Ko</a>
          <a href="https://www.instagram.com/dovilekojewellery/" target="_blank" style="color: #bdbdbd; font-size: 10px; text-decoration: none; padding: 0 20px">instagram</a>
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
