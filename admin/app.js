var app = angular.module('mainApp',['ngRoute',
'Admin',
'Login',
'Author',
'ngFileUpload',
'datatables',
  'ui.bootstrap'])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options, tinyInstance,
          updateView = function () {
            ngModel.$setViewValue(elm.val());
            if (!scope.$$phase) {
              scope.$apply();
            }
          };
        // generate an ID if not present
        if (!attrs.id) {
          attrs.$set('id', 'uiTinymce' + generatedIds++);
        }

        if (attrs.uiTinymce) {
          expression = scope.$eval(attrs.uiTinymce);
        } else {
          expression = {};
        }
        options = {
          // Update model when calling setContent (such as from the source editor popup)
          setup: function (ed) {
            var args;
            ed.on('init', function (args) {
              ngModel.$render();
            });
            // Update model on button click
            ed.on('ExecCommand', function (e) {
              ed.save();
              updateView();
            });
            // Update model on keypress
            ed.on('KeyUp', function (e) {
              ed.save();
              updateView();
            });
            // Update model on change, i.e. copy/pasted text, plugins altering content
            ed.on('SetContent', function (e) {
              if (!e.initial) {
                ed.save();
                updateView();
              }
            });
            if (expression.setup) {
              scope.$eval(expression.setup);
              delete expression.setup;
            }
          },
          mode: 'exact',
          elements: attrs.id
        };
        // extend options with initial uiTinymceConfig and options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression);
        setTimeout(function () {
          tinymce.init(options);
        });


        ngModel.$render = function () {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
          if (tinyInstance) {
            tinyInstance.setContent(ngModel.$viewValue || '');
          }
        };
      }
    };
  }]);



app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/admin/login', {
    templateUrl: '/admin/src/components/login/login.html',
    controller: 'loginController'
  })
  .when('/admin/admin', {
    templateUrl: '/admin/src/components/admin/admin-list.html',
    controller: 'adminController'
  })

  .when('/admin/question-type', {
    templateUrl: '/admin/src/components/question-type/question-type-list.html',
    controller: 'questionTypeController'
  })

  .when('/admin/state', {
    templateUrl: '/admin/src/components/state/state-list.html',
    controller: 'stateController'
  })

.when('/admin/support', {
  templateUrl: '/admin/src/components/support/support-list.html',
  controller: 'supportController'
})
.when('/admin/user', {
  templateUrl: '/admin/src/components/user/user-list.html',
  controller: 'userController'
})
.when('/admin/question', {
  templateUrl: '/admin/src/components/question-answer/question-answer-list.html',
  controller: 'questionAnswerController'
})
.when('/admin/bundle', {
  templateUrl: '/admin/src/components/bundle/bundle-list.html',
  controller: 'bundleController'
})
.when('/admin/author', {
  templateUrl: '/admin/src/components/author/author-list.html',
  controller: 'authorController'
})
.when('/admin/userpo', {
  templateUrl: '/admin/src/components/userpo/userpo.html',
  controller: 'userpoController'
})
.when('/admin/usercomments', {
  templateUrl: '/admin/src/components/usercomments/usercomments.html',
  controller: 'usercommentsController'
})
.when('/admin/clientpdf', {
  templateUrl: '/admin/src/components/clientpdf/clientpdf.html',
  controller: 'clientpdfController'
});


$locationProvider.html5Mode(true);

});
app.controller('mainController', function ($scope, $rootScope, $location, $window){
  

  var string = $location.absUrl(),
    substring = "login";

    console.log(string);
    console.log(substring);
    
  if (string.indexOf(substring) > 0) {
    console.log("if");
    $rootScope.hidemenu = false;

  } else {
    console.log("else");
    $rootScope.hidemenu = true;
  }


  $rootScope.logOut = function () {

    localStorage.removeItem('User');
    $window.location.href = '/admin/login';
  }

  }); 