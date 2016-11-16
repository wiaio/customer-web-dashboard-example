/*
Name:
  app.js
Description:
  Our app.js file handles the frontend routing of our application
  between the individual pages and assigns their corresponding controllers.
*/
var app = angular.module('customerApp', ['ngRoute']);

app.config(['$locationProvider', '$routeProvider',
    function config ($locationProvider, $routeProvider){

    $routeProvider
      .when('/login',
      {
          controller: 'LoginController',
          templateUrl: '/partials/login.html',
          caseInsensitiveMatch: true
      })
      .when('/signup',
      {
          controller: 'SignupController',
          templateUrl: '/partials/signup.html',
          caseInsensitiveMatch: true
      })
      .when('/deviceList',
      {
          controller: 'DeviceListController',
          templateUrl: '/partials/deviceList.html',
          caseInsensitiveMatch: true
      })
      .when('/device/:deviceId',
      {
          controller: 'DeviceController',
          templateUrl: '/partials/device.html',
          caseInsensitiveMatch: true
      })
      .otherwise({ redirectTo: '/login' });
}]);
