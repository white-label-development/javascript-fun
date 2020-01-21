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
  
    // go and get a sub property using the url returned from the first call
    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
           .then(onRepos, onError);
    };

    var onRepos = function(response){      
      $scope.repos = response.data; // the users repos         
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

```
// userdetails.html
<div>
    <h2>{{user.name}}</h2>
    <img ng-src="http://www.gravatar.com/avatar/{{user.gravatar_id}}" title="{{user.name}}">Order:
    <select ng-model="repoSortOrder">
        <option value="+name">Name</option>
        <option value="-stargazers_count">Stars</option>
        <option value="+language">Language</option>
    </select>
</div>


<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Stars</th>
            <th>Language</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="repo in repos | orderBy:repoSortOrder">
            <td>{{repo.name}}</td>
            <td>{{repo.stargazers_count | number}}</td>
            <td>{{repo.language}}</td>
        </tr>
    </tbody>
</table>
```

Can move data deom the view into the model with ng-model. Can specify an expression `ng-model="username", ng will push the value into scope as username (it will create scope.username).

Note use of :

ng-include (html from another source)

ng-repeat

filters `{{repo.stargazers_count | number}}` transforming the count into a (formatted) number, eg: 1,234.56. Others include currency, json, orderBy, date, limitTo etc. + and - is an angular thing for the orderBy.

ng-show="isTruthy"

ng-hide="!usTruthy"


There are 50+ built in directives. Plus many custom open-source directives


### Services ($http etc + custom services)

Used by Controllers, Models, Directives (not Views ofc)

$timeout and $interval wrap the vanilla javascript functions (they work better with ng and it's data). $interval is a function, unlike $http.

$log service (log, info, error, warn, debug): `$log.info('foo');`

stopped @5.Custome Services , 210120

UI Related Services wrap functionality like location, browser, window, anchorScroll, animate etc.














