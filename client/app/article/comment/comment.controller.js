'use strict';

console.log('here');

angular.module('contextcommentsApp')
  .controller('CommentBoxCtrl', function ($scope, $http) {
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
  });
