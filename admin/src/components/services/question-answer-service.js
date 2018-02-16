app.service("questionAnswerService",function($http,$q){

        var questionAnswerServiceObj={
            getQuestionAnswerDetails: function () {
                var defer = $q.defer();
                
                var endPoint = "/admin/src/api/question-answer-select.php";
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
            createQuestionAnswer:function(values)
            {
                var defer = $q.defer();
                console.log("questionAnswercreateservice");
                $http.post("/admin/src/api/question-answer-insert.php",values)
                .then(function (success) {
                defer.resolve(success.data);
                }, function (error) {
                defer.resolve("Error");
                });
               console.log("createservice30");
                return defer.promise;
            
            },
    
            updateQuestionAnswer:function(id,values)
            {
                var defer = $q.defer();
                console.log("questionAnswerupdateservice");
                $http.put("/admin/src/api/question-answer-update.php?id="+id,values)
                .then(function (success) {
                defer.resolve(success.data);
                }, function (error) {
                defer.resolve("Error");
                });
                console.log("updateservice45");
                return defer.promise;
            }

        }
        return questionAnswerServiceObj;
    });