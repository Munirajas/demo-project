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
  'ngAnimate',
  'ngMaterial',
  'ngMessages'
  ]);


app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
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
  .when('/presenter-list', {
    templateUrl: 'components/presenter/presenter-list.html',
    controller: 'presenterController'
  })
  .when('/presenter', {
    templateUrl: 'components/presenter/presenter.html',
    controller: 'presenterController'
  })
  .when('/events', {
    templateUrl: 'components/events/event-list.html',
    controller: 'eventController'
  })
  ;
  ;
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


