app.service("adminService",function($http,$q){

        var adminServiceObj={
            getAdminDetails: function () {
                var defer = $q.defer();
                
                var endPoint = "/admin/src/api/admin-select.php";
                $http({
                method: 'GET',
                url: endPoint
                }).then(function (success) {
                defer.resolve(success.data);
                }, function (error) {
                defer.resolve("Error");
                });
               console.log("service17");
                return defer.promise;
            },
            createAdmin:function(values)
            {
                var defer = $q.defer();
                console.log("admincreateservice");
                $http.post("/admin/src/api/admin-insert.php",values)
                .then(function (success) {
                defer.resolve(success.data);
                }, function (error) {
                defer.resolve("Error");
                });
               console.log("createservice30");
                return defer.promise;
            
            },
    
            updateAdmin:function(id,values)
            {
                var defer = $q.defer();
                console.log("adminupdateservice");
                $http.put("/admin/src/api/admin-update.php?id="+id,values)
                .then(function (success) {
                defer.resolve(success.data);
                }, function (error) {
                defer.resolve("Error");
                });
                console.log("updateservice45");
                return defer.promise;
            }
        }
        return adminServiceObj;
    });