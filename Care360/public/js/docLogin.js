
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

  app.controller('LoginController', function($http,$scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Login";

    $scope.formSubmit = function() {
      if(LoginService.login($http,$scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }
    };

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
 
  app.factory('LoginService', function(username,password) {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    return {
      login : function($http,username, password) {
          var req={
            method:'POST',
            url:'/docLog',
            headers:{'Content-type':'application/json'},
            data:{user:username,pass:password}
          }
         $http(req).then(function(req,res){console.log(req)},function(req,res){console.log(res)})
       isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
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
