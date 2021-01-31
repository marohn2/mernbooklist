const mongoose = require('mongoose');

//schema 

const Schema = mongoose.Schema;
const BookRecordSchema = new Schema({
    pic: String,
    title: String,
    author: String,
    genre: String,
    rating: Number
})

//model

const BookRecord = mongoose.model('BookRecord',BookRecordSchema);

module.exports = BookRecord;