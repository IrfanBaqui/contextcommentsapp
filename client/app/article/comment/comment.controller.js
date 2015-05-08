'use strict';

angular.module('contextcommentsApp')
  .controller('CommentBoxCtrl', function ($scope, $http, $stateParams, Comment) {
    $scope.boxes = [
      {
        commentedText: 'Comment Box 1', 
        entries: [
          {username: 'John', comment: 'Hello, World!', updatedAt: 'Today'}, 
          {username: 'Jane', comment: 'Hello, John!', updatedAt: 'Today'}
        ]
      },
      {
        commentedText: 'Comment Box 2', 
        entries: [
          {username: 'John', comment: 'Jane you are not the world.', updatedAt: 'Today'}, 
          {username: 'Jane', comment: 'How do you know?', updatedAt: 'Today'}
        ]
      }
    ];
    console.log($stateParams.articleId);
    $http.get('/api/article/'+$stateParams.articleId).
      success(function(data, status, headers, config) {
        // commented out this for right now
        // $scope.boxes=data.comments;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });
    $scope.addCommentEntry = function () {
      // var entry = {username: username, comment: $scope.commentText, updatedAt: date};
      // Comment.addCommentEntry(entry)
      // then refresh or add to current page dynamically
    }
  });
