const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["Active", "Inactive"]
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = todoSchema;