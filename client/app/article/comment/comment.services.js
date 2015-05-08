// angular.module('contextcommentsApp')
//   // CommentBox factory to add and return new comment boxes
//   .factory('Comment', function ($http, $stateParams) {
    
//     // response data takes in an article id and returns the appropriate comment boxes
//     var getCommentBoxes = function () {
//       return $http({
//         method: 'GET',
//         url: '/api/article/' + $stateParams.articleId
//       })
//       .then(function (response)) {
//         return response.data;
//       });
//     };

//     // creates a new comment box and appends it to comments in article
//     var addCommentBox = function (commentBoxId) {
//       return $http({
//         method: 'PUT',
//         url: '/api/article/' + $stateParams.articleId,
//         data: commentBoxId
//       });
//     };

//     // CommentEntry factory to add and return comment entries
    
//     // response data takes in an array of comment entry objects
//     var getCommentEntries = function (commentBoxId) {
//       return $http({
//         method: 'GET',
//         url: '/api/article/' + $stateParams.articleId
//       })
//       .then(function (response)) {
//         return response.data;
//       });
//     };
//     // comment entry takes in an object for a comment entry
//     var addCommentEntry = function (entry) {
//       return $http({
//         method: 'POST',
//         url: '/api/article/' + $stateParams.articleId,
//         data: entry
//       });
//     };

//     return {
//       getCommentBoxes: getCommentBoxes,
//       addCommentBox: addCommentBox,
//       getCommentEntries: getCommentEntries,
//       addCommentEntry: addCommentEntry
//     };

//   });


