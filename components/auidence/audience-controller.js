angular.module('Audience')
  .controller('audienceController', function($scope,  $rootScope, $routeParams, $location, presenterService) {
    var $audience = this;	 	

    $audience.activeEvent = $rootScope.activeEvent;
    $rootScope.ratingActive = false;
    $scope.rating1 = 0;
    $scope.rating2 = 0;
    $scope.rating3 = 0;
    $scope.rating4 = 0;

    $scope.savePresenterRating = function() {
      var ratingObj = {};

       if ( $audience.activeEvent.event_id != '' ) {
        
        ratingObj.question_one = $scope.rating1;
        ratingObj.question_two = $scope.rating2;
        ratingObj.question_three = $scope.rating3;
        ratingObj.question_four = $scope.rating4;
        ratingObj.event_id = $audience.activeEvent.event_id;
        ratingObj.user_id =  localStorage.getItem("user_id");
         //post rating 
         presenterService.postEventRating(ratingObj).then(function(_res) {
          $scope.rating1 = 0;
          $scope.rating2 = 0;
          $scope.rating3 = 0;
          $scope.rating4 = 0;
          $location.path('/events');
        });
      }
  }

  });






