
/*
 * Contains a service to communicate with the TRACK TV API
 */
'use strict';
angular.module('tta')
    .constant('API_KEY', '')
    .constant('BASE_URL', 'http://www.kavctrust.com/API/')
    .factory('restFactory', function($http) {

      return {
        postService : function(_url, _data) {
          return $http({
            method : 'POST',
            url : 'http://www.kavctrust.com/API/' + _url,
            data : JSON.stringify(_data),
            headers : {
              'Content-Type' : 'application/json'
            }
          });
        },
        getService : function(_url) {
          return $http({
            method : 'GET',
            url : 'http://www.kavctrust.com/API/' + _url,
            withCredentials : false,
            headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json'
            }
          });
        },
        putService : function(_url, _data) {
          return $http({
            method : 'PUT',
            url : BASE_URL + _url,
            data : JSON.stringify(_data),
            headers : {
              'Content-Type' : 'application/json'
            }
          });
        }
      };
  });
