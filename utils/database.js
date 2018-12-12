const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb atlas keys here'
  )
.then(client => {
  console.log('Connected dude!');
  _db = client.db();
  callback();
})
.catch(err => {
  console.log(err);
  throw err;
});
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found dude!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

