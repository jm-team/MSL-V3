var MslModule = require('mslApp');
//化工特殊服务专题页 交互效果
MslModule.service('anchorSmoothScroll', function () {
    this.scrollTo = function (id) {
        var startY = currentYPosition();
        var stopY = elmYPosition(id);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }

        function currentYPosition() {
            if (self.pageYOffset) return self.pageYOffset;
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(id) {
            var elm = document.getElementById(id);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        }

    };
});
MslModule.controller("ServiceController", ['$scope', '$location', '$rootScope', 'anchorSmoothScroll', 'ScrollFixed', function ($scope, $location, $rootScope, anchorSmoothScroll, ScrollFixed) {
    $rootScope.pageName = 'box service-box';
    $rootScope.isShow = true;
    $scope.goto = function (id) {
        $location.hash(id);
        anchorSmoothScroll.scrollTo(id);
    }
}]);