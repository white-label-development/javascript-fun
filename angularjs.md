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
























