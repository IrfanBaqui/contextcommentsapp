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
        		templateUrl: "app/article/content/content.html  ",
        		controller: 'ContentContrl'
        },
        	"comment@article": { 
        		templateUrl: "app/article/comment/comment.html",
        		controller: 'CommentBoxCtrl'
        	}
        },
        // templateUrl: 'app/article/article.html',
      })
  });
