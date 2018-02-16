angular.module('Audience')
  .controller('audienceController', function($scope,  $rootScope, $routeParams, $location, presenterService) {
    var $audience = this;	 	

    $presenter.activeEvent = $rootScope.activeEvent;
    $rootScope.presenterRating = false;
    $scope.rating1 = 0;
    $scope.rating2 = 0;
    $scope.rating3 = 0;
    $scope.rating4 = 0;

    $scope.savePresenterRating = function() {
      var questionObj = {};

      if ($scope.askQuestionContent != '') {
        //question content
        questionObj.question = $scope.askQuestionContent;
        //user id
        questionObj.user_id = localStorage.getItem("user_id"); //get value from local storage
        //event id
        questionObj.event_id = $presenter.activeEvent.id; //get value from local storage
        //post question service
        presenterService.postEventQuestion(questionObj).then(function(_res) {
          $scope.askQuestionContent = '';
          getEventQuestionList();
        });
      }
    }


});






