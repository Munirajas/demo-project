
app.service('audienceService',['$http','$q', 'restFactory', function($http, $q, restFactory) { 
        
        var eventObj = {
                getAllEvents : function() {
                  var defer = $q.defer();
                  var detail = [];
                  var endPoint = "API/eventlist.php";
                  $http({
                           method : 'GET',
                           url : endPoint
                         }).then(function (success) {
                                defer.resolve(success.data);
                         },function(error){
                             defer.resolve("Error");
                         });
                  
                     return defer.promise;
         
            }
        }

       return eventObj;
       
}]);

