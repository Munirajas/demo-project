

app.service('bookService',['$http','restFactory','$q', function($http,restFactory,$q) {	
        

         var productObj = {

       getAllBooks : function(userId) {
         var defer = $q.defer();
         var detail = [];
         var endPoint = "API/book-list.php";//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
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

        addBook : function(productData) {

         var defer = $q.defer();
            var detail = [];
                      console.log(productData);
                      $http.post('API/book.php', productData )
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
       },
      
       updateBook: function(productData) {

         var defer = $q.defer();
            var detail = [];
                      console.log(productData);
                      $http.put('API/book-update.php', productData )
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

