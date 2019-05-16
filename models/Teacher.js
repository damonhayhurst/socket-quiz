var mongoose = require('mongoose'), Schema = mongoose.Schema;

var teacherSchema = new Schema({
    username: 'String',
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
})

module.exports = mongoose.model('Teacher', teacherSchema);