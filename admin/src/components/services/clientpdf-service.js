app.service("clientpdfService",function($http,$q){

    var clientpdfServiceObj={
        createClientPdf:function(values)
        {
            var defer = $q.defer();
            console.log("clientpdfcreateservice");
            $http.post("/admin/src/api/clientpdf-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        }
    }
    return clientpdfServiceObj;
});