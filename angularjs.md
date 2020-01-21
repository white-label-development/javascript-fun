## Angular JS Getting Started

### intro

script for angular.js

<div ng-app> ... <?div> ng-app is the Angular application directive.

```
<body ng-app="plunker" ng-cloak>
  <div ng-controller="MainCtrl">
    <h1>Hello {{name}}</h1>    
    <p>{{22/7}}</p>
  </div>
</body>

//js
import angular from 'angular';
var myApp = angular.module('plunker', []);
myApp.controller('MainCtrl', function($scope) {
  $scope.name = 'Pi';
});
```

Reminder to wrap an IIFE in brackets as the js compiler doesn't like it otherwise
```
(function(){

  //functions
  // ...
  
  return {  
    publicName: privateName
  }; //return object with exposed features
  
}());
```

### controllers

Controllers are just functions, invoked by angular, usually with a `$scope` parameter. "Things" attached to scope are the model.
A page can have multiple, nested controllers.

#### $http Service

Built in svc for http calls: Get, Post, Put, Delete. Injected: `function($scope, $http) {}`

```
var promise = $http.get("/users/1738"); //returns a promise
promise.then(function(response){
  $scope.user = response.data;
});
```

uses api.github.com as a live demo api. good idea!

```
// [] brackets contain dependencies.
angular.module('plunker', []).controller('MainCtrl', function($scope, $http) {  
  $http.get("https://api.github.com/users/white-label-development").then(
    function(response){
      $scope.user = response.data;
    });
  $scope.message = 'Hello from ng';
});

//html
<body ng-app="plunker" ng-cloak>
  <div ng-controller="MainCtrl">
    <h1>{{message}}</h1>
    <p>Welcome {{user.name}}</p>
    <img ng-src="{{user.avatar_url}}" title="{{user.name}}">
  </div>
</body>
```

Wrap the anguar module in an IEFE and refactor to a different format, for completeness
```
(function() {

  var app = angular.module("githubViewer", []);
  var MainController = function($scope, $http) {
    var onUserComplete = function(response) {
      $scope.user = response.data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the user";
    };


    $http.get("https://api.github.com/users/robconery").then(onUserComplete, onError);
    $scope.message = "Hello, Angular!";
  };
  
  app.controller("MainController", ["$scope", "$http", MainController]);
}());
```
### Directives and Views

```
(function() {

  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http) {
    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
           .then(onRepos, onError);
    };

    var onRepos = function(response){      
      $scope.repos = response.data;          
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };


    $scope.search = function(username){
        $http.get("https://api.github.com/users/" + username)
          .then(onUserComplete, onError);
    };

    $scope.username = "angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";
  };
  
  app.controller("MainController", ["$scope", "$http", MainController]);
}());
```

```
<!DOCTYPE html>
<html ng-app="githubViewer">
<head>
    <script data-require="angular.js@*" data-semver="1.3.0-beta.5" src="https://code.angularjs.org/1.3.0-beta.5/angular.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
</head>

<body ng-controller="MainController">
    <h1>{{message}}</h1>
    <div>{{ error }}</div>
    <form name="searchUser" ng-submit="search(username)">
        <input type="search" required placeholder="Username to find" ng-model="username" />
        <input type="submit" value="Search">
    </form>
    <div ng-include="'userdetails.html'" ng-show="user"></div>    
</body>
</html>
```

Can move data deom the view into the model with ng-model. Can specify an expression `ng-model="username", ng will push the valie into scope as username (it will create scope.username)





















