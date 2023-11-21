const mongoose = require('mongoose')


const EmailSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"your name is require"],
        unique:true
    },
    email:{
        type:String,
        require:[true,"your email is require"]
    },
    message:{
        type:String,
        require:[true,"you are require to input message"],
        min: [6, 'Must be at least 6, got {VALUE}']
    }
})



const emaiSchema= mongoose.model('Email',EmailSchema)
module.exports = emaiSchema