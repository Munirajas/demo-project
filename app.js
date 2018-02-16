var app = angular.module('tta',['ngRoute',
  'Login',
  'ui.bootstrap',
  'angucomplete',
  'angucomplete-alt',
  '720kb.datepicker',
  'toaster',
  'ngFileUpload',
  'ngIdle'
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


