require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');

const Work = require('../../api/models/works');
const data = require('./data');

const { MONGODB_URL } = process.env;

const seedDB = () => {
  console.log(`hints:
  npm run db:populate [number] => double, triple, quadruple etc. your initial dataset
  npm run db:dropWorks => drop works collection
  npm run db:dropAll => drop all database (drops clients, orders, users, works collections)
  `);

  const argument = process.argv[2];

  if (argument === 'drop') {
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
    return mongoose.connection.dropDatabase(error => {
      console.log(error);
      console.log(`database dropped`);
      process.exit(0);
    });
  }

  const multiplier = parseInt(argument || 1);

  let worksData = [];
  for (let i = 0; i < multiplier; i += 1) {
    worksData = worksData.concat(data);
  }

  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
      console.log('db connected');
    })
    .then(async () => {
      if (argument && argument === 'dropworks') {
        await Work.collection.drop();
        console.log('collection dropped');
        mongoose.disconnect();
      } else {
        worksData.forEach(async (item, index) => {
          const work = new Work(item);

          work.save().then(() => {
            if (index + 1 === worksData.length) {
              console.log(`${worksData.length} items added`);
              mongoose.disconnect();
            }
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = seedDB();
