'use strict';

angular.module('contextcommentsApp')
  .controller('CommentBoxCtrl', function ($scope, $http, $stateParams, Comment) {
    
    // set up initial synchronoization for existing comment boxes

    // $scope.boxes = Comment.comments;
    $scope.boxes = [{ commentedText: 'Overall comments', entries: [] }];
    console.log($scope.boxes);

    Comment.initialSync($scope.boxes);
    // Comment.syncComments($scope.boxes);

    $scope.addCommentEntry = function (index) {
      console.log('Entering addCommentEntry function', $scope.boxes[index].newCommentText);
      // $scope.boxes[index].newCommentText is not pulling the appropriate new comment entries

      if ($scope.boxes[index].newCommentText !== '') {
        var entry = {username: 'test user', comment: $scope.boxes[index].newCommentText, updatedAt: 'date'};
        $scope.boxes[index].entries.push(entry);
        $scope.boxes[index].newCommentText = '';
        console.log('Object Synced to DB', $scope.boxes);
        Comment.syncComments($scope.boxes);
      }
    }
  });
