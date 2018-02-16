app.controller("bundleController", function ($route, $scope, questionTypeService, bundleService, $uibModal) {
  // $scope.bundle = {
  //   name:'',
  //   code:''
  // };
  $scope.init = function () {
    $scope.dtOptions = {
      searching: false
    };

    bundleService.getBundleDetails().then(function (_res) {

      $scope.bundleInfoDetails = _res.bundleInfo;
      console.log($scope.bundleInfoDetails);

    });
    questionTypeService.getQuestionTypeDetails().then(function (_res) {

      $scope.questionTypeInfoDetails = _res.qtypeInfo;
      console.log($scope.questionTypeInfoDetails);

    });

    $scope.userForme = {
      name: '',
      code: '',
      status: ''
    }
  }
  $scope.init();

  $scope.addNewBundle = function () {
    console.log("sdfgh");
  
    $scope.idBundle = 0;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/bundle/bundle.html',
      scope: $scope,
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }

  $scope.closePopUp = function () {
    $scope.uibModalInstance.dismiss('cancel');
    //$route.reload();
  }
  $scope.editBundle = function (value1) {

    bundleService.getBundleDetails(value1.id).then(function (_res) {

      $scope.bundleInfoDetails1 = _res.bundleInfo;
      for (var i = 0; i < $scope.questionTypeInfoDetails.length; i++) {
        for (var j = 0; j < $scope.bundleInfoDetails1.length; j++) {
          if ($scope.questionTypeInfoDetails[i].id == $scope.bundleInfoDetails1[j].id_question_type) {
            console.log($scope.questionTypeInfoDetails[i]);
            $scope.questionTypeInfoDetails[i]['status'] = true;
          }
        }
      }
    })

    console.log($scope.questionTypeInfoDetails);
    $scope.bundle = value1;
    $scope.idBundle = value1.id;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/bundle/bundle.html',
      scope: $scope,
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }

  $scope.submitForm = function () {
    var i = 0;
    /* angular.forEach($scope.userForme.$error.required, function (field) {
      console.log("dfgh");
      field.$setDirty();
      i = 1;
    }); */

    if (i == 0) {
      console.log($scope.bundle);
      $scope.saveBundle($scope.bundle);
    }
  };
  $scope.regularClick = function () {
    alert("OJO: Valida pero no hace Submit!");
  };
  $scope.showMessage = function (input) {
    var show = input.$invalid && (input.$dirty || input.$touched);
    return show;
  };

  $scope.saveBundle = function (bundle) {
    console.log($scope.questionTypeInfoDetails);
    $scope.questionType = [];
    for (var j = 0; j < $scope.questionTypeInfoDetails.length; j++) {
      if ($scope.questionTypeInfoDetails[j].status == true) {
        $scope.questionType.push($scope.questionTypeInfoDetails[j]);
      }
    }
    bundle.idquestionType = $scope.questionType;
    console.log(bundle.idquestionType);
    if ($scope.idBundle == 0) {
      //add

      console.log("inside save create");
      bundleService.createBundle(bundle).then(function (_res) {
        $scope.uibModalInstance.dismiss('cancel');
        $route.reload();
      })
    } else {
      //update
      bundleService.updateBundle($scope.idBundle, bundle).then(function (_res) {
        console.log("inside save update");
        $scope.uibModalInstance.dismiss('cancel');
        $route.reload();
      })
    }
  }
});