import express from 'express'

import dotenv from 'dotenv'
dotenv.config()
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

const app = express()
app.use('/',router)

import connection from './Database/db.js'
connection(USERNAME,PASSWORD)

import router from './Routes/route.js'

const PORT  = 8000

app.listen(PORT, ( ) => 
    console.log(`Server running on PORT ${PORT} ✅`)
)