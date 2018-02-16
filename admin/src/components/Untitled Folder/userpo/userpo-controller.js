app.controller('userpoController',function($scope,$route,$rootScope,userpoService,$uibModal){
  var createdetails = JSON.parse(localStorage.getItem("User"));
                        $scope.dtOptions = {searching: false };

                        $scope.submitForm = function(userpo) {
                            var i=0;
                            angular.forEach($scope.userForm.$error.required, function(field) {
                              field.$setDirty();
                              i = 1;
                              });
                    
                            if(i==0){
                              $scope.saveUserPo(userpo);
                            }
                          };
                          $scope.regularClick = function() {
                            alert("OJO: Valida pero no hace Submit!");
                          };
                          $scope.showMessage = function(input) {
                            var show = input.$invalid && (input.$dirty || input.$touched);
                            return show;
                          };
                          $scope.saveUserPo = function(userpo)
                          {
                            userpo.iduser = $rootScope.idclient;
                            userpo.createdBy = createdetails.User.validInfo[0].id;
                        console.log(userpo);
                        userpoService.createUserPo(userpo).then(function(_res)
                        {
                            $scope.uibModalInstance.dismiss('cancel');
                            $route.reload();
                        })
                      }

      }); 