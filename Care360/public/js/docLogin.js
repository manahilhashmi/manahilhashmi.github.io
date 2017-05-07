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

  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Login";
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
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
    var url='/docLogin'
    var data =$.param({
       user:username,
       pass:password
    });
    $http.post(url,data)
    .success( function (data,status,headers,config)
      {
        console.log(data)
      })
      .error(function (data,status,headers,config) 
        {
          console.log(data)
        });
    return {
      login : function(username, password) {
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