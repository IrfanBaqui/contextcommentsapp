var jsdom = require("jsdom");
 
module.exports = function(urlParse,callback){
jsdom.env({
    url: urlParse,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      // console.log('JQUERY LOADED:',window.jQuery);

      //Utility from Parse.js

      (function(window)
      {
         "use strict";

         window.Util = {};



         ////////////////////////////////////////////////////////////////////////////

         window.Util.getDistanceBetweenElements = function( eElement1, eElement2 )
         {
            var getPosition = function( eElement )
            {
               var oResult = { "top"  : 0,
                               "left" : 0 };

               while( eElement )
               {
                  oResult.top  += eElement.offsetTop;
                  oResult.left += eElement.offsetLeft;

                  eElement = eElement.offsetParent;
               }

               return oResult;
            };

            var oPosition1 = getPosition( eElement1 );
            var oPosition2 = getPosition( eElement2 );

            var y = oPosition1.top  - oPosition2.top;
            var x = oPosition1.left - oPosition2.left;

            return Math.sqrt( y * y + x * x );
         };



         ////////////////////////////////////////////////////////////////////////////

         window.Util.hasSubstringCaseInsensitive = function( string, substring )
         {
            var stringCopy = string.toLowerCase();
            var substringCopy = substring.toLowerCase();

            return ( stringCopy.indexOf( substringCopy ) !== -1 );
         }
      })(window);

      //Parser from parse.js

    	(function(window)
    	{
    	   "use strict";

    	   var _IGNORE_CLASS = "nbouibnonwenfofj_igore";

    	   var _ignoredTags = ["SCRIPT", "IFRAME", "STYLE", "OBJECT", "FOOTER", "NAV" ];
         var $ = window.$;

    	   ////////////////////////////////////////////////////////////////////////////
    	   // @brief   Singleton Class
    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser = function() {};   // Empty Constructor.

         // console.log(window.ArticleParser);
    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype.getArticle = function()
    	   {
    	      var $contentContainer = this._findContentContainer();

    	      this._revertModificationToExistingArticle();

    	      return { "$title"   : this._getTitle( $contentContainer ),
    	               "$content" : this._getContent( $contentContainer ) };
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._revertModificationToExistingArticle = function()
    	   {
    	      $("." + _IGNORE_CLASS).removeClass( _IGNORE_CLASS );
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._findContainerWithTheMostParagraphs = function()
    	   {
    	      var $paragraphs = $("p");
    	      var listOfParagraphContainers = [];

    	      // Find the containers of all the paragraphs, and make sure they are
    	      // unique.

    	      $paragraphs.each( function( index, eParagraph )
    	      {
    	         if( !listOfParagraphContainers.some( function( $element ) {
    	                  return $element.is( eParagraph.parentNode ); } ) )
    	         {
    	            listOfParagraphContainers.push( $(eParagraph.parentNode) );
    	         }
    	      });

    	      // Sort the containers based on the number of paragraphs they have (in
    	      // descending order.)

    	      listOfParagraphContainers.sort( function( $container1, $container2 )
    	      {
    	         return $container2.children( "p" ).length -
    	                $container1.children( "p" ).length;
    	      });

    	      // Some news sites would use the <p> elements very liberally. So we need
    	      // to make sure the article container not only has the most paragraphs,
    	      // but also has the most text.

    	      var $containerWithTheMostParagraphs = $();
    	      for( var i = 0; i < listOfParagraphContainers.length; i++ )
    	      {
    	         var $container = listOfParagraphContainers[i];
    	         if(    $containerWithTheMostParagraphs.length === 0
    	             || $container.text().length > $containerWithTheMostParagraphs.text().length * 2 )
    	         {
    	            $containerWithTheMostParagraphs = $container;
    	         }
    	      }

    	      return $containerWithTheMostParagraphs;
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._findContentContainer = function()
    	   {
    	      // Almost all the news sites use <p> for the article paragraphs. But
    	      // there are some unusual exceptions.
    	      // TODO: Find a generic way to parse this.

    	      var $contentContainer = $();

    	      var listOfUnusualContentContainerSelectors = [ ".post-body" ];
    	      listOfUnusualContentContainerSelectors.some( function( sSelector )
    	      {
    	         $contentContainer = $( sSelector );
    	         return ( $contentContainer.length > 0 );
    	      });

    	      if( $contentContainer.length === 0 )
    	      {
    	         $contentContainer = this._findContainerWithTheMostParagraphs();
    	      }

    	      if( $contentContainer.length === 0 )
    	      {
    	         // If an article is not found, then just display all the text.
    	         $contentContainer = $( "<div></div" );
    	         $contentContainer.html( document.body.innerText.replace( /\n/g, "<br/>") );
    	      }

    	      return $contentContainer;
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._shouldIgnoreElement = function( eElement )
    	   {

    	      var shouldIgnore = false;

    	      if( eElement )
    	      {
    	         var $element = $( eElement );

    	         try
    	         {
    	            shouldIgnore = (
    	                  $element.css( "float" ) === "left"
    	               || $element.css( "float" ) === "right"
    	               || $element.css( "position" ) === "absolute"
    	               || $element.hasClass( _IGNORE_CLASS )
    	               || _ignoredTags.some( function( sTagName ) { return eElement.tagName === sTagName; } ) );
    	         }
    	         catch( exception )
    	         {
    	            // jQuery will throw exception probably because it is not fully
    	            // tested in the Chrome extension environment.
    	         }
    	      }

    	      return shouldIgnore;
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._getTitle = function( $contentContainer )
    	   {
    	      var $title = $();

    	      if( $contentContainer.length > 0 )
    	      {
    	         var $originalPrimaryTitle = this._getPrimaryTitle( $contentContainer );

    	         var $primaryTitle = $originalPrimaryTitle.clone();

    	         this._sanitizeElementAndDesendants( $primaryTitle );

    	         $title = $("<div></div>");
    	         $title.append( $primaryTitle );
    	      }

    	      return $title;
    	   };


    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._getHeadingElementClosestToContainer = function( eContentContainer )
    	   {
    	      // Find the heading elment that's closest to the content container.

    	      var $title = $()

    	      var listOfHeadingElementTags = [ "h1", "h2", "h3" ];
    	      var listOfHeadingElements = [];

    	      for( var i = 0;
    	              i < listOfHeadingElementTags.length
    	           && listOfHeadingElements.length === 0;
    	           i++ )
    	      {
    	         listOfHeadingElements = $.makeArray( $( listOfHeadingElementTags[i] ) );
    	      }

    	      listOfHeadingElements.sort( function( eElement1, eElement2 )
    	      {
    	         var iDistance1 = window.Util.getDistanceBetweenElements( eElement1, eContentContainer );
    	         var iDistance2 = window.Util.getDistanceBetweenElements( eElement2, eContentContainer );

    	         return iDistance1 - iDistance2;
    	      });

    	      var eHeadingElementClosestToContent = listOfHeadingElements[0];
    	      if( eHeadingElementClosestToContent )
    	      {
    	         $title = $( eHeadingElementClosestToContent );

    	         // Prevent dupolicate titles from appearing in the content.
    	         $(eHeadingElementClosestToContent).addClass( _IGNORE_CLASS );
    	      }

    	      return $title;
    	   }



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._getPrimaryTitle = function( $contentContainer )
    	   {
    	      var $title = $();
    	      var eContentContainer = $contentContainer[0];

    	      if( eContentContainer )
    	      {
    	         // Most news sites use heading elements such h1, h2, etc., for the
    	         // article titles. But there are some unusual exceptions.
    	         // TODO: Find a generic way to parse this.

    	         var listOfUnusualPrimaryTitleSelectors = [ ".post-title" ];
    	         listOfUnusualPrimaryTitleSelectors.some( function( sSelector )
    	         {
    	            $title = $( sSelector );
    	            return ( $title.length > 0 );
    	         });

    	         if( $title.length === 0 )
    	         {
    	            $title = this._getHeadingElementClosestToContainer( eContentContainer )
    	         }

    	         // For styling purposes, make sure the title is a <h1> element.
    	         if(    $title.length > 0
    	             && $title[0].tagName !== "H1" )
    	         {
    	            var $h1 = $("<h1></h1>");
    	            $h1.html( $title.html() );
    	            $title = $h1;
    	         }
    	      }

    	      return $title;
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._getContent = function( $contentContainer )
    	   {
    	      var $result = $();

    	      if( $contentContainer.length > 0 )
    	      {
    	         // Note: clone() doesn't clone the computed style. Need to traverse
    	         //       the original container to analyze their styles.

    	         var $contentContainerClone = $contentContainer.clone();

    	         this._restoreSeparatedParagraphs( $contentContainer,
    	                                           $contentContainerClone );

    	         var listOfExistingElements = [ $contentContainer[0] ];
    	         var listOfClonedElements = [ $contentContainerClone[0] ];

    	         while( listOfClonedElements.length > 0 )
    	         {
    	            var eExistingElement = listOfExistingElements.shift();
    	            var eClonedElement = listOfClonedElements.shift();

    	            if(    eExistingElement !== $contentContainer[0]
    	                && this._shouldIgnoreElement( eExistingElement ) )
    	            {
    	               $(eClonedElement).remove();
    	            }
    	            else
    	            {
    	               var isRemoved = this._sanitizeElement( eClonedElement );
    	               if( !isRemoved )
    	               {
    	                  if( eClonedElement.childNodes.length ===
    	                      eExistingElement.childNodes.length )
    	                  {
    	                     for( var i = 0; i < eClonedElement.childNodes.length; i++ )
    	                     {
    	                        listOfExistingElements.push( eExistingElement.childNodes[i] );
    	                        listOfClonedElements.push( eClonedElement.childNodes[i] );
    	                     }
    	                  }
    	               }
    	            }
    	         }

    	         // Use appendChild() instead of $.append() to add the content instead
    	         // to prevent runtime errors.

    	         $result = $("<div></div>");
    	         $result[0].appendChild( $contentContainerClone[0] );
    	      }

    	      return $result;
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._restoreSeparatedParagraphs = function( $contentContainer,
    	                                                                   $contentContainerClone )
    	   {
    	      // Handle the special cases where the article content is split into
    	      // two separate containers.

    	      var isSplitIntoTwoContainers = false;
    	      var listOfContainers = [ $contentContainer, $contentContainer.parent() ];

    	      for( var i = 0; i < listOfContainers.length && !isSplitIntoTwoContainers; i++ )
    	      {
    	         var $container = listOfContainers[i];
    	         var sClassAttr = $container.attr( "class" );
    	         var listOfClassNames = sClassAttr ? sClassAttr.split( " " ) : [];

    	         for( var j = 0; j < listOfClassNames.length && !isSplitIntoTwoContainers; j++ )
    	         {
    	            var sClassName = listOfClassNames[j];

    	            if(    window.Util.hasSubstringCaseInsensitive( sClassName, "article" )
    	                && window.Util.hasSubstringCaseInsensitive( sClassName, "body" ) )
    	            {
    	               var $splitContentContainer = $container.siblings( "." + sClassName );
    	               var $separatedParagraphs = $splitContentContainer.find( "p" );

    	               if(    $splitContentContainer.length === 1
    	                   && $separatedParagraphs.length > 0 )
    	               {
    	                  isSplitIntoTwoContainers = true;

    	                  $separatedParagraphs.each( function( iIndex, eParagraph )
    	                  {
    	                     var $clonedParagraph = $(eParagraph).clone();
    	                     $contentContainerClone.prepend( $clonedParagraph );

    	                     // Need to make sure the original content container has
    	                     // the same number of elements as the clone.
    	                     var $clonedParagraph2 = $(eParagraph).clone();
    	                     $clonedParagraph2.css( "display", "none" );
    	                     $contentContainer.prepend( $clonedParagraph2 );
    	                  });
    	               }
    	            }
    	         }
    	      }
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._sanitizeElement = function( eElement )
    	   {
    	      if( eElement )
    	      {
    	         eElement.id        = "";
    	         eElement.className = "";

    	         if( eElement.removeAttribute )
    	         {
    	            eElement.removeAttribute( "style" );
    	            eElement.removeAttribute( "width" );
    	            eElement.removeAttribute( "height" );
    	         }
    	      }
    	   };



    	   ////////////////////////////////////////////////////////////////////////////

    	   window.ArticleParser.prototype._sanitizeElementAndDesendants = function( element )
    	   {
    	      var eElement = ( element instanceof $ ) ? element[0] : element;

    	      if( eElement )
    	      {
    	         var listOfElements = [ eElement ];

    	         while( listOfElements.length > 0 )
    	         {
    	            var e = listOfElements.shift();

    	            this._sanitizeElement( e );

    	            for( var i = 0; i < e.childNodes.length; i++ )
    	            {
    	               listOfElements.push( e.childNodes[i] );
    	            }
    	         }
    	      }
    	   };
    	})(window);

      var oArticle = (new window.ArticleParser()).getArticle();
      callback({title : oArticle.$title.html(),
             body : oArticle.$content.html()});

    }
  });
};




