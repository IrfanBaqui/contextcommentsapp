'use strict';

angular.module('contextcommentsApp')
  .controller('ContentContrl', function ($scope, $http) {

    // Use the User $resource to fetch all users
    $scope.title = '';
    $scope.body = '';
    $http.get('/api/article/:1').
      success(function(data, status, headers, config) {
        $scope.title=data.title;
        $scope.body=data.body;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });
  });
