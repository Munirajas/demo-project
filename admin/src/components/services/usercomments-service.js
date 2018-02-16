app.service("usercommentsService",function($http,$q){

    var usercommentsServiceObj={
        getusercommentsDetails: function (id) {
            var defer = $q.defer();
            
            $http.get("/admin/src/api/usercomments-select.php?id="+id)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("service17");
            return defer.promise;
        },
        createusercomments:function(values)
        {
            var defer = $q.defer();
            console.log("usercommentscreateservice");
            $http.post("/admin/src/api/usercomments-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        }
    }
    return usercommentsServiceObj;
});