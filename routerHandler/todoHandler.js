const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema")
const Todo = new mongoose.model("Todo",todoSchema)
const authGuard = require('../middlewares/authGuard');

const route = express.Router()

//get all todos
route.get('/' , authGuard , async (req,res) => {
    try {
       const data =  await Todo.find( {status: "Active"}).select({_id:0,date:0}).limit(2)
       res.status(200).json({
            result: data,
            message: "Todo get Successfull!"
        })
    } catch (error) {
        res.status(500).json({
            error: "Server Side Error"
        })
    }
})

//get a todo by id
route.get('/:id' , async (req,res) => {
    try {
       const data =  await Todo.find( {_id: req.params.id})
       res.status(200).json({
            result: data,
            message: "Todo Added Successfull!"
        })
    } catch (error) {
        res.status(500).json({
            error: "Server Side Error"
        })
    }

})

//post a todo
route.post('/' , async (req,res) => {

    const newTodo = new Todo(req.body);

    await newTodo.save( (err) => {
        if(err){
            res.status(500).json({
                error: "There was server site error"
            })
        } else{
            res.status(200).json({
                message: "Data Added successfull"
            })
        }
    });
})

//post all todos
route.post('/all' , async (req,res) => {
    
    await Todo.insertMany(req.body , (err) => {
        if (err) {
            res.status(500).json({
                error: "Server side error"
            })
        } else{
            res.status(200).json({
                message: "Data Insert Successfully!"
            })
        }
    })
})

//put a todo
// route.put('/:id' , async (req,res) => {
    
//     await Todo.updateOne({
//         _id: req.params.id
//     },{
//         $set:{
//             status : "Active"
//         }
//     } , (err) => {
//         if(err){
//             res.status(500).json({
//                 error : "There was server side error"
//             })
//         } else{
//             res.status(200).json({
//                 message: "Data was updated successfull"
//             })
//         }
//     }).clone();
// })

//update and get todo
route.put('/:id' , async (req,res) => {
    
    const result = await Todo.findByIdAndUpdate(
        { _id : req.params.id},
        {
            $set : {
                status : "Active"
            }
        },
        {
            new: true,
            useFindAndModify: false,
        },
        (error) => {
            if(error){
                res.status(500).json({
                    error: "server side error"
                })
            } else{
                res.status(200).json({
                    message: "Data update succesfull"
                })
            }
        }
    ).clone();

    console.log(result);

})

//delete a todo
route.delete('/:id' , async (req,res) => {
     try {
       const data =  await Todo.deleteOne( {_id: req.params.id})
       res.status(200).json({
            result: data,
            message: "Todo Deleted Successfull!"
        })
    } catch (error) {
        res.status(500).json({
            error: "Server Side Error"
        })
    }

})

module.exports = route