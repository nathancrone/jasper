angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-in.html',
    '<div class="large-12 columns"><table class="hover"><thead><tr><th ng-click="sortBy([\'Territory.TerritoryCode\'])">Territory</th><th ng-click="sortBy([\'CheckInDate\', [\'Territory.TerritoryCode\']])">Check In Date</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="t in territories | orderBy: sortExpression"><td>{{ t.Territory.TerritoryCode }}</td><td>{{ t.CheckInDate | date:\'medium\' }}</td><td class="text-center"><a href="http://www.google.com/" class="button" target="_blank">View</a></td><td class="text-center"><a ng-click="checkOut(t.Territory)" class="button">Check Out</a></td></tr></tbody></table></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-incheckout.html',
    '<div class="panel panel-default"><div class="panel-heading">Check Out Territory - {{ selectedTerritory.TerritoryCode }}</div><div class="panel-body"><form><div class="form-group"><label class="control-label">User</label><select class="form-control" ng-model="data.selectedUser" ng-options="u as (u.LastName + \', \'+ u.FirstName) for u in users | orderBy: [\'LastName\', \'FirstName\']"></select></div><div class="form-group"><label class="control-label">Check Out Date</label> <input type="text" placeholder="leave blank if today\'s date" required="" class="form-control ng-pristine ng-untouched" ng-model="data.CheckOutDate"></div></form></div><div class="panel-footer"><div class="clearfix"><div class="pull-left">&nbsp;</div><div class="pull-right"><button class="button" ng-click="ok()">OK</button> <button class="button" ng-click="cancel()">Cancel</button></div></div></div></div><button ng-click="cancel()" class="close-button" aria-label="Close reveal" type="button"><span aria-hidden="true">&times;</span></button>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-my.html',
    '<div class="large-12 columns"><table class="hover"><thead><tr><th ng-click="sortBy([\'Territory.TerritoryCode\'])">Territory</th><th ng-click="sortBy([\'CheckOutDate\', [\'Territory.TerritoryCode\']])">Check Out Date</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="l in ledgerEntries | orderBy: sortExpression"><td>{{ l.Territory.TerritoryCode }}</td><td>{{ l.CheckOutDate | date:\'medium\' }}</td><td class="text-center"><a href="http://www.google.com/" class="button" target="_blank">View</a></td><td class="text-center"><a ng-click="checkIn(l.Territory)" class="button">Check In</a></td></tr></tbody></table></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-mycheckin.html',
    '<div class="panel panel-default"><div class="panel-heading">Check In Territory - {{ selectedTerritory.TerritoryCode }}</div><div class="panel-body"><h3>Are you sure you want to check {{ selectedTerritory.TerritoryCode }} in?</h3></div><div class="panel-footer"><div class="clearfix"><div class="pull-left">&nbsp;</div><div class="pull-right"><button class="button" ng-click="ok()">OK</button> <button class="button" ng-click="cancel()">Cancel</button></div></div></div></div><button ng-click="cancel()" class="close-button" aria-label="Close reveal" type="button"><span aria-hidden="true">&times;</span></button>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-out.html',
    '<div class="large-12 columns"><table class="hover"><thead><tr><th ng-click="sortBy([\'Territory.TerritoryCode\'])">Territory</th><th ng-click="sortBy([\'User.FirstName\', \'User.LastName\', \'Territory.TerritoryCode\'])">First Name</th><th ng-click="sortBy([\'User.LastName\', \'User.FirstName\', \'Territory.TerritoryCode\'])">Last Name</th><th ng-click="sortBy([\'CheckOutDate\', [\'Territory.TerritoryCode\']])">Check Out Date</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="t in territories | orderBy: sortExpression"><td>{{ t.Territory.TerritoryCode }}</td><td>{{ t.User.FirstName }}</td><td>{{ t.User.LastName }}</td><td>{{ t.CheckOutDate | date:\'medium\' }}</td><td class="text-center"><a href="http://www.google.com/" class="button" target="_blank">View</a></td><td class="text-center"><a ng-click="checkIn(t.Territory)" class="button">Check In</a></td></tr></tbody></table></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-outcheckin.html',
    '<div class="panel panel-default"><div class="panel-heading">Check In Territory - {{ selectedTerritory.TerritoryCode }}</div><div class="panel-body"><form><div class="form-group"><label class="control-label">Check In Date</label> <input type="text" placeholder="leave blank if today\'s date\'" required="" class="form-control ng-pristine ng-untouched" ng-model="data.CheckInDate"></div></form></div><div class="panel-footer"><div class="clearfix"><div class="pull-left">&nbsp;</div><div class="pull-right"><button class="button" ng-click="ok()">OK</button> <button class="button" ng-click="cancel()">Cancel</button></div></div></div></div><button ng-click="cancel()" class="close-button" aria-label="Close reveal" type="button"><span aria-hidden="true">&times;</span></button>');
}]);
