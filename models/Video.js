var mongoose = require('mongoose'), Schema = mongoose.Schema;

var videoSchema = new Schema({
    url: 'String',
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
})

module.exports = mongoose.model('Video', videoSchema);