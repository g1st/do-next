require('dotenv').config();

const { MONGODB_PASS, PORT, SECRET } = process.env;

module.exports = {
  db: `mongodb+srv://jewellery:${MONGODB_PASS}@cluster0-kvzie.mongodb.net/dovile?retryWrites=true`,
  port: PORT,
  secret: SECRET
};
