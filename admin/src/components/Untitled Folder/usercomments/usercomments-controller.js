app.controller("usercommentsController",function($route,$scope,$rootScope,usercommentsService,$uibModal){
    
    $scope.init = function(){
        $scope.dtOptions = {searching: false };
        $scope.iduser = $rootScope.idclient;
        console.log($scope.iduser);
        usercommentsService.getusercommentsDetails($scope.iduser).then(function (_res) {

       $scope.usercommentsInfoDetails = _res.usercommentsInfo;
       console.log($scope.usercommentsInfoDetails);

      }); 
    }
    $scope.init();

    // $scope.addNewusercomments = function () {
    //     console.log("sdfgh");
    //     $scope.usercomments = {};
    //     $scope.idusercomments=0;
    //     $scope.uibModalInstance = $uibModal.open({
    //      templateUrl: '/admin/src/components/usercomments/usercomments.html',
    //      scope: $scope,
    //      resolve: {
    //      sizeList: function () {
    //      console.log('resolve');
    //      }
    //      }
    //      });
    //  }

     $scope.closePopUp = function () {
        $scope.uibModalInstance.dismiss('cancel');
       $route.reload();
      }

      $scope.submitForm = function(usercomments) {
        var i=0;
        angular.forEach($scope.userForm.$error.required, function(field) {
          field.$setDirty();
          i = 1;
          });

        if(i==0){
          $scope.saveusercomments(usercomments);
        }
      };
      $scope.regularClick = function() {
        alert("OJO: Valida pero no hace Submit!");
      };
      $scope.showMessage = function(input) {
        var show = input.$invalid && (input.$dirty || input.$touched);
        return show;
      };

      $scope.saveusercomments = function(usercomments)
      {
          console.log(usercomments);
          usercomments.iduser = $rootScope.idclient;
          usercommentsService.createusercomments(usercomments).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
        })
      }
    
});
