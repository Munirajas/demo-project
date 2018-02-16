angular.module('Event')
  .controller('eventController', function($scope,$window,  $rootScope, $routeParams, $location, eventService, $timeout) {
    var $ctrl = this;	 	
	
    function getEvents() {
    
      eventService.getAllEvents().then(function(_res) {
          $scope.events = _res;
      }); 
      
    }

    $scope.getEventDetails = function(event) {
      $rootScope.activeEvent = event;
      console.log("event controller");
      console.log(event);
      $location.path('/presenter');
    }

    $scope.getEventToStart = function() {
        
        var timer = '01:01:00'.split(':');
        console.log(timer);
        if (timer.length === 2) timer.unshift(0);
        var endMilli= timer[0]*60*60*1000;
        endMilli += timer[1]*60*1000
        endMilli += timer[2]*1000;

        if(endMilli > 0) {
          var endTime = new Date(Date.now()+endMilli);   
          var tId = setInterval(function() {
            var diff = endTime.getTime()-Date.now();
            if (diff<=0) {
              tCont.html("00:00:00");
              clearInterval(tId);
            }
            else {
              var d = new Date(diff);
              hh = pad(d.getUTCHours()); 
              mm = pad(d.getMinutes());
              ss = pad(d.getSeconds());
              return ""+hh+":"+mm+":"+ss;
            }
          },300);      
        }
    }

    function pad(num) {
      return num<10?"0"+num:num;
    }
    getEvents();

});






