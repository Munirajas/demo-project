var app = angular.module('tta',['ngRoute',
  'Login',
  'Event',
  'Presenter',
  'ui.bootstrap',
  'angucomplete',
  'angucomplete-alt',
  '720kb.datepicker',
  'toaster',
  'ngFileUpload',
  'ngIdle',
  'socialLogin',
  'ngIdle', 
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'timer'
  ]);


app.config(function($routeProvider, $locationProvider, socialProvider) {
  
  socialProvider.setGoogleKey("977973052600-1ao204k1kc6boqpevtvj81tmia2gipea.apps.googleusercontent.com");

  $routeProvider
  .when('/eve', {
    templateUrl: 'components/login/login.html',
    controller: 'loginController'
  })  
  .when('/login', {
    templateUrl: 'components/login/login.html',
    controller: 'loginController'
  })
  .when('/audience', {
    templateUrl: 'components/audience/audience.html',
    controller: 'loginController'
  })
  .when('/presenter', {
    templateUrl: 'components/presenter/presenter-list.html',
    controller: 'presenterController'
  })
  .when('/', {
    templateUrl: 'components/events/event-list.html',
    controller: 'eventController'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});


app.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
  IdleProvider.idle(900);
  IdleProvider.timeout(1);
  KeepaliveProvider.interval(10);
}]);

app.run(['Idle', function(Idle) {
  Idle.watch();
}]);

app.controller('mainController', function($scope,$rootScope,$location){
  
  $rootScope.logOut = function(){ 
     localStorage.removeItem('user');
     $location.path('/login');
  }

});


