app.service("userpoService",function($http,$q){

    var userServiceObj={ 
        createUserPo:function(values)
        {
            console.log(values);
            var defer = $q.defer();
            console.log("usercreateservice");
            $http.post("/admin/src/api/userpo-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        }
    }
    return userServiceObj;
});