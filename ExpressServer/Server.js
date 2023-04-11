//---dependecies---
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static('../public'));
const PORT = process.env.PORT || 5000

//---connnecting pool---
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.CONNECTION_URL})
pool.connect;


//---routes---
app.get('/', (req, res) =>{
    res.send('Hello World')
});




//---setting port listener---
app.listen(PORT, (error) =>{
    if(error){
        console.error('error')
    }else{
        console.log(`server running at ${PORT}`)
    }
})