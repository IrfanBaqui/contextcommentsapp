/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of things
exports.show = function(req, res) {
  var parse = require('./parse');

  var parse = require('./parse');
  parse('http://www.wired.com/2015/05/stratos-credit-card-hands-on/all?viewall=true',
    function(parsedPage){
      res.json(200, parsedPage);
    });
};

exports.create = function(req, res) {
  
  parse(req.urlParse,function(parsedSite){
    Article.create(parsedSite,function(err,article){
      if(err) { return handleError(res, err); }
      return res.json(201, article);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}