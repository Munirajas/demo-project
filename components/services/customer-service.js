app.service('customerService',['$http','restFactory','$q', function($http,restFactory,$q) {	
        

         var customerObj = {

       getAllCustomer : function(userId) {
         var defer = $q.defer();
            var detail = [];
         var endPoint = "API/customer-details.php?iduser="+userId;//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
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
       searchCustomerMobile : function(customerData) {
         var defer = $q.defer();
            var detail = [];
          $http.post('API/customer-search.php', customerData )
  .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;

       

        //return defer.promise;
       },
       getAllInvoiceForDateRange : function(invoiceData) {
         var defer = $q.defer();
            var detail = [];
          $http.post('API/invoice-list.php', invoiceData )
  .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;

       

        //return defer.promise;
       },
        generateInvoice : function(invoiceData) {
         var defer = $q.defer();
            var detail = [];
          $http.post('API/customer.php', invoiceData )
  .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;

       

        //return defer.promise;
       },
       
       getInvoiceDetails : function(invoiceId) {
         var defer = $q.defer();
           var endPoint = "API/invoice-details.php?invoiceId="+invoiceId;//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
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

       printInvoice : function(invoiceId) {
         var defer = $q.defer();
         console.log(invoiceId);
           var endPoint = "API/generate-pdf.php?invoiceId="+invoiceId;//+ activityId + '?startDate=' + fromDates + '&endDate=' + toDates + '&status=' + type+'&format=true';
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

       updateInvoice : function(invoiceData) {
         var defer = $q.defer();
            var detail = [];
          $http.post('API/update-invoice.php', invoiceData )
  .then(function (success) {
                       defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
                });
         
            return defer.promise;

       

        //return defer.promise;
       },

    }
       return customerObj;


}]);

