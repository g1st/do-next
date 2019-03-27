require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const { PORT, MONGODB_URL } = process.env;

const app = express();
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true });

app.use(morgan('combined'));
app.use(cors());
app.enable('trust proxy');
app.use(bodyParser.json({ type: '*/*' }));

router(app);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
