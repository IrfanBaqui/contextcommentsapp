'use strict';

angular.module('contextcommentsApp')
  .controller('CommentBoxCtrl', function ($scope, $http, $stateParams, Comment, Auth, User) {
    
    $scope.user = Auth.getCurrentUser();

    // set up initial synchronoization for existing comment boxes
    console.log('User: ', Auth.getCurrentUser(), Auth.isLoggedIn());

    // $scope.boxes = Comment.comments;
    $scope.boxes = [{ commentedText: 'Overall comments', entries: [] }];
    console.log($scope.boxes);

    Comment.initialSync($scope.boxes);
    // Comment.syncComments($scope.boxes);

    $scope.addCommentEntry = function (index) {
      console.log('Entering addCommentEntry function', $scope.boxes[index].newCommentText);
      // $scope.boxes[index].newCommentText is not pulling the appropriate new comment entries
      if (Auth.isLoggedIn()) {
        if ($scope.boxes[index].newCommentText !== '') {
          // Auth.getCurrentUser.
          var entry = {
            username: $scope.user.name, 
            pictureId: 'http://graph.facebook.com/' + $scope.user.facebook.id + '/picture', 
            comment: $scope.boxes[index].newCommentText, 
            updatedAt: new Date().toString()
          };
          $scope.boxes[index].entries.push(entry);
          $scope.boxes[index].newCommentText = '';
          console.log('Object Synced to DB', $scope.boxes);
          Comment.syncComments($scope.boxes);
        }
      } else {
        console.err('You must be logged in to enter a comment');
      }
    }
  });
