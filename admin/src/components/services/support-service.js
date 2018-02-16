app.service("supportService",function($http,$q){

    var supportServiceObj={
        getSupportDetails: function () {
            var defer = $q.defer();
            
            var endPoint = "/admin/src/api/support-select.php";
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
        createSupport:function(fd)
        {
            var defer = $q.defer();
            console.log("supportcreateservice");
            $http.post("/admin/src/api/support-insert.php", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined,'Process-Data': false}
            }).then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        },

        updateSupport:function(id,fd)
        {
            var defer = $q.defer();
            console.log("supportupdateservice");
            $http.post("/admin/src/api/support-update.php", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined,'Process-Data': false}
            }).then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
            console.log("updateservice45");
            return defer.promise;
        }
    }
    return supportServiceObj;
});