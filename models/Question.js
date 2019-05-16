var mongoose = require('mongoose'), Schema = mongoose.Schema;

var questionSchema = new Schema({
    timestamp: Schema.Types.Decimal128,
    type: String,
    question: String,
    answer: String,
    choices: [String]
})

module.exports = questionSchema;