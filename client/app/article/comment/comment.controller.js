'use strict';

console.log('here');

angular.module('contextcommentsApp')
  .controller('CommentBoxCtrl', function ($scope, $http) {
    $scope.entries = [{name : 'Dave', value: 'a'},{name : 'Dave2', value: 'a2'}
    ];
  });
