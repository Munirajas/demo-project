angular.module('Presenter')
  .controller('presenterController', function($scope,  $rootScope, $routeParams, $location, presenterService) {
    var $presenter = this;	 	

    console.log($rootScope.activeEvent);
    $presenter.activeEvent = $rootScope.activeEvent;
    $scope.askQuestionContent = '';
    $presenter.answer = '';

    $scope.askQuestion = function() {
      //question content
      var askQuestion = $scope.askQuestionContent;
      //user id
      var userId = localStorage.getItem("user_id"); //get value from local storage
      //event id
      var eventId = $presenter.activeEvent.id; //get value from local storage


    }
});






