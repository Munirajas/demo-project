app.controller("questionTypeController",function($route,$scope,questionTypeService,$uibModal){
    
    $scope.init = function(){
        $scope.dtOptions = {searching: false };

        questionTypeService.getQuestionTypeDetails().then(function (_res) {

       $scope.questionTypeInfoDetails = _res.qtypeInfo;
       console.log($scope.questionTypeInfoDetails);

      }); 
    }
    $scope.init();

    $scope.addNewQuestionType = function () {
        console.log("sdfgh");
        $scope.questionType = {};
        $scope.idquestionType=0;
        $scope.uibModalInstance = $uibModal.open({
         templateUrl: '/admin/src/components/question-type/question-type.html',
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
      $scope.editQuestionType = function (values) {
        $scope.questionType = values;
        $scope.idquestionType=values.id;
        $scope.uibModalInstance = $uibModal.open({
          templateUrl: '/admin/src/components/question-type/question-type.html',
          scope: $scope,
          resolve: {
            sizeList: function () {
              console.log('resolve');
            }
          }
        });
      }

      $scope.submitForm = function(questionType) {
        var i=0;
        angular.forEach($scope.userForm.$error.required, function(field) {
          field.$setDirty();
          i = 1;
          });

        if(i==0){
          $scope.saveQuestionType(questionType);
        }
      };
      $scope.regularClick = function() {
        alert("OJO: Valida pero no hace Submit!");
      };
      $scope.showMessage = function(input) {
        var show = input.$invalid && (input.$dirty || input.$touched);
        return show;
      };

      $scope.saveQuestionType = function(questionType)
      {
      if( $scope.idquestionType == 0)
      {
          //add
          
          console.log("inside save create");
          questionTypeService.createQuestionType(questionType).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
        })
      }
      else{
          //update
          questionTypeService.updateQuestionType( $scope.idquestionType,questionType).then(function(_res)
          {
            console.log("inside save update");
              $scope.uibModalInstance.dismiss('cancel');
              $route.reload();
          })
      }
    }
});
