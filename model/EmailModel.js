const mongoose = require('mongoose')


const EmailSchema = mongoose.Schema({
    email:{
        type:String,
        require:true
    }
})



const emaiSchema= mongoose.model('Email',EmailSchema)
module.exports = emaiSchema