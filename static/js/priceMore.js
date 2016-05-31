/**
 * Created by chenhao on 2016/5/25.
 */
// 显示固定头部 fixed-header
//app.directive("uiScrollBackFixed", ["$window", function ($window) {
//    return {
//        restrict: "A",
//        scope: false,
//        link: function (c, d) {
//            var $w = angular.element($window);
//            var $b = angular.element('body');
//            $b.toggleClass('box', true);
//            d.fadeIn();
//            $w.on('scroll', function () {
//                var topTo = d.outerHeight() * 2 + 42;
//                var winTop = $w.scrollTop();
//                var isShowFixedHeader = winTop >= topTo;
//
//                d.toggleClass('header-fixed', isShowFixedHeader);
//                $b.toggleClass('J_headerFixed', isShowFixedHeader);
//            })
//        }
//    }
//}]);
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

//行情中心更多(报价)
app.controller("NewsController",['$scope','$http','$rootScope','ScrollFixed','$stateParams', function ($scope, $http, $rootScope, ScrollFixed,$stateParams) {
    $rootScope.pageName = 'box news-box';
    ScrollFixed(true);
    $scope.maxSize = 10;
    $scope.currentPage = 1;

    $scope.startdate = $stateParams.from/1 ? new Date($stateParams.from * 1000 / 1) : "";
    $scope.enddate = $stateParams.to/1 ? new Date($stateParams.to * 1000 / 1) : "";
    $scope.keyword = $stateParams.key/1 ? $stateParams.key : "";

    $scope.getData = function () {
        var end = $scope.enddate ? $scope.enddate.getFullYear() + "-" + ($scope.enddate.getMonth() + 1) + "-" + $scope.enddate.getDate() : "";
        var start = $scope.startdate ? $scope.startdate.getFullYear() + "-" + ($scope.startdate.getMonth() + 1) + "-" + $scope.startdate.getDate() : "";
        var key = $scope.keyword ? $scope.keyword : "";
        var quotesType = $stateParams.quotesType ? $stateParams.quotesType : "";
        if (quotesType == '0') {
            $scope.typename = "塑料";
        } else if (quotesType == '2') {
            $scope.typename = "橡胶";
        } else if (quotesType == '3') {
            $scope.typename = "有机化工";
        } else if (quotesType == '999') {
            $scope.typename = "行情";
        }
        $http.get('/api/v1/loadMarketSubList?quotesType=' + quotesType + '&size=' + $scope.maxSize + '&number=' + $scope.currentPage + '&from=' + start + '&to=' + end + '&key=' + key,
            {cache: true})
            .success(function (data) {
                console.log(data);
                $scope.newsitems = data.list;
                $scope.totalItems = data.total;
                $scope.currentPage = data.number;
            })
            .error(function (data) {
            })
    }

    $scope.pageChanged = function () {
        $scope.getData();
    };
    $scope.pageChanged();
    $scope.search = function () {
        $scope.currentPage = 1;
        $scope.getData();
    }
}]);