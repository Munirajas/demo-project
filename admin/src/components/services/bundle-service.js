app.service("bundleService",function($http,$q){

    var bundleServiceObj={
        getBundleDetails: function (id) {
            var defer = $q.defer();
            //console.log(id);
            $http.get("/admin/src/api/bundle-select.php?id="+id)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("service17");
            return defer.promise;
        },
        createBundle:function(values)
        {
            var defer = $q.defer();
            console.log("Bundlecreateservice");
            $http.post("/admin/src/api/bundle-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        },

        updateBundle:function(id,values)
        {
            var defer = $q.defer();
            console.log("Bundleupdateservice");
            $http.put("/admin/src/api/bundle-update.php?id="+id,values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
            console.log("updateservice45");
            return defer.promise;
        }
    }
    return bundleServiceObj;
});