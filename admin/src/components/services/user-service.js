app.service("userService",function($http,$q){

    var userServiceObj={ 
        getUserDetails: function (id) {
            console.log("without paramenter");
            var defer = $q.defer();
            $http.get("/admin/src/api/user-select.php?id="+id)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("service17");
            return defer.promise;
        },
        getUserDetails1: function (id) {
            var defer = $q.defer();
            
            $http.get("/admin/src/api/user-select.php?id="+id)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("service17");
            return defer.promise;
        },
        createUser:function(values)
        {
            var defer = $q.defer();
            console.log("usercreateservice");
            $http.post("/admin/src/api/user-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        },

        updateUser:function(id,values)
        {
            var defer = $q.defer();
            console.log("userupdateservice");
            $http.put("/admin/src/api/user-update.php?id="+id,values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
            console.log("updateservice45");
            return defer.promise;
        },
        getUserDetailsId:function(id){
            var defer = $q.defer();
            $http.get("/admin/src/api/clientpdf-select.php?id="+id)
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