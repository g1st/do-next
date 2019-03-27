const jwt = require('jwt-simple');
const User = require('../models/User');
require('dotenv').config();

const { SECRET } = process.env;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, SECRET);
}

exports.signin = function(req, res) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Email and password must be provided' });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is aleready in use...' });
    }

    const user = new User({
      email,
      password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
