//This is for controlling student routes and requests from client and model on the route

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const {
  insertRecord,
  updateRecord,
  findAll,
  findOne,
  deleteOne,
} = require('../models/student.model');

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
    findAll(req, res);
  } catch (err) {
    console.error(`Error in retrival: ${err}`);
  }
});

router.get('/:id', (req, res) => {
  try {
    findOne(req, res);
  } catch (err) {
    console.error(`Error in retrieval: ${err}`);
  }
});

router.get('/delete/:id', (req, res) => {
  try {
    deleteOne(req, res);
  } catch (err) {
    console.error(`Error in deletion: ${err}`);
  }
});

module.exports = router;
