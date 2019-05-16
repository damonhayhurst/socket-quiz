const express = require('express');
const videoRouter = express.Router();
var mongoose = require('mongoose');
var Video = require('../models/Video.js');
var debug = require('debug')('videos');


function router(nav){
    videoRouter.route('/')
        /*Get a video*/
        .get((req, res, next) => {
            Video.find(function(err, lessons) {
                if (err) return next(err);
                res.json(lessons);
            })
        })
        /* Add a new lesson*/
        .post((req, res, next) => {
            Video.create(req.body, function (err, post){
                if (err) return next(err);
                res.json(post);
            })
        });
    videoRouter.route('/:id')
        .get((req, res, next) => {
            Video.findById(req.params.id, function(err, video) {
                if (err) return next(err);
                res.json(video);
            })
        });
    videoRouter.route('/:id/lessons')
        .get((req, res, next) => {
            Video.findById(req.params.id).populate('lessons').exec(function (err, video) {
                if (err) return next(err);
                res.json(video)
                res.json(video.lessons)
            })
        })
    return videoRouter;
}

module.exports = router;