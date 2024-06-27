const express = require('express')
const mongodb = require('mongoose')
const  route  = require('./routes/route')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const MONGODB_STRING = process.env.MONGODB_STRING

app.get('/', (req, res) => {
    res.send('Api working fine! ')
})
// app.get('/hi', (req,res)=>{
//     res.send("Hello")
// })
app.use('/worko',route)

mongodb.connect(MONGODB_STRING).then(() => console.log("Mongodb connected")).catch(error => console.log(error))

app.listen(process.env.port || 4000, () => {
    console.log(`Server is running on port: ${process.env.port || 4000} `)
})