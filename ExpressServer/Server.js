//---dependecies---
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(cors());
// app.use(express.static('./public'));
const PORT = process.env.PORT || 5000

//---connnecting pool---
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
pool.connect();


//---routes---
app.get('/api', (req, res) => {
    res.send('Hello World')
});

//---reading all task---
app.get('/api/task', (req, res) => {
    pool.query('SELECT * FROM task ORDER BY id').then((result) => {
        res.send(result.rows)
    })
})

//---reading a singular task---
app.get('/api/task/:id', (req, res) => {
    pool.query(`SELECT * FROM task WHERE id=${req.params.id}`).then((result) => {
        res.send(result.rows)
    })
})

//---creating a new task---
app.post('/api/task', (req, res) => {
    console.log('route hitting')
    let taskName = req.body.name
    let taskPriority = req.body.priority
    console.log(taskName, taskPriority)
    pool.query(`INSERT INTO task (name, priority) VALUES ('${taskName}', '${taskPriority}') RETURNING *;`).then((result) =>
        {res.send(result.rows)})
        
})

//---updating a task---
app.patch('/api/task/:id', (req, res) => {
    let name = req.body.name
    let priority = req.body.priority
    let completed = req.body.completed
    pool.query(`UPDATE task SET name = COALESCE($1, name), priority = COALESCE($2, priority), completed = COALESCE($3, completed) WHERE id = $4 RETURNING *`, [name, priority, completed, req.params.id]).then((result) => {
        if (result.rows.length == 0) {
            res.status(400).send('task id not found')
        } else {
            res.send(result.rows);
        }
    })
})

app.delete('/api/task/:id', (req,res)=>{
    pool.query(`DELETE FROM task WHERE id = ${req.params.id}`).then((result)=>{
        res.send(result.rows)
    })
})




//---setting port listener---
app.listen(PORT, (error) => {
    if (error) {
        console.error('error')
    } else {
        console.log(`server running at ${PORT}`)
    }
})