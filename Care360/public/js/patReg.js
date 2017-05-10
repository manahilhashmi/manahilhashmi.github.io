var myApp = angular.module("myApp", ['ui.router']);
myApp.controller("RegisterCtrl", function ($window,$scope,$http) {
    $scope.user={}
    $scope.formSubmit=function(){
        console.log($scope.user)
        $http({
            method:'POST',
            url:'/patient/patReg',
            data:$scope.user,
            headers:{'Content-Type':'application/json'}
        }).success(function(res){
            if (res=="User Created"){
                $window.location.href='/patient/patLogin'
            }
        })
    }
});
