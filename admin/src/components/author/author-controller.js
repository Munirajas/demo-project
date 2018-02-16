angular.module('Author',[])
.controller("authorController",function($route,$scope,supportService,authorService,questionTypeService,$uibModal){
  
    $scope.init = function(){
                        $scope.dtOptions = {searching: false };

        authorService.getAuthorDetails().then(function (_res) {

       $scope.authorInfoDetails = _res.authorInfo;
       console.log($scope.authorInfoDetails);
      }); 

       supportService.getSupportDetails().then(function (_res) {

      $scope.supportInfoDetails = _res.supportInfo;
      console.log($scope.supportInfoDetails);

    });
    }
    $scope.init();

    $scope.addNewAuthor = function () {
        console.log("sdfgh");
        $scope.author = {};
        $scope.idauthor=0;
        $scope.uibModalInstance = $uibModal.open({
         templateUrl: '/admin/src/components/author/author.html',
         scope: $scope,
         resolve: {
         sizeList: function () {
         console.log('resolve');
         }
         }
         });
     }
    
     $scope.closePopUp = function () {
        $scope.uibModalInstance.dismiss('cancel');
       $route.reload();
      }
      $scope.editAuthor = function (value1) {
        $scope.author = value1;
        $scope.idauthor=value1.id;
        authorService.getAuthorDetails($scope.idauthor).then(function (_res) {

          $scope.authorInfoDetails1 = _res.authorInfo;
          console.log($scope.authorInfoDetails1);
          for(i=0;i<$scope.questionTypeInfoDetails.length;i++){
            for(j=0;j<$scope.authorInfoDetails1.length;j++){
              if($scope.questionTypeInfoDetails[i].id==$scope.authorInfoDetails1[j].id_question_type){
                console.log($scope.questionTypeInfoDetails[i]);
                $scope.questionTypeInfoDetails[i]['status'] = true;
              }
            }
          }
   
         });
        $scope.uibModalInstance = $uibModal.open({
          templateUrl: '/admin/src/components/author/author.html',
          scope: $scope,
          resolve: {
            sizeList: function () {
              console.log('resolve');
            }
          }
        });
      }


      $scope.graph = function (value1) {
        


          Highcharts.chart('container', {
              chart: {
                  type: 'pie',
                  options3d: {
                      enabled: true,
                      alpha: 45,
                      beta: 0
                  }
              },
              title: {
                  text: 'Browser market shares at a specific website, 2014'
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      depth: 35,
                      dataLabels: {
                          enabled: true,
                          format: '{point.name}'
                      }
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Browser share',
                  data: [
                      ['Firefox', 45.0],
                      ['IE', 26.8],
                      {
                          name: 'Chrome',
                          y: 12.8,
                          sliced: true,
                          selected: true
                      },
                      ['Safari', 8.5],
                      ['Opera', 6.2],
                      ['Others', 0.7]
                  ]
              }]
          });

        
        $scope.uibModalInstance = $uibModal.open({
          templateUrl: '/admin/src/components/author/graph.html',
          scope: $scope,
          resolve: {
            sizeList: function () {
              console.log('resolve');
            }
          }
        });
      }



      $scope.submitForm = function(author) {
        var i=0;
        angular.forEach($scope.userForm.$error.required, function(field) {
          console.log("dfgh");
          field.$setDirty();
          i = 1;
          });

        if(i==0){
          $scope.saveAuthor(author);
        }
      };
      $scope.regularClick = function() {
        alert("OJO: Valida pero no hace Submit!");
      };
      $scope.showMessage = function(input) {
        var show = input.$invalid && (input.$dirty || input.$touched);
        return show;
      };
      $scope.abc = function(id){
        console.log(id);
      }

      $scope.saveAuthor = function(author)
      {
        
          //add
          
          console.log("inside save create");
          authorService.createAuthor(author).then(function(_res)
        {
            $scope.uibModalInstance.dismiss('cancel');
            $route.reload();
        })
      
    }
});
