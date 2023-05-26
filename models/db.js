//Here we put our instructions for our database connection
const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/StudentsDB';

const withDB = async (operations, response) => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('StudentsDB');
    await operations(db);
    client.close();
  } catch (err) {
    console.error(`Error with database operations: ${err}`);
  }
};

module.exports = { withDB };
