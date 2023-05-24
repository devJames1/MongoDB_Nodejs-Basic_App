// This wherevwe do our instuctions for student model
const { MongoClient } = require('mongodb')
const {client} = require('../models/db')

const StudentSchema = {
 validator: {
    $jsonSchema: {
        bsonType: 'object',
        tittle: 'Student Object Validation',
        required: ['fullName', 'email', 'mobile', 'city'],
        properties: {
            fullName: {
                bsonType: 'string',
                description: "'fullName' must be a string and is required"
            },
            email: {
                bsonType: 'string',
                description: "'email' must be a string and is required"
            },
            mobile: {
                bsonType: 'number',
                description: "'mobile' must be number and is required"
            },
            city: {
                bsonType: 'string',
                description: "'city' must be a string and is required"
            },
        }
    }
 }
}

const createStudentColl = async () => {
    
    try { 
        await client.db('StudentsDB').createCollection('students', StudentSchema)
    }catch(err) {
        throw err
    }

}


module.exports = { StudentSchema, createStudentColl}