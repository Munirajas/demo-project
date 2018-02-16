var app = angular.module('tta',['ngRoute',
  'Login',
  'Event',
  'Presenter',
  'Audience',
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
  
  socialProvider.setGoogleKey("2370180840-1bv27h6ka34f0bt44bcvkjuaa2beqvn6.apps.googleusercontent.com");

  $routeProvider
  .when('/', {
    templateUrl: 'components/login/login.html',
    controller: 'loginController'
  })  
  .when('/login', {
    templateUrl: 'components/login/login.html',
    controller: 'loginController'
  })
  .when('/audience-pollqa', {
    templateUrl: 'components/auidence/audience.html',
    controller: 'audienceController'
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

app.controller('mainController', function($scope, $rootScope,$location){
  
  $rootScope.logOut = function(){ 
     localStorage.removeItem('user');
     $location.path('/login');
  }
});

app.directive('countdown', [
  'Util',
  '$interval',
  function (Util, $interval) {
      return {
          restrict: 'A',
          scope: { date: '@' },
          link: function (scope, element) {
              var future;
              future = new Date(scope.date);
              $interval(function () {
                  var diff;
                  diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                  return element.text(Util.dhms(diff));
              }, 1000);
          }
      };
  }
]).directive('countdownpresenter', [
  'Util',
  '$interval',
  '$rootScope',
  function (Util, $interval, $rootScope) {
      return {
          restrict: 'A',
          scope: { date: '@' },
          link: function (scope, element) {
              var future;
              future = new Date(scope.date);
              $interval(function () {
                  var diff;
                  diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                  if (diff <= 0 && $rootScope.presenterActive == false) {
                    $rootScope.presenterActive = true;
                  }
                  return element.text(Util.dhms(diff));
              }, 1000);
          }
      };
  }
]).directive('countdownreview', [
  'Util',
  '$interval',
  function (Util, $interval) {
      return {
          restrict: 'A',
          scope: { date: '@' },
          link: function (scope, element) {
              var future;
              future = new Date(scope.date);
              $interval(function () {
                  var diff;
                  diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                  if (diff = 0 && $rootScope.ratingActive == false) {
                      $rootScope.ratingActive = true;
                      $location.path('/audience-pollqa');
                  }
                  return element.text(Util.dhms(diff));
              }, 1000);
          }
      };
  }
]).factory('Util', [function () {
      return {
          dhms: function (t) {
              var days, hours, minutes, seconds;
              days = Math.floor(t / 86400);
              t -= days * 86400;
              hours = Math.floor(t / 3600) % 24;
              t -= hours * 3600;
              minutes = Math.floor(t / 60) % 60;
              t -= minutes * 60;
              seconds = t % 60;
              return [
                  days + 'd',
                  hours + 'h',
                  minutes + 'm',
                  seconds + 's'
              ].join(' ');
          }
      };
  }]);

