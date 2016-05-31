/**
 * Created by zhengbin on 2016/5/27.
 */
var app = require('mslApp');
app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/home');

    $stateProvider.state('main', {
        url: '/home',
        templateUrl: '/dist/tpl/index/main.html',
        controller: 'IndexCtrl'
    }).state('market', {
        url: '/market',
        templateUrl: '/dist/tpl/market/market.html'
    }).state('marketinfo', {
        url: '/marketinfo/{id}',
        templateUrl: '/dist/tpl/marketinfo/marketinfo.html'
    }).state('price', {
        url: '/price',
        templateUrl: '/dist/tpl/price/price.html'
    }).state('pricemore', {
        url: '/pricemore/{quotesType}/{from}/{to}/{key}',
        templateUrl: '/dist/tpl/pricemore/pricemore.html'
    }).state('priceinfo', {
        url: '/priceinfo/{id}',
        templateUrl: '/dist/tpl/priceinfo/priceinfo.html'
    }).state('match', {
        url: '/match/{goodtype}/{slgoodtype}/{xjgoodtype}/{yjgoodtype}/{site}',
        templateUrl: '/dist/tpl/match/match.html'
    }).state('login', {
        url: '/login',
        templateUrl: '/dist/tpl/login/login.html'
    }).state('selfsell', {
        url: '/selfsell',
        templateUrl: '/dist/tpl/selfsell/selfsell.html'
    }).state('service', {
        url: '/service',
        templateUrl: '/dist/tpl/common/service.html',
        controller:'ServiceController'
    })
}]);