/*
Name:
  controllers.js
Description:
  Our controller.js file handles the scope of individual pages.
*/

Wia.initialize({
  // Application Key from Dashboard at https://dashboard.wia.io/manageOrganisation/applications
  // appKey: "Your application Key"
  appKey: "ak_IT5BZLenq5NPTyUnAOfagIrnctPQcxgu"
});

// Controller for the login.html page
app.controller('LoginController', function ($scope, $route, $rootScope) {
  // Clears the scope of the form inputs on load of the page
  $scope.email="";
  $scope.password="";

  //Login function is called when login form is submitted
  $scope.loginFunction = function() {

    // login function that takes two parameters, username(email) and password
    Wia.customers.login({
      username: $scope.email,
      password: $scope.password
    }, function(accessToken) {
        window.location = "#/deviceList";// On login success app routes to the deviceList page
    });
  };// end function loginFunction
});// end LoginController


// Controller for the signup.html page
app.controller('SignupController', function ($scope, $route, $rootScope) {
  // Clears the scope of the form inputs on load of the page
  $scope.fullName="";
  $scope.email="";
  $scope.password="";

  $scope.signupFunction = function () {
    // signup function takes three parameters, fullname, email and password
    Wia.customers.signup({
      fullName: $scope.fullName,
      email: $scope.email,
      password: $scope.password
    }, function(customer) {
      // When a customer is successfully signed up, they are automatically logged into the application
      Wia.customers.login({
        username: $scope.email,
        password: $scope.password
      }, function(accessToken) {
          window.location = "#/deviceList";// On successful login reroutes to page with list of customers devices.
      });
    }, function(error) {
      console.log(error);
    });
  };// end function signupFunction

});

// Controller for the deviceList.html page
app.controller('DeviceListController', function ($scope, $route, $rootScope) {
  // Wia function to retrieve list of devices associated with the appKey
  Wia.devices.list({}, function(devices, count) {
    $scope.$apply(function(){
      $scope.devices = devices;
      $scope.count = count;
    });
  }, function(error) {
    console.log(error);
  });
});

// Controller for the device.html page
app.controller('DeviceController', function ($scope, $route, $routeParams) {
  // DeviceKey is retrieved from the url
  var deviceKey = $routeParams.deviceId;

  Wia.devices.retrieve(deviceKey, function(device) {
    // retrieved device data is assigned to our scope variables for usage in our frontend
    $scope.$apply(function(){
     $scope.deviceId = device.id;
     $scope.deviceName = device.name;
     $scope.deviceUpdated = Date(device.updatedAt);
    });
      }, function(error) {
    console.log(error);
  });
});
