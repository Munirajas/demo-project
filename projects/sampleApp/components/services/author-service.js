
app.service('authorService',['$http', 'restFactory','$q', function($http,restFactory,$q) { 
        

         var productObj = {

       getAllAuthors : function() {
         var defer = $q.defer();
            var detail = [];
         var endPoint = "API/author-list.php";//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
         $http({
                  method : 'GET',
                  url : endPoint
                }).then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;

       

        //return defer.promise;
       },

        addAuthor : function(productData) {

         var defer = $q.defer();
            var detail = [];
                      console.log(productData);

                      $http.post('API/author.php', productData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
                   /*   $http.post('API/author.php', productData )

  .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
*/
      /*   var endPoint = "API/product.php";//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
         $http({
                  method : 'POST',
                  url : endPoint
                }).then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });*/
         
            return defer.promise;

       

        //return defer.promise;
       },
      
       updateAuthor: function(productData) {

         var defer = $q.defer();
            var detail = [];
                      console.log(productData);
                      $http.put('API/author-update.php', productData )
  .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });

      /*   var endPoint = "API/product.php";//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
         $http({
                  method : 'POST',
                  url : endPoint
                }).then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });*/
         
            return defer.promise;

       

        //return defer.promise;

    }

    }
       return productObj;


}]);

