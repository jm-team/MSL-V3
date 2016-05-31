/**
 * Created by chenhao on 2016/5/25.
 */
var app = require('mslApp');
//起止日期选择
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

//行情中心列表
app.controller("TradeNewsController",['$scope','$http','$rootScope','ScrollFixed', function ($scope, $http, $rootScope, ScrollFixed) {
    $rootScope.pageName = 'box trade-box';
    ScrollFixed(true);
    var start = $scope.startdate ? $scope.startdate.getFullYear() + "-" + ($scope.startdate.getMonth() + 1) + "-" + $scope.startdate.getDate() : "";
    var end = $scope.enddate ? $scope.enddate.getFullYear() + "-" + ($scope.enddate.getMonth() + 1) + "-" + $scope.enddate.getDate() : "";
    var key = $scope.keyword ? $scope.keyword : "";
    $scope.getData = function () {
        $http.get('/api/v1/loadMarketList?startDate=' + start + '&enddate=' + end + '&title=' + key,
            {cache: true})
            .success(function (data) {
                $scope.list_sl = data.list_sl;
                $scope.list_xj = data.list_xj;
                $scope.list_yjhg = data.list_yjhg;
            })
            .error(function (data) {
            })
    }
    $scope.getData();
    $scope.search = function () {
        if ($scope.startdate) {
            var startDate = $scope.startdate.getTime() / 1000;
        } else {
            return false;
        }
        if ($scope.enddate) {
            var endDate = $scope.enddate.getTime() / 1000;
        } else {
            return false;
        }
        if ($scope.keyword) {
            var keyWord = $scope.keyword;
        } else {
            var keyWord = "";
        }
        //跳转到搜索结果页
        window.open("/#/pricemore/999/" + startDate + "/" + endDate + "/" + encodeURIComponent(keyWord));
    }
}]);