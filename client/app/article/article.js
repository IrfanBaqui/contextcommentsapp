angular.module('contextcommentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article', {
        url: '/article',
        views: {

	        '':{

	        	templateUrl: 'app/article/article.html',
        		controller: function() {}
	    },

        	"content@article": { 
        		template: "app/article/article.html",
        		controller: function() {}
        },
        	"comment@article": { 
        		templateUrl: "app/article/comment/comment.html",
        		controller: 'CommentBoxCtrl'
        	}
        },
        // templateUrl: 'app/article/article.html',
      })
  });
