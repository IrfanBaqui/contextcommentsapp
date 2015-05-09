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
  
  /********** Context highliting and capture **********/
    
    $scope.context = {};

    //getSafeRanges will capture a range of selection. 
    //I call it "safe" range because it will handle cross node selection too
    $scope.getSafeRanges = function(dangerous) { 
    var a = dangerous.commonAncestorContainer;

    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
      if (dangerous.startContainer != a)
        for(var i = dangerous.startContainer; i != a; i = i.parentNode)
          s.push(i);
      if (0 < s.length) for(var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
        }
        else {
            xs.setStart(s[i], dangerous.startOffset);
            xs.setEndAfter(
                (s[i].nodeType == Node.TEXT_NODE)
                ? s[i] : s[i].lastChild
            );
        }
        rs.push(xs);
      }

      // Ends -- basically the same code reversed
      var e = new Array(0), re = new Array(0);
      if (dangerous.endContainer != a)
        for(var i = dangerous.endContainer; i != a; i = i.parentNode)
          e.push(i)
      ;
      if (0 < e.length) for(var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
          xe.setStartBefore(e[i].firstChild);
          xe.setEndBefore(e[i-1]);
        }
        else {
          xe.setStartBefore(
              (e[i].nodeType == Node.TEXT_NODE)
              ? e[i] : e[i].firstChild
          );
          xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
      }

      // Middle -- the uncaptured middle
      if ((0 < s.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
      }
      else {
        return [dangerous];
      }
      // Concat
      rs.push(xm);
      var response = rs.concat(re);    

      return response;

    }

    $scope.highlightRange = function(range) {
      var newNode = document.createElement("div");
      newNode.setAttribute(
       "style",
       "background-color: green; display: inline;"
      );
      range.surroundContents(newNode);
      $scope.context.node = newNode;
      //insert post request here
    }

    $scope.highlightSelection = function() {
      var userSelection = window.getSelection().getRangeAt(0);
      var safeRanges = $scope.getSafeRanges(userSelection);
      for (var i = 0; i < safeRanges.length; i++) {
        $scope.highlightRange(safeRanges[i]);
      }
    }

/********** End Context Highlighting *********/

  });
