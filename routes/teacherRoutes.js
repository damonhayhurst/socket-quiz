const express = require('express');
const teacherRouter = express.Router();
var mongoose = require('mongoose');
var Teacher = require('../models/Teacher.js');
var debug = require('debug')('teachers');


function router(nav){
    teacherRouter.route('/')
        /*Get a video*/
        .get((req, res, next) => {
            Teacher.find(function(err, lessons) {
                if (err) return next(err);
                res.json(lessons);
            })
        })
        /* Add a new lesson*/
        .post((req, res, next) => {
            Teacher.create(req.body, function (err, post){
                if (err) return next(err);
                res.json(post);
            })
        });
    teacherRouter.route('/:id')
        .get((req, res, next) => {
            Teacher.findById(req.params.id, function(err, video) {
                if (err) return next(err);
                res.json(video);
            })
        });
    return teacherRouter;
}

module.exports = router;