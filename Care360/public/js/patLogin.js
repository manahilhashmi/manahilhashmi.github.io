
(function() {
  var app = angular.module('myApp', ['ui.router']);

  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
          console.log('Changed state to: ' + toState);
      });

      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'login.html',
        controller : 'LoginController'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'register.html',
         controller: 'RegisterController'
       })
      .state('home', {
        url : '/home',
        templateUrl : 'home.html',
        controller : 'HomeController'
      });
  }]);

  app.controller('LoginController', function($window,$http,$scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Login";
    $scope.formSubmit=function(){
    var req={
            method:'POST',
            url:'/patient/patLog',
            headers:{'Content-type':'application/json'},
            data:{username:$scope.username,password:$scope.password}
        }
        $http(req).then(function(res){
        if(res.data.message=="Invalid password"){
            $scope.error="Invalid password"
        }
        else if(res.data.message=="authenticated"){
            $window.location.href='/patient/' 
        }
        })
    }

});

  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Login";

  });

  app.controller('RegisterController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Register";
    if(LoginService.register()) {

        $state.transitionTo('home');
      }


  });
 
  app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    return {
      login : function($http,username, password) {
          var req={
            method:'POST',
            url:'/patient/patLog',
            headers:{'Content-type':'application/json'},
            data:{username:username,password:password}
          }
         $http(req).then(function(res){
             console.log("succes wala")
             console.log(res.data)
         },function(req,res){
             console.log("failure wala")
             console.log(res)
         })
      },
      register: function() {
        isAuthenticated = true
    },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };

  });

})();
