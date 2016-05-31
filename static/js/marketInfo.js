/**
 * Created by chenhao on 2016/5/24.
 */
var app = require('mslApp');

app.controller('DateController', ['$scope', '$http', function ($scope, $http) {
    $scope.startMaxDate = $scope.endMaxDate = new Date();
    $scope.dateChange = function (event) {
        $scope.star = $scope.startdate ? $scope.startdate.getTime() : null;
        $scope.endMinDate = new Date($scope.star);
        $scope.end = $scope.enddate ? $scope.enddate.getTime() : null;
        $scope.startMaxDate = $scope.end ? new Date($scope.end) : new Date();
    }
    $scope.open1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = true;
        $scope.opened2 = false;
    };
    $scope.open2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = false;
        $scope.opened2 = true;
    };
}]);

app.controller("MarketDetailController",['$scope','$http','$rootScope','ScrollFixed','$stateParams','ServerUrl', function ($scope, $http, $rootScope, ScrollFixed,$stateParams,ServerUrl) {
    $rootScope.pageName = 'box state-list-box';
    ScrollFixed(true);
    var Path = ServerUrl.query();
    Path.then(function (data) {
        $scope.imageViewPath = data.webImagePath;
    });
    var id = $stateParams.id ? $stateParams.id : "";
    $http.get('/api/v1/loadMarketNews-' + id, {cache: true})
        .success(function (data) {
            $scope.newsDetails = data;
        })
        .error(function (data) {
        });
    $http.get('/api/v1/loadWebImagePrefix', {cache: true})
        .success(function (data) {
            $scope.srcData = data.webImagePath;
        })
        .error(function (data) {
        });
}]);