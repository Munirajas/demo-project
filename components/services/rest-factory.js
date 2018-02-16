angular.module('billing')
  .factory('restFactory', function($http) {

    var apmKey = '';

    return {
      createService : function(_url, _data) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'POST',
          url : _url,
          data : JSON.stringify(_data),
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
      deleteService : function(_url) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'DELETE',
          url : _url,
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
      getPDFService : function(_url) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'GET',
          url : _url,
          withCredentials : false,
          responseType : 'arraybuffer',
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
      getService : function(_url) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'GET',
          url : _url,
          withCredentials : false,
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
      postService : function(_url, _data) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'POST',
          url : _url,
          data : JSON.stringify(_data),
         /* headers : {
            'Content-Type' : 'application/json',
            'Authorization' : apmKey
          }*/
        })
      },
      postPDFService : function(_url, _data) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'POST',
          url : _url,
          data : JSON.stringify(_data),
          responseType : 'arraybuffer',
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
      putService : function(_url, _data) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'PUT',
          url : _url,
          data : JSON.stringify(_data),
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
       deleteServiceWithData : function(_url,_data) {
        apmKey = 'amx1ZWJiZToyYjgxODUzYzMyZjNjNWVhOTBmOTNjZjk5Yjg3YmU2YzA3YTk0ODBk';
        return $http({
          method : 'DELETE',
          url : _url,
          data : JSON.stringify(_data),
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : apmKey
          }
        });
      },
      setAPMKey : function(_key) {

        apmKey = _key;
      }
    };
  });
