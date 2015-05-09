angular.module('contextcommentsApp')
  // CommentBox factory to add and return new comment boxes
  .factory('Comment', function ($http, $stateParams) {
    
    // Only need to update comments because pages are all served at once

    // creates a new comment box and appends it to comments in article
    var addCommentBox = function (commentBoxId) {
      return $http({
        method: 'PUT',
        url: '/api/article' + $stateParams.articleId,
        data: commentBoxId
      });
    };

    // comment entry takes in an object for a comment entry
    var addCommentEntry = function (entry) {
      return $http({
        method: 'POST',
        url: '/api/article' + $stateParams.articleId,
        data: entry
      });
    };

    return {
      addCommentBox: addCommentBox,
      addCommentEntry: addCommentEntry
    };

  });


