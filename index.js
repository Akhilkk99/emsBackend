//import env file
require('dotenv').config()


//import express
const express=require('express')

//import db
require('./db/connection')


const cors=require('cors')
const router = require('./routes/router')


//sever
const server=express()
server.use(cors())
server.use(express.json())
server.use(router)



const port=4000 || process.env.port

//export upload folder to client
server.use('/uploads',express.static('./uploads'))

server.listen(port,()=>{
    console.log(`EMS Server Started at port ${port}`);
})