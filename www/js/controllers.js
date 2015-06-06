angular.module('location.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('LocationCtrl',['$scope','$log','$cordovaGeolocation',function($scope,$log,$cordovaGeolocation){ 
  
  $cordovaGeolocation
    .getCurrentPosition({
        timeout: 40000, 
        enableHighAccuracy: true
      })
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.latitude = lat;
      $scope.longitude = long;
    }, function(err) {
      $log.error('getPosition:' + JSON.stringify(err));
    });
    
  var watchOptions = {
    frequency : 1000,
    timeout : 40000,
    enableHighAccuracy: true // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      $log.error('watchPosition:' + JSON.stringify(err));
    },
    function(position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.latitude = lat;
      $scope.longitude = long;
  });    
}]);
