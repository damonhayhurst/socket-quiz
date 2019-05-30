const express = require('express');
const lessonRouter = express.Router();
var mongoose = require('mongoose');
var Lesson = require('../models/Lesson.js');
var Video = require('../models/Video.js');
var Teacher = require('../models/Teacher.js');
var debug = require('debug')('lessons');


function router(nav){
    lessonRouter.route('/')
        /*Get a lesson*/
        .get((req, res, next) => {
            Lesson.find().populate('video').populate('author').exec(function(err, lessons) {
                if (err) return next(err);
                res.json(lessons);
            })
        })
        /* Add a new lesson*/
        .post((req, res, next) => {
            const lesson = new Lesson(req.body)

            lesson.save(function (err) {
                if (err) return next(err);

                const video = Video.findOneAndUpdate({_id: req.body.video},
                    {"$push": {lessons: lesson}}, {upsert: false}, function (err, data) {
                    if (err) return next(err);
                })

                const author = Teacher.findOneAndUpdate({_id: req.body.author},
                    {"$push": {lessons: lesson}}, {upsert: false}, function (err, data) {
                    if (err) return next(err);
                })

                res.json(lesson);

            })
        });
    lessonRouter.route('/:id')
        .get((req, res, next) => {
            Lesson.findById(req.params.id).populate('video').populate('author').exec(function (err, lesson) {
                if (err) return next(err);
                
                res.json(lesson);
            })
        });
    return lessonRouter;
}

module.exports = router;