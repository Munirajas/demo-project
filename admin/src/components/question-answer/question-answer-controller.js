app.controller("questionAnswerController", function ($sce,$scope, questionAnswerService, questionTypeService, bundleService, $uibModal) {
  $scope.init = function () {
    $scope.dtOptions = {
      searching: false
    };

    questionAnswerService.getQuestionAnswerDetails().then(function (_res) {

      $scope.questionAnswerInfoDetails = _res.quesInfo;
      console.log($scope.questionAnswerInfoDetails);
    });
    questionTypeService.getQuestionTypeDetails().then(function (_res) {

      $scope.questionTypeInfoDetails = _res.qtypeInfo;
      console.log($scope.questionTypeInfoDetails);
    });


  
    bundleService.getBundleDetails().then(function (_res) {

      $scope.bundleInfoDetails = _res.bundleInfo;
      console.log($scope.bundleInfoDetails);

    });

  }

  $scope.trustAsHtml = function (html) {
    return $sce.trustAsHtml(html);
  }

  $scope.init();

  $scope.addNewQuestionAnswer = function () {
    console.log("sdfgh");
    $scope.questionAnswer = {};
    $scope.idquestionAnswer = 0;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/question-answer/question-answer.html',
      scope: $scope,
      backdrop: "static",

      size: 'lg',
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }

  $scope.closePopUp = function () {
    $scope.uibModalInstance.dismiss('cancel');
  }
  $scope.editQuestionAnswer = function (values) {
    $scope.questionAnswer = values;
    $scope.idquestionAnswer = values.id;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/question-answer/question-answer.html',
      scope: $scope,
      backdrop: "static",

      size: 'lg',
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }
  $scope.submitForm = function (questionAnswer) {
    var i = 0;
    angular.forEach($scope.userForm.$error.required, function (field) {
      console.log("dfgh");
      field.$setDirty();
      i = 1;
    });

    if (i == 0) {
      $scope.saveQuestionAnswer(questionAnswer);
    }
  };
  $scope.regularClick = function () {
    alert("OJO: Valida pero no hace Submit!");
  };
  $scope.showMessage = function (input) {
    var show = input.$invalid && (input.$dirty || input.$touched);
    return show;
  };

  $scope.saveQuestionAnswer = function (questionAnswer) {
    var createdetails = JSON.parse(localStorage.getItem("User"));
    if ($scope.idquestionAnswer == 0) {
      //add

      //    console.log($scope.createdetails);
      questionAnswer.createdBy = createdetails.User.validInfo[0].id;
      console.log("inside save create");
      questionAnswerService.createQuestionAnswer(questionAnswer).then(function (_res) {
        $scope.uibModalInstance.dismiss('cancel');
        $scope.init();
      })
    } else {
      //update
      //var createdetails = JSON.parse(localStorage.getItem("User"));
      questionAnswer.updatedBy = createdetails.User.validInfo[0].id;
      questionAnswerService.updateQuestionAnswer($scope.idquestionAnswer, questionAnswer).then(function (_res) {
        console.log("inside save update");
        $scope.uibModalInstance.dismiss('cancel');
        $scope.init();
      })
    }
  }
});