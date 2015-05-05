'use strict';

var express = require('express');
var controller = require('./content.controller');

var router = express.Router();

router.get('/title1', function(req, res) {
   res.sendfile('client/assets/ContentSampleTitle.html');
 });


router.get('/body1', function(req, res) {
   res.sendfile('client/assets/ContentSampleBody.html');
 });

// router.get('/', controller.index);
// router.get('/title/:id', controller.show);
// router.get('/body/:id', controller.show);

module.exports = router;