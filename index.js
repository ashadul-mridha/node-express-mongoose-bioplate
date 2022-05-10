const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routerHandler/todoHandler');
const userHandler = require('./routerHandler/userHandler');

//app initialize
const app = express()
app.use(express.json())

//connection database
mongoose.connect('mongodb://localhost/todos')
.then( () => console.log('connection successfull'))
.then( (err) => {
    if (err) {
        console.log(err);
    }
})

//application route
app.use('/todo', todoHandler);
app.use('/user', userHandler);


//routing
app.get('/' , (req,res) => {
    res.send('Ashadul Mridha')
})

//default error handler

const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({
        error: err
    })
}

app.use(errorHandler);

app.listen(3000 , () => {
    console.log('app listen on 3000 port');
})