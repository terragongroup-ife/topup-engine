var app = angular.module('TopupWebApp', [
    'ngRoute'
  ]);
  
//configure the routes  
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/", {templateUrl: "partials/singlerecharge.html", controller: "PageCtrl"})
      .when("/history", {templateUrl: "partials/history.html", controller: "PageCtrl"})
      .when("/singlerecharge", {templateUrl: "partials/singlerecharge.html", controller: "PageCtrl"})
      .when("/bulkrecharge", {templateUrl: "partials/bulkrecharge.html", controller: "PageCtrl"})
      .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  }]);


    

  
