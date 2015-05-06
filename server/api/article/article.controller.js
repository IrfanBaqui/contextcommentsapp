/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /article              ->  create
 * GET     /article/:id          ->  show
 * PUT     /article/:id          ->  update
 */

'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var parse = require('./parse');

exports.create = function(req, res) {
  parse(req.body.urlParse,function(parsedSite){
    Article.create(parsedSite,function(err,article){
      if(err) { return handleError(res, err); }
      console.log(article);
      return res.json(201, article);
    });
  });
};

exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

/******************
As of now this only updates the comments property of the article document as that's the only thing that would be dynamic.
The front end would maintain a local copy of the comments Obj and sync it w/ the server using put

This test code is useful. Change someObjId to a valid Obj ID from the server

curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{"comments":[{"commentedText":"Comment Box 1","entries":[{"username":"John","comment":"Hello, World!","updatedAt":"Today"},{"username":"Jane","comment":"Hello, John!","updatedAt":"Today"}]},{"commentedText":"Comment Box 2","entries":[{"username":"John","comment":"Jane you are not the world.","updatedAt":"Today"},{"username":"Jane","comment":"How do you know?","updatedAt":"Today"}]}]}' http://localhost:9000/api/article/someObjID
*/



exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.comments = req.body.comments;
    article.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}