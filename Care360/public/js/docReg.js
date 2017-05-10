var myApp = angular.module("myApp", ['ui.router']);
myApp.controller("RegisterCtrl", function ($window,$scope,$http) {
    $scope.user={}
    $scope.formSubmit=function(){
        $http({
            method:'POST',
            url:'/doctor/docReg',
            data:$scope.user,
            headers:{'Content-Type':'application/json'}
        }).success(function(res){
            if (res=="User Created"){
                $window.location.href='/doctor/docLog'
            }
        })
    }
});
