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

//详细内容

app.controller("NewsDetailController",['$scope','$http','$rootScope','ScrollFixed','$stateParams', function ($scope, $http, $rootScope, ScrollFixed,$stateParams) {
    $rootScope.pageName = 'box state-list-box';
    ScrollFixed(true);
    var id = $stateParams.id ? $stateParams.id : "";
    $http.get('/api/v1/loadMarketDetail?id=' + id, {cache: true})
        .success(function (data) {
            console.log(data);
            $scope.newsDetails = data;
        })
        .error(function (data) {
        });
    $http.get('/api/v1/loadWebImagePrefix', {cache: true})
        .success(function (data) {
            console.log(data);
            $scope.srcData = data.webImagePath;
        })
        .error(function (data) {
        });
}]);