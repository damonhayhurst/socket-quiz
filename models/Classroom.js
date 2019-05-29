var mongoose = require('mongoose'), Schema = mongoose.Schema;

var classroomSchema = new Schema({
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }
})

module.exports = mongoose.model('Classroom', classroomSchema);