# Contemporary jewellery artist's portfolio and shop.

[![Known Vulnerabilities](https://snyk.io/test/github/g1st/do-next/badge.svg?targetFile=package.json)](https://snyk.io/test/github/g1st/do-next?targetFile=package.json)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#contributing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## do-next is a full stack MERN e-commerce app.

[dovilejewellery.com](https://dovilejewellery.com)

## Main features

- Real payments with stripe.
- Instant emails with order details for client and owner after successful purchase.
- Subscription to newsletter.
- Image processing and resizing on upload with [sharp](https://github.com/lovell/sharp).
- admin can:

  - add, edit, delete items or whole collections.
  - change item's availabilities and producing times for _made to order_ items.
  - change front image for item gallery.
  - sort gallery items on a grid for desired looks.

## To run locally

You can download this repository or just navigate to your preferred directory in terminal and follow steps below.

```
git clone https://github.com/g1st/do-next.git
cd do-next
npm install
```

Now to smoothly start the app you'll need to:

- install mongodb (if you haven't already) and run mongodb shell locally OR create free cluster at [mongodb.com](https://www.mongodb.com/)
- get credentials of any free smtp mail API providers like [mailchimp](https://mailchimp.com) or [sendgrid](https://sendgrid.com)
- get private and public stripe keys by setting up a [stripe](https://stripe.com) account

Then populate .env file with yours.

### .env file contains

```
MONGO_URL=
MAIL_API_PASS=
MAIL_API_USER=
MAIL_HOST=
MAIL_PORT=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
EMAIL=your@email
```

to run in dev

```
npm run dev
```

to run in production mode

```
npm run build
npm start
```

> Note that app use external authentication server for admin's logins. You would need to run [this](https://github.com/g1st/express-server-jwt) server or use your own in order to login as admin. Server address for development is `http://localhost:3030` and can be changed in `config.js`.

## Built With

- [React](https://github.com/facebook/react)
- [Next.js](https://github.com/zeit/next.js/)
- [Redux](https://github.com/reduxjs/redux)
- [material-ui](https://github.com/mui-org/material-ui)
- [Express](https://github.com/expressjs/express)
- [MongoDB](https://github.com/mongodb/mongo)
- [Node.js](https://github.com/nodejs/node)

## Contributing

Contributions are welcome.

- Fork the project.
- Create your feature branch (git checkout -b feature/amazing-feature).
- Commit your changes (git commit -m 'Add some amazing feature').
- Push to the branch (git push origin feature/amazing-feature).
- Open a pull request.

## Contact

- Gintaras Stankus - gintstan@gmail.com

## License

- [MIT](https://github.com/g1st/do-next/blob/development/LICENSE.md)

## Acknowledgments

- [Dovile Kondrasovaite](https://dovilejewellery.com/about)
- [nikrb](https://github.com/nikrb)
- [chingu](https://chingu.io/)
- [fcc](https://www.freecodecamp.org/)
- Red Pandas
- BC Zalgiris
- Friends
- Family
