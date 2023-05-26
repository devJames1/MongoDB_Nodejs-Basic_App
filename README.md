# MongoDB Node.js

This repository provides a basic setup and examples for using MongoDB with Node.js. It demonstrates how to connect to a MongoDB database, perform CRUD operations, and handle data using Node.js and the MongoDB Node.js driver.

## Prerequisites

Before getting started, ensure that you have the following installed:

- Node.js (v10 or above)
- MongoDB

## Installation

1. Clone this repository to your local machine:
   `git clone <repository_url>`

2. Navigate to the project directory:
   `cd MongoDB_Nodejs-Basic_App`
3. Instll the dependencies:
   `npm install`

## Configuration

By default, the application assumes MongoDB is running on localhost with the default port 27017. Modify these settings according to your MongoDB configuration.

## Usage

1. Start the application:
   `node index.js`

2. The application will connect to the MongoDB database using the provided configuration.

3. Explore the code in `index.js` to understand the basic CRUD operations available.

## Examples

Here are some example operations you can perform with the provided code:

### Connecting to MongoDB

```
const { MongoClient } = require('mongodb');
//MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/StudentsDB';

const withDB = async (operations, response) => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('StudentsDB');

    //Callback function to run any operation on db instance
    await operations(db);
    client.close();
  } catch (err) {
    console.error(`Error with database operations: ${err}`);
  }
};

//Export db instance
module.exports = { withDB };

```

### Inserting a Document

```
// Insert a document
const insertResult = await db.collection('users').insertOne({
  name: 'John Doe',
  email: 'johndoe@example.com',
});
console.log('Inserted ID:', insertResult.insertedId);

```

### Querying Documents

```
// Find all documents
const allUsers = await db.collection('users').find().toArray();
console.log('All Users:', allUsers);

// Find a document by ID
const user = await db.collection('users').findOne({ _id: ObjectId('your_user_id') });
console.log('User:', user);

```

### Updating a Document

```
// Update a document
const updateResult = await db.collection('users').updateOne(
  { _id: ObjectId('your_user_id') },
  { $set: { name: 'Updated Name' } }
);
console.log('Modified Count:', updateResult.modifiedCount);

```

### Deleting a Document

```
// Delete a document
const deleteResult = await db.collection('users').deleteOne({ _id: ObjectId('your_user_id') });
console.log('Deleted Count:', deleteResult.deletedCount);

```

## License

This project is licensed under the MIT License.
