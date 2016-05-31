// 自定义标签
var fixElements = ['ng-include', 'ng-pluralize', 'ng-view', 'ng:include', 'ng:pluralize', 'ng:view', 'carousel', 'slide', 'tabset', 'tab', 'tab-heading', 'msl-topbar', 'msl-header', 'msl-footer', 'msl-sidebar', 'index-main', 'ui-view'];

fixElements.forEach(function (value, index) {
  document.createElement(value);
});