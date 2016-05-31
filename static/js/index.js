/**
 * 聚贸化工V3
 * 首页banner
 */
var app = require('mslApp');
// 首页登录 index-login
app.directive("indexLogin", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/index/login.html',
        replace: true
    }
}]);

// 首页市场动态 index-trends
app.directive("indexTrends", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/index/trends.html',
        replace: true
    }
}]);

// 首页 controller
app.controller('IndexCtrl', ['$scope', '$http', '$rootScope', 'ScrollFixed', 'ServerUrl', function ($scope, $http, $rootScope, ScrollFixed, ServerUrl) {
    $rootScope.pageName = 'index-box';
    ScrollFixed(false);
    $scope.isNotLogin = true;
    // 初始化页面数据
    $http.get('/api/v1/loadWebImagePrefix')
        .success(function (response) {
            $scope.webImagePath = response.webImagePath;
            $scope.webDomainPath = response.webDomainPath;
            $scope.webImageViewPath = response.webImageViewPath;
        });

    // 塑料分类
    $http.get('/api/v1/loadCateData')
        .success(function (response) {
            // 塑料
            $scope.goodsHotList13 = response.goodsHotList13;
            $scope.goodsHotList21 = response.goodsHotList21;
            // 橡胶
            $scope.goodsHotList15 = response.goodsHotList15;
            $scope.goodsHotList17 = response.goodsHotList17;
            // 有机化工
            $scope.goodsHotList11 = response.goodsHotList11;
            $scope.goodsHotList19 = response.goodsHotList19;
        });

    // 撮合市场 今日行情
    $http.get('/api/v1/loadMarket')
        .success(function (response) {
            $scope.marketList = response;
        });

    $scope.marketCategories = [
        {
            name: 'PE',
            value: 'f1',
            listName: 'billSellList',
            id: '1007'
        },
        {
            name: 'PP',
            value: 'f2',
            listName: 'billSellList',
            id: '1005'
        },
        {
            name: 'PVC',
            value: 'f3',
            listName: 'billSellList',
            id: '1006'
        },
        {
            name: '有机化工',
            listName: 'billSellList',
            value: 'f4'
        },
        {
            name: 'HDPE再生料',
            value: 'f6',
            listName: 'billSellListHDPEZSSL',
            id: '1007001'
        },
        {
            name: 'LDPE再生料',
            value: 'f7',
            listName: 'billSellListLDPEZSSL',
            id: '1007002'
        }];
    $scope.marketChangeCategory = function (index) {
        index = index || 0;
        $scope.marketActiveCategory = index;
        $scope.src = "/#/match/0/" + $scope.marketCategories[index].id + "/0/0/";
        if (index == 3) {
            $scope.src = "/#/match/0/0/0/0/"
        }
        var floor = $scope.marketCategories[index].value;
        var listName = $scope.marketCategories[index].listName;
        $http.get('/api/v1/loadTradingMarket?floor=' + floor + '&searchAreaCode=8603')
            .success(function (response) {
                $scope.marketListResult = response[listName];
            });
    };
    $scope.marketChangeCategory();

    // 自营商城
    $scope.categories = [
        {
            name: 'PVC',
            value: 'PVC'
        }, {
            name: 'PE',
            value: 'PE'
        }, {
            name: 'PP',
            value: 'PP'
        }];
    $scope.changeCategory = function (index) {
        index = index || 0;
        $scope.activeCategory = index;

        //$http.get("../mock/loadSelf.json")
        $http.get('/api/v1/loadSelf/' + $scope.categories[index].value)
            .success(function (response) {
                $scope.selfSellResult = response;
            });
    };
    $scope.changeCategory();

    // 热门供应商
    $http.get('/api/v1/loadVendorData')
        .success(function (response) {
            $scope.providerList = [].concat(response.spaceList1F, response.spaceList2F);
        });
}]);

// 首屏轮播图 banner
app.controller('CarouselBannerCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $http.get('/api/v1/loadBannerAdver')
        .success(function (response) {
            $scope.slides = response;
        });
}]);

// 登录 login
app.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', function ($scope, $cookieStore, $http) {
    $scope.showcheck = false;
    $scope.errorcheck = 0;
    // 登录判断
    $scope.login = function () {
        var user = {
            username: $scope.username,
            passWord: $scope.passWord,
            checkcode: ''
        };
        $http({
            method: 'POST',
            url: '/login.do?action=chkLogin',
            data: user,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                }
                return str.join("&");
            }
        }).success(function (response) {
            console.log(response);
            if (response.loginOK == 'OK') {
                //自动登录
                if ($scope.autoLogin == true) {
                    $cookieStore.put('username', user.username, {expires: 30});
                    $cookieStore.put('userType', 0, {expires: 30});
                }
                location.reload();
            } else if (response.loginOK == 'FAULT') {
                alert('用户或密码输入错误,请重新操作');

                $scope.errorcheck = $scope.errorcheck + 1;
                if ($scope.errorcheck >= 3) {
                    $scope.showcheck = true;
                }
            } else if (response.loginOK == 'FAULT1') {
                alert('您好，当前浏览器有客户 登录，请先退出当前用户，再切换其他用户！');
            }
        })
    };

}]);

// 市场动态
app.controller('TrendsCtrl', ['$scope', '$http', 'ServerUrl', '$timeout', function ($scope, $http, ServerUrl, $timeout) {
    var Path = ServerUrl.query();
    Path.then(function (data) {
        $scope.imageViewPath = data.webImagePath;
    });

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $http.get('/api/v1/loadNewsAndBanner')
        .success(function (response) {
            var arr = [];
            var bannerNews = [];

            response.list_hg && response.list_hg.forEach(function (value, key, array) {
                arr.push(value);
                if (key % 3 == 2 || key == array.length - 1) {
                    bannerNews.push(arr);
                    arr = [];
                }
            });

            $scope.slides = bannerNews;
            $scope.newsLeftAdver = response.newsLeftAdver;
            $scope.slhq = response.list_sl;
            $scope.yhhq = response.list_yh;
            $scope.xjhq = response.list_xj;
            $scope.dtzz = response.list_zz;
        }).error(function () {
            console.log(arguments)
        });
}]);
