'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContentSchema = new Schema({
  title: String,
  body: String
});

module.exports = mongoose.model('Content', ContentSchema);