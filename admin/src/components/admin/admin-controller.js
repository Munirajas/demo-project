app.controller("adminController", function ($route,$scope,adminService,$uibModal){
  
    $scope.init = function(){
        
      adminDetails();
    }
$scope.dtOptions = {searching: false };
    function adminDetails(){
      adminService.getAdminDetails().then(function (_res) {

        $scope.adminInfoDetails = _res.adminInfo;
        console.log($scope.adminInfoDetails);

      }); 
    }
    $scope.init();

    $scope.addNewAdmin = function () {
        console.log("sdfgh");
        $scope.admin = {};
        $scope.idadmin=0;
        $scope.uibModalInstance = $uibModal.open({
         templateUrl: '/admin/src/components/admin/admin.html',
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
       $route.reload();
      }
      $scope.editAdmin = function (values) {
        $scope.admin = values;
        $scope.idadmin=values.id;
        $scope.uibModalInstance = $uibModal.open({
          templateUrl: '/admin/src/components/admin/admin.html',
          scope: $scope,
          resolve: {
            sizeList: function () {
              console.log('resolve');
            }
          }
        });
      }

      $scope.submitForm = function(admin) {
        var i=0;
        angular.forEach($scope.userForm.$error.required, function(field) {
          field.$setDirty();
          i = 1;
          });

        if(i==0){
          $scope.saveAdmin(admin);
        }
      };
      $scope.regularClick = function() {
        alert("OJO: Valida pero no hace Submit!");
      };
      $scope.showMessage = function(input) {
        var show = input.$invalid && (input.$dirty || input.$touched);
        return show;
      };

      $scope.saveAdmin = function(admin)
      {
      if( $scope.idadmin == 0)
      {
          //add
          
          console.log("inside save create");
          adminService.createAdmin(admin).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
        })
      }
      else{
          //update
          adminService.updateAdmin( $scope.idadmin,admin).then(function(_res)
          {
            console.log("inside save update");
              $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
          })
      }
    }
});
