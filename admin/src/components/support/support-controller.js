app.controller("supportController",function($route,$scope,supportService,$uibModal){
  
    $scope.init = function(){
                $scope.dtOptions = {searching: false };

        supportService.getSupportDetails().then(function (_res) {

       $scope.supportInfoDetails = _res.supportInfo;
       console.log($scope.supportInfoDetails);

      }); 

      
    }
    $scope.init();

    $scope.addNewSupport = function () {
        console.log("sdfgh");
        $scope.support = {};
        $scope.idsupport=0;
        $scope.uibModalInstance = $uibModal.open({
         templateUrl: '/admin/src/components/support/support.html',
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
      $scope.editSupport = function (values) {
        $scope.support = values;
        $scope.idsupport=values.id;
        $scope.uibModalInstance = $uibModal.open({
          templateUrl: '/admin/src/components/support/support.html',
          scope: $scope,
          resolve: {
            sizeList: function () {
              console.log('resolve');
            }
          }
        });
      }

      $scope.submitForm = function(support) {
        var i=0;
        angular.forEach($scope.userForm.$error.required, function(field) {
          field.$setDirty();
          i = 1;
          });

        if(i==0){
          $scope.saveSupport(support);
        }
      };
      $scope.regularClick = function() {
        alert("OJO: Valida pero no hace Submit!");
      };
      $scope.showMessage = function(input) {
        var show = input.$invalid && (input.$dirty || input.$touched);
        return show;
      };

      $scope.saveSupport = function(support)
      {
        console.log(support);
        var sup = {};
          //add
              sup.name = support.name;
              sup.email = support.email;
              sup.mobile = support.mobile;
              sup.status = support.status;
              sup.designation = support.designation;
              sup.about_presenter = support.about_presenter;
          var file = support.photo;
          console.log(file);
          var fd = new FormData;
          fd.append('file',file);
          fd.append('data',JSON.stringify(sup));
      if( $scope.idsupport == 0)
      {
          //add
         console.log("inside save create");
          supportService.createSupport(fd).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
        })
      }
      else{
          //update
          supportService.updateSupport( $scope.idsupport,fd).then(function(_res)
          {
            console.log("inside save update");
              $scope.uibModalInstance.dismiss('cancel');
              $route.reload();
          })
      }
    }
});
