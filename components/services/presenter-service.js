
app.service('presenterService', ['$http','$q', function($http,$q) { 
        

    var presenterObj = {

        postEventQuestion : function(data) {
            var defer = $q.defer();
            var detail = [];

           $http.post('http://www.kavctrust.com/API/post-question.php', data )
                .then(function (success) {
                    defer.resolve(success.data);
                },function(error){
                    defer.resolve("Error");
            });
       
            return defer.promise;
        },

        getEventQuestions: function(eventId) {  
            var defer = $q.defer();
            var detail = [];
           $http.get('http://www.kavctrust.com/API/qa.php?id='+eventId)
           .then(function (success) {
               defer.resolve(success.data);
           },function(error) {
               defer.resolve("Error");
            });
  
            return defer.promise;
        },

        postQuestionAnswer: function(data) {
            var defer = $q.defer();
            var detail = [];

           $http.post('http://www.kavctrust.com/API/post-answer.php', data )
                .then(function (success) {
                    defer.resolve(success.data);
                },function(error) {
                    defer.resolve("Error");
            });
       
            return defer.promise;
        }
    }
    
       return presenterObj;
}]);


