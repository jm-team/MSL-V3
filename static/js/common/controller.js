/**
 * Created by zhengbin on 2016/5/24.
 */
var app = require('mslApp');
// topbar
app.controller('TopbarCtrl', ['$scope', '$modal', '$log', '$cookieStore', '$http', function ($scope, $modal, $log, $cookieStore, $http) {
    $http.get('/api/v1/loadAdminBean')
        .success(function (response) {
            $scope.adminBean = response;
            $scope.isLogin = !response.adminBean;
            //$scope.$parent.isNotLogin = !!response.adminBean;
        });

    //退出
    $scope.loginOut = function () {
        $cookieStore.put('userType', '', {expires: -1});

        $http({
            method: 'POST',
            url: '/login.do?action=newlogout',
            data: '',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                }

                return str.join("&");
            }
        }).success(function (response) {
            if (!!response.adminBean) {
                location.reload();
            }
        });
    };
    //弹窗
    $scope.items = ["1", "2", "3"];
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: '/dist/tpl/login/loginbox.html',
            controller: 'LoginBoxCtrls',
            resolve: {
                //向弹窗传值
                items: function () {
                    return $scope.items;
                },
                ch: function () {
                    return 1;
                }
            }
        });
        //弹窗关闭返回 第一个 function为 ok 第二个 function 为 cancal
        modalInstance.result.then(function (str) {
            alert(str);
        },function(){
            alert("你即将关闭!");
        })
    }

}]);

// head-search
app.controller('SearchBoxCtrl', ['$scope', '$http', function ($scope, $http) {
    var typeList = [
        {
            name: "撮合市场",
            value: '市场'
        },
        {
            name: "自营商城",
            value: '商城'
        }
    ];
    $scope.isMouseover = false;
    $scope.typeList = typeList;
    $scope.selectType = function (index) {
        $scope.searchType = typeList[index].value;
        $scope.searchTypeName = typeList[index].name;
    };
    $scope.selectType(0);
    $scope.indexSearch = function (index) {
        var text = $scope.searchText ? $scope.searchText : "";
        if ($scope.searchType == "市场") {
            window.open("/#/match/0/0/0/0/" + text);
        } else {
            window.open("FrontSell.do?action=gy&goodsname=" + text);
        }
    }
}]);

//footer
app.controller("FooterController", ['$scope', '$http', function ($scope, $http) {
    $http.get('../api/v1/loadFooterData', {cache: true})
        .success(function (data) {
            console.log(data);
            $scope.footerData = data;
        })
        .error(function (data) {
        });
}]);

//public
app.controller("PublishController", ['$scope', '$http', function ($scope, $http) {
    $scope.publishData = {
        heading: '橡胶报价',
        list: [
            {url: '/BillResources.do?action=addbuyinit', name: '发布采购'}, {url: '/BillResources.do?action=addsellinit', name: '发布供应'}
        ]
    };
}]);

//loginbox
app.controller("LoginBoxCtrls", ['$scope', '$modalInstance', 'items', 'ch', function ($scope, $modalInstance, items, ch) {
    $scope.items = items;
    $scope.selected = {
        item1: $scope.items[0],
        item2: $scope.items[1],
        item3: $scope.items[2]
    }
    $scope.ok = function () {
        $modalInstance.close(ch);
    }
    $scope.cancal = function () {
        $modalInstance.dismiss('cancal');
    }

}]);