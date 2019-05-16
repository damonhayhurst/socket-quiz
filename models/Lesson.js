var mongoose = require('mongoose'), Schema = mongoose.Schema;
var questionSchema = require('./Question.js');

var lessonSchema = new Schema({
    questions: [questionSchema],
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
})

module.exports = mongoose.model('Lesson', lessonSchema);