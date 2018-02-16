app.controller('clientpdfController',function($scope,$rootScope,clientpdfService,$uibModal){
    
	var createdetails = JSON.parse(localStorage.getItem("User"));
    $scope.closePopUp = function () {
        $scope.uibModalInstance.dismiss('cancel');
      }

	$scope.submitForm = function(client) {
		console.log("9");
		var i=0;
		angular.forEach($scope.userForm.$error.required, function(field) {
		  field.$setDirty();
		  i = 1;
		  });

		if(i==0){
			console.log("asfd");
		  $scope.saveClientPdf(client);
		}
	  };
	  $scope.regularClick = function() {
		alert("OJO: Valida pero no hace Submit!");
	  };
	  $scope.showMessage = function(input) {
		var show = input.$invalid && (input.$dirty || input.$touched);
		return show;
	  };
      $scope.saveClientPdf = function(client)
      {
          console.log(client);
					console.log("inside save create");
					client.iduser = $rootScope.idclient;
					client.createdBy = createdetails.User.validInfo[0].id;
					console.log(client.iduser);
          clientpdfService.createClientPdf(client).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $scope.init();
        })
      }



});





