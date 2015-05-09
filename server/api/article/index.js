'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.get('/:id', controller.show);

router.post('/', controller.create);

//put route for comments

router.put('/:id', controller.update);

module.exports = router;
