angular.module('contextcommentsApp')
  // CommentBox factory to add and return new comment boxes
  .factory('Comment', function ($http, $stateParams) {
    
    var comments = [];


    var initialSync = function() {
      return $http.get('/api/article/'+$stateParams.articleId).
      success(function(data, status, headers, config) {
        comments = data.comments;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });
    };


    // creates a new comment box and appends it to comments in article
    var syncComments = function (data) {
      // data = data || comments;
      comments = data;
      console.log('COMMENTS OBJECT (Comment.syncComments):',comments);
      return $http({
        method: 'PUT',
        url: '/api/article/' + $stateParams.articleId,
        data: data
      });
    };

    var createNewBox = function(context){
      var newBox = {commentedText:context, entries:[]};
      console.log('OUR NEW BOX:',newBox);
      comments.push(newBox);
      console.log('COMMENTS OBJECT (Comment.createNewBox):',comments);
      syncComments(comments);
    };

    return {
      syncComments: syncComments,
      initialSync: initialSync,
      createNewBox: createNewBox
    };

  });


