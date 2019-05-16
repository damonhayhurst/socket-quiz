const express = require('express');
const lessonRouter = express.Router();
var mongoose = require('mongoose');
var Lesson = require('../models/Lesson.js');
var debug = require('debug')('lessons');


function router(nav){
    lessonRouter.route('/')
        .get((req, res, next) => {
            Lesson.find(function(err, lessons) {
                if (err) return next(err);
                res.json(lessons);
            })
        })
        .post((req, res, next) => {
            debug(req.body);
            Lesson.create(req.body, function (err, post){
                if (err) return next(err);
                res.json(post);
            })
        });
    return lessonRouter;
}

module.exports = router;