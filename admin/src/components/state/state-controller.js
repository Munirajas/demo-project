app.controller("stateController",function($scope,stateService,$uibModal,$route){
  var createdetails = JSON.parse(localStorage.getItem("User"));
	var created = createdetails.User.validInfo[0].id;
	var updated = createdetails.User.validInfo[0].id;
    $scope.init = function(){
        
        stateService.getStateDetails().then(function (_res) {

       $scope.stateInfoDetails = _res.stateInfo;
       console.log($scope.stateInfoDetails);

      }); 
    }
    $scope.init();
    $scope.dtOptions = {searching: false };
    $scope.addNewState = function () {
        console.log("sdfgh");
        $scope.state = {};
        $scope.idstate=0;
        $scope.uibModalInstance = $uibModal.open({
         templateUrl: '/admin/src/components/state/state.html',
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
      }
      $scope.editState = function (values) {
        $scope.state = values;
        $scope.idstate=values.id;
        $scope.uibModalInstance = $uibModal.open({
          templateUrl: '/admin/src/components/state/state.html',
          scope: $scope,
          resolve: {
            sizeList: function () {
              console.log('resolve');
            }
          }
        });
      }

      $scope.submitForm = function(state) {
        var i=0;
        angular.forEach($scope.userForm.$error.required, function(field) {
          field.$setDirty();
          i = 1;
          });

        if(i==0){
          $scope.saveState(state);
        }
      };
      $scope.regularClick = function() {
        alert("OJO: Valida pero no hace Submit!");
      };
      $scope.showMessage = function(input) {
        var show = input.$invalid && (input.$dirty || input.$touched);
        return show;
      };

      $scope.saveState = function(state)
      {
      if( $scope.idstate == 0)
      {
          //add
          state.createdBy = created;
          // state.updatedBy = updated;          
          console.log("inside save create");
          stateService.createState(state).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
        })
      }
      else{
          //update
          state.updatedBy = updated;     
          stateService.updateState( $scope.idstate,state).then(function(_res)
          {
            console.log("inside save update");
              $scope.uibModalInstance.dismiss('cancel');
              $route.reload();
          })
      }
    }
});
