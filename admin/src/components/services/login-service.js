app.service("loginService",function($http,$q){
    var dataObj={
        checkUser: function(admin) {
            var defer = $q.defer();
            
            $http.post("/admin/src/api/valid-select.php",admin).then(function (success) {
            defer.resolve(success.data);
                    }, function (error) {
                    defer.resolve("Error");
                    });
                     console.log("admin");
                    return defer.promise;
        }
    }
    return dataObj;
});
