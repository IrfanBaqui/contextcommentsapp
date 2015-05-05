'use strict';

angular.module('contextcommentsApp')
  .controller('MainCtrl', function ($scope, $http, $location, socket) {
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/article/', { urlParse: $scope.newThing })
      .success(function(data){
        // console.log('CONSOLE LOG:',data._id);
        $location.path('/article'+data._id);
      });
      $scope.newThing = '';
    };

  });
