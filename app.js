var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/languagedoo', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err)); 

const nav = [
    {link: '/api/lessons', name:'Lessons'},
    {link: '/api/videos', name:'Videos'},
    {link: '/api/teachers', name:'Teachers'},
    {link: '/api/classrooms', name:'Classrooms'}
]

const lessonRouter = require('./routes/lessonRoutes.js')(nav);
const videoRouter = require('./routes/videoRoutes.js')(nav);
const teacherRouter = require('./routes/teacherRoutes.js')(nav);
const classroomRouter = require('./routes/classroomRoutes.js')(nav);


app.use('/api/lessons', lessonRouter);
app.use('/api/videos', videoRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/classrooms', classroomRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;