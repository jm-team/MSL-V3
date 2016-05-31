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

//市场动态
app.controller("ImgNewsController", ['$scope', '$http', '$rootScope', 'ScrollFixed', 'ServerUrl', function ($scope, $http, $rootScope, ScrollFixed, ServerUrl) {
    $rootScope.pageName = 'box market-box';
    ScrollFixed(true);
    $scope.maxSize = 10;
    $scope.currentPage = 1;
    var Path = ServerUrl.query();
    Path.then(function (data) {
        $scope.imageViewPath = data.webImagePath;
    });
    $scope.getData = function () {
        var start = $scope.startdate ? $scope.startdate.getFullYear() + "-" + ($scope.startdate.getMonth() + 1) + "-" + $scope.startdate.getDate() : "";
        var end = $scope.enddate ? $scope.enddate.getFullYear() + "-" + ($scope.enddate.getMonth() + 1) + "-" + $scope.enddate.getDate() : "";
        var key = $scope.keyword ? $scope.keyword : "";
        $http.get('/api/v1/loadMarketNews/' + $scope.currentPage + '?size=' + $scope.maxSize + '&startDate=' + start + '&endDate=' + end + '&title=' + key,
            {cache: true})
            .success(function (data) {
                console.log(data);
                $scope.imgnewsitems = data.list_kg;
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

//装置动态
app.controller("SideNewsController", ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/v1/loadMarketNews/1', {cache: true})
        .success(function (data) {
            console.log(data);
            $scope.sidenewsitems = data.list_zz;
        })
        .error(function (data) {
        });
}]);
