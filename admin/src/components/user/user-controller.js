app.controller("userController", function ($scope, $route, $rootScope, stateService, userService, supportService, bundleService, $uibModal) {

  $scope.init = function () {
    $scope.dtOptions = {
      searching: false
    };

    userService.getUserDetails().then(function (_res) {

      $scope.userInfoDetails = _res.userInfo;
      console.log($scope.userInfoDetails);

    });
    supportService.getSupportDetails().then(function (_res) {

      $scope.supportInfoDetails = _res.supportInfo;
      console.log($scope.supportInfoDetails);

    });

    bundleService.getBundleDetails().then(function (_res) {
      $scope.bundleInfoDetails = _res.bundleInfo;
      console.log($scope.bundleInfoDetails);

    });
    stateService.getStateDetails().then(function (_res) {

      $scope.stateInfoDetails = _res.stateInfo;
      console.log($scope.stateInfoDetails);

    });
  }
  $scope.init();

  $scope.addNewUser = function () {
    console.log("sdfgh");
    $scope.user = {};
    $scope.iduser = 0;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/user/user.html',
      scope: $scope,
      size:'lg',
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }

  $scope.printpdf = function (value1) {
    console.log(value1);
    $rootScope.idclient = value1.id;
    console.log($rootScope.idclient);
    userService.getUserDetailsId($rootScope.idclient).then(function (_res) {
      console.log(_res);

      if (_res.status == true) {
        $scope.client = _res.userbundle[0];
        if (_res.userbundle.pdf_sas == 1) {
          console.log(_res.userbundle[0].pdf_sas);
          $scope.client.pdf_sas = true;
        } else {
          $scope.client.pdf_sas = true;
        }
      }

      if (_res.status == false) {
        console.log("inside status false");
        userService.getUserDetails($rootScope.idclient).then(function (_res) {
          console.log(_res.userInfo);
          $scope.client = {};
          $scope.client.pdf_name = _res.userInfo[0].hod_name;
          $scope.client.pdf_institute = _res.userInfo[0].college_name;
          $scope.client.pdf_state = _res.userInfo[0].state;
          console.log($scope.userInfoDetails);

        });
      }
    })
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/clientpdf/clientpdf.html',
      scope: $scope,
      static: 'backdrop',
      size : 'lg',
      controller: 'clientpdfController',
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }

  $scope.printpo = function (value1) {
    $rootScope.idclient = value1.id;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/userpo/userpo.html',
      scope: $scope,
      static: 'backdrop',
      controller: 'userpoController',
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
  }

  $scope.comment = function (value1) {
    $rootScope.idclient = value1.id;
    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/usercomments/usercomments.html',
      scope: $scope,
      static: 'backdrop',
      controller: 'usercommentsController',
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
  $scope.editUser = function (values) {
    $scope.user = values;
    $scope.iduser = values.id;
    userService.getUserDetails($scope.iduser).then(function (_res) {

      $scope.userInfoDetails1 = _res.userInfo;
      console.log($scope.userInfoDetails1);
      for (i = 0; i < $scope.bundleInfoDetails.length; i++) {
        for (j = 0; j < $scope.userInfoDetails1.length; j++) {
          if ($scope.bundleInfoDetails[i].id == $scope.userInfoDetails1[j].id_bundle) {
            console.log($scope.bundleInfoDetails[i]);
            $scope.bundleInfoDetails[i]['status'] = true;
          }
        }
      }

    });

    $scope.uibModalInstance = $uibModal.open({
      templateUrl: '/admin/src/components/user/user.html',
      scope: $scope,
      resolve: {
        sizeList: function () {
          console.log('resolve');
        }
      }
    });
    $scope.init();
  }


  $scope.submitForm = function (user) {
    var i = 0;
    angular.forEach($scope.userForm.$error.required, function (field) {
      field.$setDirty();
      i = 1;
    });

    if (i == 0) {
      $scope.saveUser(user);
    }
  };
  $scope.regularClick = function () {
    alert("OJO: Valida pero no hace Submit!");
  };
  $scope.showMessage = function (input) {
    var show = input.$invalid && (input.$dirty || input.$touched);
    return show;
  };
  $scope.saveUser = function (user) {
    console.log($scope.bundleInfoDetails);
    $scope.bundle = [];
    for (var j = 0; j < $scope.bundleInfoDetails.length; j++) {
      if ($scope.bundleInfoDetails[j].status == true) {
        $scope.bundle.push($scope.bundleInfoDetails[j]);
      }
    }
    user.idbundle = $scope.bundle;
    if ($scope.iduser == 0) {
      //add
      console.log("inside save create");
      userService.createUser(user).then(function (_res) {
        $scope.uibModalInstance.dismiss('cancel');
        $route.reload();
      })
    } else {
      //update
      userService.updateUser($scope.iduser, user).then(function (_res) {
        console.log("inside save update");
        $scope.uibModalInstance.dismiss('cancel');
        $route.reload();
      })
    }
  }
});