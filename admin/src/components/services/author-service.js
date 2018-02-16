app.service("authorService",function($http,$q){

    var authorServiceObj={
        getAuthorDetails: function (id) {
            var defer = $q.defer();
            
            $http.get("/admin/src/api/author-select.php?id="+id)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("service17");
            return defer.promise;
        },
        createAuthor:function(values)
        {
            var defer = $q.defer();
            console.log("authorcreateservice");
            $http.post("/admin/src/api/author-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        },

        updateAuthor:function(id,values)
        {
            var defer = $q.defer();
            console.log("authorupdateservice");
            $http.put("/admin/src/api/author-update.php?id="+id,values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
            console.log("updateservice45");
            return defer.promise;
        }
    }
    return authorServiceObj;
});