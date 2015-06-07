angular.module('location.controllers', [])

.controller('AppCtrl', function($scope) {

})
.controller('MapCtrl',['$scope','$log','Geolocation','Map','$cordovaGeolocation',
  function($scope,$log,Geolocation,Map,$cordovaGeolocation){
    
   //initialize the map and click event listener
   Geolocation.getCurrentPosition({
      timeout:40000,
      enableHighAccuracy:true
    }).then(function(position){
        Map.initialize({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          mapId:'bigmap',
          listeners:[
            {
              eventName:'click',
              listener:function(clickEvent){
                Map.placeMarker({
                  location:clickEvent.latLng,
                  radius:100,
                  color:'FE7569'
                });
              }
            }
          ]
        });       
    },function(err){
      $log.error('getPosition:' + JSON.stringify(err));
    });
    
    //setup watchPosition logic
    //so that we can track our current
    //position on the map
    var watchFrequency = 1000;
    setInterval(function(){
      Geolocation.getCurrentPosition({
        timeout:40000,
        enableHighAccuracy:true,
      }).then(function(position){
        
        //this is the big section!!!!
        //inside of here, we want to check
        //geofencing and update whatever we need
        
        Map.updateCurrentPosition({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        });
      });
    },watchFrequency);
}])
.controller('LocationCtrl',['$scope','$log','Geolocation',
  function($scope,$log,Geolocation){ 
  
  Geolocation.getCurrentPosition({
      timeout:40000,
      enableHighAccuracy:true
    }).then(function(position){
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        $scope.latitude = lat;
        $scope.longitude = long;
    },function(err){
      $log.error('getPosition:' + JSON.stringify(err));
    });
    
  var watch = Geolocation.watchPosition({
    frequency:1000,
    timeout:40000,
    enableHighAccuracy:true
  });
  watch.then(null,
    function(err){
      $log.error('watchPosition:' + JSON.stringify(err));
    },
    function(position){
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.latitude = lat;
      $scope.longitude = long;
    });  
}]);
