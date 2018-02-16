

app.service('productService',['$http','restFactory','$q', function($http,restFactory,$q) {	
        

         var productObj = {

       getAllProduct : function(userId) {
         var defer = $q.defer();
            var detail = [];
         var endPoint = "API/product-list.php?iduser="+userId;//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
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

        addProduct : function(productData) {

         var defer = $q.defer();
            var detail = [];
                      console.log(productData);
                      $http.post('API/product.php', productData )
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
       getProducts : function(userId) {
         var defer = $q.defer();
            var detail = [];
         var endPoint = "API/product-list.php?iduser="+userId;//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
         $http({
                  method : 'GET',
                  url : endPoint
                }).then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;
       },
       updateProduct: function(productData) {

         var defer = $q.defer();
            var detail = [];
                      console.log(productData);
                      $http.put('API/product-update.php', productData )
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

