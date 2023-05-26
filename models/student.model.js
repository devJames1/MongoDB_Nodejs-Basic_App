const { withDB } = require('./db');
const ObjectId = require('mongodb').ObjectId;

async function insertRecord(req, res) {
  try {
    withDB(async (db) => {
      const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: Number(req.body.mobile),
        city: req.body.city,
      };
      await db.collection('students').insertOne(data);
      res.redirect('/student/list');
    }, res);
  } catch (err) {
    console.error(`Error during insert: ${err}`);
  }
}

async function updateRecord(req, res) {
  try {
    withDB(async (db) => {
      await db.collection('students').findOneAndUpdate(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            fullName: req.body.fullName,
            email: req.body.email,
            mobile: Number(req.body.mobile),
            city: req.body.city,
          },
        },
        {
          returnNewDocument: true,
        }
      );
      res.redirect('student/list');
    });
  } catch (err) {
    console.error(`Error during update: ${err}`);
  }
}

module.exports = { insertRecord, updateRecord };
