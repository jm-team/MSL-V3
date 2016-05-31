/**
 * Created by chenhao on 2016/5/25.
 */
var app = require('mslApp');

app.factory('ScrollFixed', ['$window', function ($window) {
    return function (bool) {
        angular.element($window).trigger('scroll', bool);
    };
}]);
//·þÎñÆ÷Â·¾¶
app.factory('ServerUrl', ['$http', '$q', function ($http, $q) {
    return {
        query: function () {
            var deferred = $q.defer();
            $http({method: 'GET', url: '/api/v1/loadWebImagePrefix'}).success(function (data) {
                deferred.resolve(data);
            }).error(function(data){
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
}]);
