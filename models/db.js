//Here we put our instructions for our database

const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017/StudentsDB'

const client = new MongoClient(uri)

const connectToDatabase = async () => {
    try {
        await client.connect()
        console.log('Connection succesful')
    }catch(err) {
        console.error(`Error in connection: ${err}`)
    }
}

require('./student.model')