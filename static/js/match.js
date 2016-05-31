/**
 * Created by chenhao on 2016/5/25.
 */
var app = require('mslApp');
//撮合市场
//通用数据
app.factory('typedata', function () {
    return {
        goodtype: "0", slgoodtype: "0", xjgoodtype: "0", yjgoodtype: "0", goodsite: ""
    }
});
app.controller('DataList', ['$scope', '$http', '$rootScope', '$stateParams', 'ScrollFixed', 'typedata', function ($scope, $http, $rootScope, $stateParams, ScrollFixed, typedata) {
    $rootScope.pageName = 'box make-box';
    ScrollFixed(true);
    $scope.getData = function () {
        $http.get('/api/v1/tradingMarket', {cache: true})
            .success(function (data) {

                $scope.lists_sl = data.list_SL;
                $scope.lists_xj = data.list_XJ;
                $scope.lists_hg = data.list_HG;

                typedata.goodsite = $stateParams.site ? $stateParams.site : "";
                typedata.goodtype = $stateParams.goodtype ? $stateParams.goodtype : 0;
                typedata.slgoodtype = $stateParams.slgoodtype ? $stateParams.slgoodtype : 0;
                typedata.xjgoodtype = $stateParams.xjgoodtype ? $stateParams.xjgoodtype : 0;
                typedata.yjgoodtype = $stateParams.yjgoodtype ? $stateParams.yjgoodtype : 0;

                $scope.site = $stateParams.site;
                $scope.goodType = $stateParams.goodtype;
                $scope.slgoodType = $stateParams.slgoodtype;
                $scope.xjgoodType = $stateParams.xjgoodtype;
                $scope.yjgoodType = $stateParams.yjgoodtype;
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    //goodtype
    var typeList = [
        {
            name: "现货",
            value: '0'
        },
        {
            name: "远期货",
            value: '1'
        }
    ];
    $scope.typeList = typeList;

    $scope.goodTypes = function (index) {
        $scope.goodType = typeList[index].value;
    };
    $scope.slgoodTypes = function (index) {
        if (index == 'null') {
            $scope.slgoodType = 0
        } else {
            $scope.slgoodType = $scope.lists_sl[index].columnValueEnum;
        }
    };
    $scope.xjgoodTypes = function (index) {
        if (index == 'null') {
            $scope.xjgoodType = 0
        } else {
            $scope.xjgoodType = $scope.lists_xj[index].columnValueEnum;
        }
    };
    $scope.yjgoodTypes = function (index) {
        if (index == 'null') {
            $scope.yjgoodType = 0
        } else {
            $scope.yjgoodType = $scope.lists_hg[index].columnValueEnum;
        }

    }
//search
    $scope.search = function () {
        window.location.href = "/#/match/" + $scope.goodType + "/" + $scope.slgoodType + "/" + $scope.xjgoodType + "/" + $scope.yjgoodType + "/" + $scope.site;
    }
}]);

app.controller('DataList_sll', ['$scope', '$http', '$stateParams', 'typedata', function ($scope, $http, $stateParams, typedata) {
    $scope.getData = function () {
        var goodtypes = typedata.goodtype ? typedata.goodtype : "";
        var slgoodtypes = typedata.slgoodtype ? typedata.slgoodtype : "";//塑料子类
        var cateParentId = 1;
        var site = typedata.goodsite ? typedata.goodsite : "";
        var selPage = $scope.selPage ? $scope.selPage : "1";
        $http.get("/api/v1/queryBillSell?pageSize=6&pageIndex=" + selPage + "&typeBill=" + goodtypes + "&cateParentId=" + cateParentId + "&cateId=" + slgoodtypes + "&houseName=" + site, {cache: true})
            .success(function (data) {
                $scope.boxs = data.list;
                $scope.total = data.total;
                $scope.page(selPage);
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    $scope.page = function (num) {
        var pagenum = parseInt(num);
        //分页总数
        $scope.pageSize = 6;
        $scope.pages = Math.ceil($scope.total / $scope.pageSize);
        $scope.newPages = $scope.pages > 6 ? 6 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = pagenum;
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.isActivePage(page);
            $scope.getData();
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
}]);
app.controller('DataList_slr', ['$scope', '$http', '$stateParams', 'typedata', function ($scope, $http, $stateParams, typedata) {
    $scope.getData = function () {
        var goodtypes = typedata.goodtype ? typedata.goodtype : "";
        var slgoodtypes = typedata.slgoodtype ? typedata.slgoodtype : "";//塑料子类
        var cateParentId = 1;
        var site = typedata.goodsite ? typedata.goodsite : "";
        var selPage = $scope.selPage ? $scope.selPage : "1";
        $http.get("/api/v1/queryBillBuy?pageSize=3&pageIndex=" + selPage + "&typeBill=" + goodtypes + "&cateParentId=" + cateParentId + "&cateId=" + slgoodtypes + "&houseName=" + site, {cache: true})
            .success(function (data) {
                $scope.boxs = data.list;
                $scope.total = data.total;
                $scope.page(selPage);
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    $scope.page = function (num) {
        var pagenum = parseInt(num);
        //分页总数
        $scope.pageSize = 3;
        $scope.pages = Math.ceil($scope.boxs.length / $scope.pageSize);
        $scope.newPages = $scope.pages > 3 ? 3 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = pagenum;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.boxs.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            //过当前页数筛选出表格当前显示数据
        }
        $scope.items = $scope.boxs.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            $scope.getData();
            //
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
}]);
app.controller('DataList_xjl', ['$scope', '$http', '$stateParams', 'typedata', function ($scope, $http, $stateParams, typedata) {
    $scope.getData = function () {
        var goodtypes = typedata.goodtype ? typedata.goodtype : "";
        var xjgoodtypes = typedata.xjgoodtype ? typedata.xjgoodtype : "";//橡胶子类
        var cateParentId = 5;
        var site = typedata.goodsite ? typedata.goodsite : "";
        var selPage = $scope.selPage ? $scope.selPage : "1";
        $http.get("/api/v1/queryBillSell?pageSize=6&pageIndex=" + selPage + "&typeBill=" + goodtypes + "&cateParentId=" + cateParentId + "&cateId=" + xjgoodtypes + "&houseName=" + site, {cache: true})
            .success(function (data) {
                $scope.boxs = data.list;
                $scope.total = data.total;
                $scope.page(selPage);
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    $scope.page = function (num) {
        var pagenum = parseInt(num);
        //分页总数
        $scope.pageSize = 6;
        $scope.pages = Math.ceil($scope.total / $scope.pageSize);
        $scope.newPages = $scope.pages > 6 ? 6 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = pagenum;
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.isActivePage(page);
            $scope.getData();
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
}]);
app.controller('DataList_xjr', ['$scope', '$http', '$stateParams', 'typedata', function ($scope, $http, $stateParams, typedata) {
    $scope.getData = function () {
        var goodtypes = typedata.goodtype ? typedata.goodtype : "";
        var xjgoodtypes = typedata.xjgoodtype ? typedata.xjgoodtype : "";//橡胶子类
        var cateParentId = 5;
        var site = typedata.goodsite ? typedata.goodsite : "";
        var selPage = $scope.selPage ? $scope.selPage : "1";
        $http.get("/api/v1/queryBillBuy?pageSize=3&pageIndex=" + selPage + "&typeBill=" + goodtypes + "&cateParentId=" + cateParentId + "&cateId=" + xjgoodtypes + "&houseName=" + site, {cache: true})
            .success(function (data) {
                $scope.boxs = data.list;
                $scope.total = data.total;
                $scope.page(selPage);
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    $scope.page = function (num) {
        var pagenum = parseInt(num);
        //分页总数
        $scope.pageSize = 3;
        $scope.pages = Math.ceil($scope.total / $scope.pageSize);
        $scope.newPages = $scope.pages > 6 ? 6 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = pagenum;
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.isActivePage(page);
            $scope.getData();
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
}]);
app.controller('DataList_yjl', ['$scope', '$http', '$stateParams', 'typedata', function ($scope, $http, $stateParams, typedata) {
    $scope.getData = function () {
        var goodtypes = typedata.goodtype ? typedata.goodtype : "";
        var yjgoodtypes = typedata.yjgoodtype ? typedata.yjgoodtype : "";//化工子类
        var cateParentId = 4;
        var site = typedata.goodsite ? typedata.goodsite : "";
        var selPage = $scope.selPage ? $scope.selPage : "1";
        $http.get("/api/v1/queryBillSell?pageSize=6&pageIndex=" + selPage + "&typeBill=" + goodtypes + "&cateParentId=" + cateParentId + "&cateId=" + yjgoodtypes + "&houseName=" + site, {cache: true})
            .success(function (data) {
                $scope.boxs = data.list;
                $scope.total = data.total;
                $scope.page(selPage);
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    $scope.page = function (num) {
        var pagenum = parseInt(num);
        //分页总数
        $scope.pageSize = 6;
        $scope.pages = Math.ceil($scope.total / $scope.pageSize);
        $scope.newPages = $scope.pages > 6 ? 6 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = pagenum;
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.isActivePage(page);
            $scope.getData();
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
}]);
app.controller('DataList_yjr', ['$scope', '$http', '$stateParams', 'typedata', function ($scope, $http, $stateParams, typedata) {
    $scope.getData = function () {
        var goodtypes = typedata.goodtype ? typedata.goodtype : "";
        var yjgoodtypes = typedata.yjgoodtype ? typedata.yjgoodtype : "";//化工子类
        var cateParentId = 4;
        var site = typedata.goodsite ? typedata.goodsite : "";
        var selPage = $scope.selPage ? $scope.selPage : "1";
        $http.get("/api/v1/queryBillBuy?pageSize=3&pageIndex=" + selPage + "&typeBill=" + goodtypes + "&cateParentId=" + cateParentId + "&cateId=" + yjgoodtypes + "&houseName=" + site, {cache: true})
            .success(function (data) {
                $scope.boxs = data.list;
                $scope.total = data.total;
                $scope.page(selPage);
            })
            .error(function (data) {
            });
    }
    $scope.getData();
    $scope.page = function (num) {
        var pagenum = parseInt(num);
        //分页总数
        $scope.pageSize = 3;
        $scope.pages = Math.ceil($scope.total / $scope.pageSize);
        $scope.newPages = $scope.pages > 6 ? 6 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = pagenum;
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.isActivePage(page);
            $scope.getData();
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
}]);

//active效果
app.directive('checkActive', function () {
    return {
        restrict: 'A',
        scope: {
            checkActive: '@'
        },
        link: function ($scope, $element, $attrs) {
            $element.on('click', function () {
                $element.parent().find("li").removeClass($scope.checkActive);
                $element.addClass($scope.checkActive);
            });
        }
    };
});
app.directive('toggleClass', function () {
    return {
        restrict: 'A',
        scope: {
            toggleClass: '@'
        },
        link: function ($scope, $element, $attrs) {
            $element.on('click', function () {
                $element.parent().find("a").removeClass($scope.toggleClass);
                $element.addClass($scope.toggleClass);
            });
        }
    };
});

app.directive('typeName',function(){
    return {
        restrict: 'A',
        scope: {
            typeName: '@'
        },
        link: function ($scope, $element) {
            if($scope.typeName==0){
                $element.html("买家自提");
            }else if($scope.typeName==1){
                $element.html("卖家送货");
            }

        }

    };
});