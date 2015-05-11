'use strict';

angular.module('contextcommentsApp')
  .controller('ContentContrl', function ($scope, $http , $stateParams, Comment) {

    console.log($scope);

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
    }

    $scope.highlightSelection = function() {
      $scope.markSelection();
      var userSelection = window.getSelection().getRangeAt(0);
      var safeRanges = $scope.getSafeRanges(userSelection);
      for (var i = 0; i < safeRanges.length; i++) {
        $scope.highlightRange(safeRanges[i]);
      }
      Comment.createNewBox(safeRanges.toString()); 
    }

/********** End Context Highlighting *********/

/********** Start Context Positioning *********/

  $scope.markSelection = function() {
    console.log('AAAAAAAAAAAAAAAA');
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";

    var markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    var selectionEl;

    // return function() {
        var sel, range;

        if (document.selection && document.selection.createRange) {
            // Clone the TextRange and collapse
            range = document.selection.createRange().duplicate();
            range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            markerEl = document.getElementById(markerId);
        } else if (window.getSelection) {
            sel = window.getSelection();

            if (sel.getRangeAt) {
                range = sel.getRangeAt(0).cloneRange();
            } else {
                // Older WebKit doesn't have getRangeAt
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== sel.isCollapsed) {
                    range.setStart(sel.focusNode, sel.focusOffset);
                    range.setEnd(sel.anchorNode, sel.anchorOffset);
                }
            }

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = document.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( document.createTextNode(markerTextChar) );
            range.insertNode(markerEl);
        }

        if (markerEl) {
            // Lazily create element to be placed next to the selection
            if (!selectionEl) {
                selectionEl = document.createElement("div");
                selectionEl.style.border = "solid darkblue 1px";
                selectionEl.style.backgroundColor = "lightgoldenrodyellow";
                selectionEl.innerHTML = "&lt;- selection";
                selectionEl.style.position = "absolute";

                document.body.appendChild(selectionEl);
            }

            // Find markerEl position http://www.quirksmode.org/js/findpos.html
        var obj = markerEl;
        var left = 0, top = 0;
        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);

        console.log("TOP: ", top);

            // Move the button into place.
            // Substitute your jQuery stuff in here
            selectionEl.style.left = left + "px";
            selectionEl.style.top = top + "px";

            markerEl.parentNode.removeChild(markerEl);
        }
    // };
};

/************* End Selection Coordinates *************/


  });
