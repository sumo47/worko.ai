const express = require('express')
const mongodb = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()
const MONGODB_STRING = process.env.MONGODB_STRING

app.get('/', (req, res) => {
    res.send('Api working fine! ')
})

mongodb.connect(MONGODB_STRING).then(() => console.log("Mongodb connected")).catch(error => console.log(error))

app.listen(process.env.port || 4000, () => {
    console.log(`Server is running on port: ${process.env.port || 4000} `)
})