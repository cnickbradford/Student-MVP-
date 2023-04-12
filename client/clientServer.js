const express = require('express');
const app = express();
const rewrite = require('express-urlrewrite')
app.use(express.json());
app.use(express.static('./public'));
const PORT = 5000 

// app.all('/api/task/:id', (req,res)=>{
//     console.log(req.url)
//     res.redirect(307,`http://localhost:3000${req.url}`)
// })

app.all('/api/*', (req,res)=>{
    console.log(req.url)
    res.redirect(307,`http://localhost:3000${req.url}`)
})



app.listen(PORT, (error) => {
    if (error) {
        console.error('error')
    } else {
        console.log(`server running at ${PORT}`)
    }
})