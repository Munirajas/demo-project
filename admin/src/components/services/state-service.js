app.service("stateService",function($http,$q){

    var stateServiceObj={
        getStateDetails: function () {
            var defer = $q.defer();
            
            var endPoint = "/admin/src/api/state-select.php";
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
        createState:function(values)
        {
            var defer = $q.defer();
            console.log("statecreateservice");
            $http.post("/admin/src/api/state-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        },

        updateState:function(id,values)
        {
            var defer = $q.defer();
            console.log("stateupdateservice");
            $http.put("/admin/src/api/state-update.php?id="+id,values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
            console.log("updateservice45");
            return defer.promise;
        }
    }
    return stateServiceObj;
});