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
var parse = require('./parse');

// Get list of things
// exports.show = function(req, res) {
//   parse('http://www.wired.com/2015/05/stratos-credit-card-hands-on/all?viewall=true',
//     function(parsedPage){
//       res.json(200, parsedPage);
//     });
// };



exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

exports.create = function(req, res) {
  parse(req.body.urlParse,function(parsedSite){
    Article.create(parsedSite,function(err,article){
      if(err) { return handleError(res, err); }
      console.log(article);
      return res.json(201, article);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}