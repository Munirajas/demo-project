angular.module('Presenter')
  .controller('presenterController', function($scope,  $rootScope, $routeParams, $location, presenterService) {
    var $presenter = this;	 	

    $presenter.activeEvent = $rootScope.activeEvent;
    $scope.askQuestionContent = '';
    $scope.answerQuestionContent = [];
    $rootScope.presenterActive = false;

    $scope.askQuestion = function() {
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

    $scope.answerQuestion = function(questionId) {
      var answerObj = {};
        if ($scope.answerQuestionContent != '') {
          //question content
          answerObj.answer = $scope.answerQuestionContent[0];
          //user id
          answerObj.user_id = localStorage.getItem("user_id"); //get value from local storage
          //question id
          answerObj.question_id = questionId; //get value from local storage
          //post question service
          presenterService.postQuestionAnswer(answerObj).then(function(_res) {
            $scope.answerQuestionContent = [];
            getEventQuestionList();
          });
        }
    }

    getEventQuestionList = function() {
      presenterService.getEventQuestions($presenter.activeEvent.id).then(function(_res) {
        $scope.eventQAs = _res; 
      });
    }

    getEventQuestionList();
});






