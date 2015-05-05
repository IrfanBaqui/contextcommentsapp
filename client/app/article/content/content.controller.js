'use strict';

angular.module('contextcommentsApp')
  .controller('ContentContrl', function ($scope, $http , $stateParams) {

    // Use the User $resource to fetch all users
    $scope.title = '';
    $scope.body = '';
    console.log($stateParams.articleId);
    $http.get('/api/article/'+$stateParams.articleId).
      success(function(data, status, headers, config) {
        $scope.title=data.title;
        $scope.body=data.body;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });
  });
