const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const { createStudentColl } = require('../models/student.model')
const { database, client } = require('../models/db')
const { resolve } = require('path')

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    })
})

router.post('/', (req, res) => {
    if(req.body._id == '') {
        insertRecord(req, res)
    }else {
        updateRecord(req, res)
    }
})

async function insertRecord (req, res) {
    try{
        await createStudentColl()
        const data = req.body
        await database.collection('students').insertOne(data)
        res.redirect('/student/list')
    }catch(err) {
           console.error(`Error during insert: ${err}`) 
    }finally {
        await client.close
    }
}

async function updateRecord(req, res) {
    try{
        await database.collection('students').findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
        res.redirect('student/list')
    }catch(err) {
        console.error(`Error during update: ${err}`)
    }finally {
        client.close()
    }
}

router.get('/list', async (req, res) => {
    try {
        await database.collection('students').find((docs))
        res.render('students/list', {
            list: docs
        })
    }catch(err) {
        console.error(`Error in retrival: ${err}`)
    }finally{
        client.close()
    }
})

router.get('/:id', async (req, res) => {
    try{
        const doc = await database.collection('students').findOne({_id: req.params.id})
        res.render('/student/addOrEdit', {
            viewTitle: 'Update Student', 
            student: doc
        })
        console.log(doc)
    }catch(err) {
        console.error(`Error in retrieval: ${err}`)
    }finally {
        client.close()
    }
})

router.get('delete/:id', async (req, res) => {
    try{
        await database.collection('students').deleteOne({_id: req.params.id})
        res.redirect('/student/list')
    }catch(err) {
        console.error(`Error in deletion: ${err}`)
    }finally {
        client.close()
    }
})