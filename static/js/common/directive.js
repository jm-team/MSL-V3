/**
 * Created by zhengbin on 2016/5/24.
 */
var app = require('mslApp');
// msl-topbar
app.directive("mslTopbar", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/common/topbar.html',
        replace: true
    }
}]);

// msl-header
app.directive("mslHeader", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/common/header.html',
        replace: true
    }
}]);

// msl-footer
app.directive("mslFooter", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/common/footer.html',
        replace: true
    }
}]);

// msl-sidebar
app.directive("mslSidebar", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/common/sidebar.html',
        replace: true
    }
}]);

//pricePublice
app.directive("pricePublish", ["$window", function ($window) {
    return {
        restrict: "E",
        templateUrl: '/dist/tpl/common/publish.html',
        replace: true
    }
}]);

// fixed-header
app.directive("uiScrollFixed", ["$window", function ($window) {
    return {
        restrict: "A",
        scope: {
            page: '='
        },
        link: function (c, d) {
            var $w = angular.element($window);
            var $b = angular.element('body');
            $w.on('scroll', function (e, first) {
                if(c.page=="index-box"){
                    var topTo = 650;
                    var winTop = $w.scrollTop();
                    var isShowFixedHeader = winTop >= topTo;

                    d.toggleClass('header-fixed', isShowFixedHeader);
                    if (isShowFixedHeader) {
                        d.fadeIn();
                    } else {
                        d.stop(true, false).hide();
                    }
                    $b.toggleClass('box', isShowFixedHeader).toggleClass('J_headerFixed', isShowFixedHeader);
                }else{
                    d.show();
                    var topTo = d.outerHeight() * 2 + 42;
                    var winTop = $w.scrollTop();
                    var isShowFixedHeader = winTop >= topTo;

                    d.toggleClass('header-fixed', isShowFixedHeader);
                    $b.toggleClass('J_headerFixed', isShowFixedHeader);
                }
                if(first){
                    d.show();
                }else if(typeof(first)!=='undefined'){
                    d.hide();
                }
            }).trigger('scroll', true);
        }
    }
}]);


