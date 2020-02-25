const mjml2html = require('mjml');

module.exports = function emailForContactForm(message, email, subject) {
  const options = {};

  const htmlOutput = mjml2html(
    `
  <mjml lang="en">
  <mj-head>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
    <mj-title>${subject} @dovilejewellery.com</mj-title>
    <mj-preview>${subject} @dovilejewellery.com</mj-preview>
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
        <mj-image src="https://www.dovilejewellery.com/static/images/terms-conditions.JPG" alt="Dovile Jewellery FLOW brooch" />
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>
          Hello Doviliuk!
        </mj-text>
        <mj-text>
          Someone (${email}) just contacted you through contact form.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section>
      <mj-column>
        <mj-text>Topic: ${subject}</mj-text>
        <mj-text>From: ${email}</mj-text>
        ${message
          .split('\n')
          .map(
            p => `
          <mj-text>${p}</mj-text>
        `
          )
          .join(' ')}
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
