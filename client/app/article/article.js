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
        		template: "app/article/article.html",
        		controller: function() {}
        	}
        },
        // templateUrl: 'app/article/article.html',
      })
  });
