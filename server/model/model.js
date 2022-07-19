//skema apo modeli i mongoDB - pra krijimi i databazes varesisht nevojes tone

const mongoose = require('mongoose');

var schema = new mongoose.Schema({ //krijimi indtsnces mongose.Schema
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;