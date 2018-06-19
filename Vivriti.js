
     var app = angular.module('myApp', []);
app.controller('MainController', function($scope, $http) {
  $http.get("http://starlord.hackerearth.com/beercraft").then(function (response) {
     $scope.Beers = response.data;
      var Names =[];
        for(x in $scope.Beers)
           Names.push($scope.Beers[x].name); 
            Names.sort();
             
           (function( $ ) {
    
    // Custom autocomplete instance.
    $.widget( "app.autocomplete", $.ui.autocomplete, {
        
        // Which class get's applied to matched text in the menu items.
        options: {
            highlightClass: "ui-state-highlight"
        },
        
        _renderItem: function( ul, item ) {

            // Replace the matched text with a custom span. This
            // span uses the class found in the "highlightClass" option.
            var re = new RegExp( "(" + this.term + ")", "gi" ),
                cls = this.options.highlightClass,
                template = "<span class='" + cls + "'>$1</span>",
                label = item.label.replace( re, template ),
                $li = $( "<li/>" ).appendTo( ul );
            
            // Create and return the custom menu item content.
            $( "<a/>" ).attr( "href", "#" )
                       .html( label )
                       .appendTo( $li );
            
            return $li;
            
        }
        
    });
    $(function() {
       
        $( "input" ).autocomplete({
            highlightClass: "bold-text",
            source: Names
        });
        
  });
    
})( jQuery );

 $scope.sortorder = "";
$scope.styleIncludes = [];

$scope.includeStyle = function(style) {
        var i = $.inArray(style, $scope.styleIncludes);
        if (i > -1) {
            $scope.styleIncludes.splice(i, 1);
        } else {
            $scope.styleIncludes.push(style);
        }
    }
      $scope.styleFilter = function(Beers) {
        if ($scope.styleIncludes.length > 0) {
            if ($.inArray(Beers.style, $scope.styleIncludes) < 0)
                return;
        }
        
        return Beers;
    }
 var style = []
for(x in $scope.Beers)
style[x] = $scope.Beers[x].style;
$scope.Styles = Array.from(new Set(style));




if(typeof(Storage) !== "undefined") {
if(localStorage.getItem("CountItem") === null) 
 localStorage.setItem("CountItem",0);
 $scope.itemCount = Number(localStorage.CountItem);
if (localStorage.getItem("cartVivriti") === null)
{
$scope.cart=[];
localStorage.setItem("cartVivriti", JSON.stringify($scope.cart));
}
else 
$scope.cart = JSON.parse(localStorage.getItem("cartVivriti")); 
$scope.addTocart = function(index){
$scope.cart = JSON.parse(localStorage.getItem("cartVivriti")); 
        for(var i=0;i<$scope.cart.length;i++)
     { if($scope.Beers[index].id == $scope.cart[i].id)
        { $scope.cart[i].Quantity++;
            localStorage.setItem("cartVivriti", JSON.stringify($scope.cart));
          return;}
      } 
      $scope.cart.push($scope.Beers[index]);
        $scope.cart[$scope.itemCount].Quantity = 1;
        localStorage.setItem("cartVivriti", JSON.stringify($scope.cart));
        localStorage.CountItem = Number(localStorage.CountItem)+1;
        $scope.itemCount = Number(localStorage.CountItem);
      

};

$scope.remove = function(index){
$scope.cart = JSON.parse(localStorage.getItem("cartVivriti")); 
$scope.cart.splice(index,1);
localStorage.setItem("cartVivriti", JSON.stringify($scope.cart));
localStorage.CountItem = Number(localStorage.CountItem)-1;
 $scope.itemCount = Number(localStorage.CountItem);
}




}
else { alert("Sorry! No Web Storage support");
}



         });
});
