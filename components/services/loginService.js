app.service('loginService',['$http','$q', function($http,$q) {	
        

         var loginObj = {

       validateLogin : function(data) {
         var defer = $q.defer();
            var detail = [];
         console.log(data);
         var endPoint = "API/login.php";//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
         $http({
                  method : 'POST',
                  url : endPoint,
                  data : JSON.stringify(data)
                }).then(function (success) {
                      console.log(success)
                        defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;

       

        //return defer.promise;
       }
    }
       return loginObj;


}]);

