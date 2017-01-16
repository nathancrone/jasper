angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-in.html',
    '<div class="large-12 columns"><table class="hover"><thead><tr><th>Territory</th><th>Check In Date</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="t in territories | orderBy: [\'CheckInDate\', [\'Territory.TerritoryCode\']]"><td>{{ t.Territory.TerritoryCode }}</td><td>{{ t.CheckInDate }}</td><td class="text-center"><a href="http://www.google.com/" class="button" target="_blank">View</a></td><td class="text-center"><a ng-click="checkOut(t)" class="button">Check Out</a></td></tr></tbody></table></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-my.html',
    '<div class="large-12 columns"><h2>My</h2></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-out.html',
    '<div class="large-12 columns"><h2>Out</h2></div>');
}]);
