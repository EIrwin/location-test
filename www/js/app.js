angular.module('location', ['ionic', 'location.controllers','logglyLogger','ngCordova'])

.run(function($ionicPlatform,$cordovaGeolocation,$log) {
  $ionicPlatform.ready(function() {

  });
})

.config(function($stateProvider, $urlRouterProvider,LogglyLoggerProvider) {
  LogglyLoggerProvider.inputToken('6be44d18-4dfb-4637-9448-7739d233bb57');
  
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.location', {
    url: "/location",
    views: {
      'menuContent': {
        templateUrl: "templates/location.html",
        controller:'LocationCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/location');
});
