'use strict';

angular.module('contextcommentsApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/article/', { urlParse: $scope.newThing });
      $scope.newThing = '';
    };

  });
