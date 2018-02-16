'use strict';

  app.service('loginService', ['$http', 'restFactory','$q', 
  
    function($http, restFactory, $q) { 

       var loginObj = {

          validateLogin : function(data) {
            var defer = $q.defer();
            var detail = [];

             $http.post('API/login.php', data )
              .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;


/*
            var endPoint = "login.php"
            console.log(data);

            restFactory.postService(endPoint, data);
            return defer.promise;*/
          }
      }
       return loginObj;


}]);

