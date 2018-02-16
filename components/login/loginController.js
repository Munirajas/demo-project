angular.module('Login')
  .controller('loginController', function($scope,  $routeParams, loginService) {
    var $ctrl = this;	 	
	
	var userValues = {};

    $scope.checkLogin = function () {
    	console.log($scope.user);
    	loginService.validateLogin($scope.user).then(function(_res) {
           console.log(_res);
    	}); 
    }

});






