var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.get('/', function(req, res) {
    res.send(`Hello world`);
})

app.listen(3000, function(req, res){
    debug(`listening on port 3000`);
})

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/languagedoo', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err)); 

const nav = [
    {link: '/lessons', name:'Lessons'},
    {link: '/videos', name:'Videos'},
    {link: '/teachers', name:'Teachers'}
]

const lessonRouter = require('./routes/lessonRoutes.js')(nav);
const videoRouter = require('./routes/videoRoutes.js')(nav);
const teacherRouter = require('./routes/teacherRoutes.js')(nav);


app.use('/lessons', lessonRouter);
app.use('/videos', videoRouter);
app.use('/teachers', teacherRouter);

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