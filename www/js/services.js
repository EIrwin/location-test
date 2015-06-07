angular.module('location.services', [])

.factory('Geofence','$rootScope','$log','$q',function($rootScope,$log,$q){
  
})
.factory('Map',['$rootScope','$log','$q',function($rootScope,$log,$q){
  var map = null;
  var marker = null;
  return {
    map:map,
    initialize:function(options){
          var lat  = options.latitude;
          var long = options.longitude;       
        	var myLatlng = new google.maps.LatLng(lat,long);
        	var mapOptions = {
        	  center: myLatlng,
        	  zoom: 16,
        	  mapTypeId: google.maps.MapTypeId.ROADMAP
        	};
        
          var eMap = document.getElementById('bigmap');
        	map = new google.maps.Map(eMap,mapOptions);
          
          for(var i in options.listeners){
            var listener = options.listeners[i];
            google.maps.event.addListener(map,listener.eventName,listener.listener);
          }
    },
    setMarker:function(options){
        if(marker == null){
          marker = new google.maps.Marker({
            position: options.location, 
            map: map
          });
          
                  // Add circle overlay and bind to marker
          var circle = new google.maps.Circle({
              map: map,
              radius: options.radius, // 2 miles in metres
              strokeColor: '#009bc9',
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: '#ffffff',
              fillOpacity: 0.30
          });
  
          circle.bindTo('center', marker, 'position');
        }
    },
    clearMarker:function(){
      marker = null;
    }
  };
}])
.factory('Geolocation',['$rootScope','$log','$cordovaGeolocation','$q', function($rootScope,$log,$cordovaGeolocation,$q) {
  return {
    getCurrentPosition:function(options){
      var d = $q.defer();
      $cordovaGeolocation
        .getCurrentPosition(options)
        .then(function (position) {
            d.resolve(position);
        }, function(err) {
          d.reject(err);
        });
        return d.promise;
    },
    watchPosition: function(options){
      var d = $q.defer();
      var watch = $cordovaGeolocation.watchPosition(options);
      d.resolve(watch);
      return d.promise;
   }};
}]);
