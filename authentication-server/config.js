require('dotenv').config();

const { MONGODB_URL, PORT, SECRET } = process.env;

module.exports = {
  db: MONGODB_URL,
  port: PORT,
  secret: SECRET
};
