'use strict';

angular.module('contextcommentsApp')
  .controller('ContentContrl', function ($scope, $http) {

    // Use the User $resource to fetch all users
    $scope.title = '';
    $scope.body = '';
    $http.get('/api/content/title1').
      success(function(data, status, headers, config) {
        $scope.title+=data;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    $http.get('/api/content/body1').
      success(function(data, status, headers, config) {
        $scope.body+=data;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

  });
