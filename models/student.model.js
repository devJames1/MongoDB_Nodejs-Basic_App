//This is the operations for students database

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

async function findAll(req, res) {
  withDB(async (db) => {
    const studentDocList = await db.collection('students').find({}).toArray();
    res.render('./student/list', {
      list: studentDocList,
    });
  }, res);
}

async function findOne(req, res) {
  withDB(async (db) => {
    const doc = await db
      .collection('students')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.render('./student/addOrEdit', {
      viewTitle: 'Update Student',
      student: doc,
    });
  }, res);
}

async function deleteOne(req, res) {
  withDB(async (db) => {
    await db
      .collection('students')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    const studentDocList = await db.collection('students').find({}).toArray();
    res.render('./student/list', {
      list: studentDocList,
    });
  }, res);
}

module.exports = { insertRecord, updateRecord, findAll, findOne, deleteOne };
