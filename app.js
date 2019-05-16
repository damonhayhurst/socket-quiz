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
    {link: '/videos', name:'Videos'}
]

const lessonRouter = require('./routes/lessonRoutes.js')(nav);
const videoRouter = require('./routes/videoRoutes.js')(nav);

app.use('/lessons', lessonRouter);
app.use('/videos', videoRouter);
