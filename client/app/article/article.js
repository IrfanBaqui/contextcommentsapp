angular.module('contextcommentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article', {
        url: '/article',
        templateUrl: 'app/article/article.html',
        controller: function() {}
      })
      .state('article.content', {
        url: '/content',
        templateUrl: 'app/article/content.html',
        controller: function() {}
      })
      .state('article.comment', {
        url: '/comment',
        templateUrl: 'app/article/comment.html',
        controller: function() {}
      })
  });