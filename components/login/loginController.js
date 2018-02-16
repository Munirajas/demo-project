angular.module('Login')
  .controller('loginController', function($scope,  $routeParams, $location, loginService, socialLoginService) {
    var $ctrl = this;	 	
	
	var userValues = {};

    $scope.checkLogin = function () {
    	console.log($scope.user);
    	loginService.validateLogin($scope.user).then(function(_res) {
		   console.log(_res);
    	}); 
	}
	
	$scope.signout = function() {
    	socialLoginService.logout();
	}

	$scope.$on('event:social-sign-in-success', (event, userDetails)=> {
		$scope.result = userDetails;
		$location.path('/login');
		$scope.$apply();
	});

	$scope.$on('event:social-sign-out-success', function(event, userDetails){
		$scope.result = userDetails;
	});

});






