const express = require('express');
const classroomRouter = express.Router();
var mongoose = require('mongoose');
var Classroom = require('../models/Classroom.js');
var Lesson = require('../models/Lesson.js');
var debug = require('debug')('classrooms');


function router(nav){
    classroomRouter.route('/')
        /*Get a lesson*/
        .get((req, res, next) => {
            Classroom.find().exec(function(err, classrooms) {
                if (err) return next(err);
                res.json(classrooms);
            })
        })
        /* Add a new classroom*/
        .post((req, res, next) => {
            const classroom = new Classroom(req.body)

            classroom.save(function (err) {
                if (err) return next(err);

                Lesson.findById(req.body.lesson).exec(function (err, classroom) {
                    if (err) return next(err);
                })

                res.json(classroom);

            })
        });
    classroomRouter.route('/:id')
        .get((req, res, next) => {
            Classroom.findById(req.params.id).populate('lesson').exec(function (err, classroom) {
                if (err) return next(err);

                res.json(classroom);
            })
        });
    return classroomRouter;
}

module.exports = router;