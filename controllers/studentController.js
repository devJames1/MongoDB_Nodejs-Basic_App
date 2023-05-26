const conn = require('../index');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const { resolve } = require('path');
const { insertRecord, updateRecord } = require('../models/student.model');

const { withDB } = require('../models/db');

router.get('/', (req, res) => {
  res.render('student/addOrEdit', {
    viewTitle: 'Insert Student',
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

router.get('/list', (req, res) => {
  try {
    withDB(async (db) => {
      const studentDocList = await db.collection('students').find({}).toArray();
      res.render('./student/list', {
        list: studentDocList,
      });
    }, res);
  } catch (err) {
    console.error(`Error in retrival: ${err}`);
  }
});

router.get('/:id', (req, res) => {
  try {
    withDB(async (db) => {
      const doc = await db
        .collection('students')
        .findOne({ _id: new ObjectId(req.params.id) });
      res.render('./student/addOrEdit', {
        viewTitle: 'Update Student',
        student: doc,
      });
    }, res);
  } catch (err) {
    console.error(`Error in retrieval: ${err}`);
  }
});

router.get('/delete/:id', (req, res) => {
  try {
    withDB(async (db) => {
      await db
        .collection('students')
        .deleteOne({ _id: new ObjectId(req.params.id) });
      res.redirect('/student/list');
    }, res);
  } catch (err) {
    console.error(`Error in deletion: ${err}`);
  }
});

module.exports = router;
