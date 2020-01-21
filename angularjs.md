## Angular JS Getting Started

script for angular.js

<div ng-app> ... <?div> ng-app is the Angular application directive.

```
<body ng-app="plunker" ng-cloak>
  <div ng-controller="MainCtrl">
    <h1>Hello {{name}}</h1>
    <p>Start editing and see your changes reflected here!</p>
  </div>
</body>

//js
import angular from 'angular';
var myApp = angular.module('plunker', []);
myApp.controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker123';
});
```
