app.controller('loginController', function ($window, $scope, loginService, $location) {

	$scope.admin = {
		email: '',
		password: ''
	};

	$scope.submitForm = function (admin) {
		var i = 0;
		angular.forEach($scope.loginForm.$error.required, function (field) {
			field.$setDirty();
			i = 1;
		});

		if (i == 0) {
			$scope.formSubmit(admin);
		}
	};
	$scope.regularClick = function () {
		alert("OJO: Valida pero no hace Submit!");
	};
	$scope.showMessage = function (input) {
		var show = input.$invalid && (input.$dirty || input.$touched);
		return show;
	};
	$scope.formSubmit = function (admin) {
		console.log("dsf");
		loginService.checkUser(admin).then(function (_res) {
			console.log("func");
			$scope.User = _res;
			if ($scope.User.status == true) {
				console.log("dsfg");
				localStorage.setItem("User", JSON.stringify({
					User: _res
				}));
				// $scope.createdetails = localStorage.getItem("User");

			//	$location.path('/admin/admin');
				$window.location.href = '/admin/admin';

			} else {
				alert("Invalid User");
			}
		});
	}



});