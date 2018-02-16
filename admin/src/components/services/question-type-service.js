app.service("questionTypeService",function($http,$q){

    var questionTypeServiceObj={
        getQuestionTypeDetails: function () {
            var defer = $q.defer();
            
            var endPoint = "/admin/src/api/question-type-select.php";
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
        createQuestionType:function(values)
        {
            var defer = $q.defer();
            console.log("questionTypecreateservice");
            $http.post("/admin/src/api/question-type-insert.php",values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
           console.log("createservice30");
            return defer.promise;
        
        },

        updateQuestionType:function(id,values)
        {
            var defer = $q.defer();
            console.log("questionTypeupdateservice");
            $http.put("/admin/src/api/question-type-update.php?id="+id,values)
            .then(function (success) {
            defer.resolve(success.data);
            }, function (error) {
            defer.resolve("Error");
            });
            console.log("updateservice45");
            return defer.promise;
        }

    }
    return questionTypeServiceObj;
});