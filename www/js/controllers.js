angular.module('location.controllers', [])

.controller('AppCtrl', function($scope) {

})
.controller('MapCtrl',['$scope','$log','Geolocation','Map',function($scope,$log,Geolocation,Map){
  
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
                Map.setMarker({
                  location:clickEvent.latLng,
                  radius:1000
                });
              }
            }
          ]
        });
        
    },function(err){
      $log.error('getPosition:' + JSON.stringify(err));
    });
}])
.controller('LocationCtrl',['$scope','$log','Geolocation',function($scope,$log,Geolocation){ 
  
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
