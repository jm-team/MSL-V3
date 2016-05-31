/**
 * Created by chenhao on 2016/5/26.
 */
var app = require('mslApp');
//登录页面
app.controller('LoginCtrls', ['$scope', '$http', '$rootScope', 'ScrollFixed', function ($scope, $http, $rootScope, ScrollFixed) {
    $rootScope.pageName = 'box login-box';
    ScrollFixed(false);
    $scope.src = "dsw/images/banner_01.jpg";
}]);
//获取显示一页最小高度(login 专用)
app.directive('maxHight',["$window", function ($window) {
    return {
        restrict: 'A',
        scope: {
            maxhight: '@'
        },
        link: function (a, b) {
            //窗口高度
            var winHeight = angular.element($window).height();
            //头部高度
            var topHeight =42;
            //底部高度
            var footHeight =340;
            b.height(winHeight-42-340);
        }
    }
}]);
