angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-in.html',
    '<div class="large-12 columns"><table class="hover"><thead><tr><th>Territory</th><th>Check In Date</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="t in territories | orderBy: [\'CheckInDate\', [\'Territory.TerritoryCode\']]"><td>{{ t.Territory.TerritoryCode }}</td><td>{{ t.CheckInDate | date:\'medium\' }}</td><td class="text-center"><a href="http://www.google.com/" class="button" target="_blank">View</a></td><td class="text-center"><a ng-click="checkOut(t.Territory)" class="button">Check Out</a></td></tr></tbody></table></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-incheckout.html',
    '<div class="panel panel-default"><div class="panel-heading">Confirm</div><div class="panel-body"><form><div class="form-group"><label class="control-label">User</label><select class="form-control" ng-model="data.selectedUser" ng-options="u as u.UserName for u in users"></select></div><div class="form-group"><label class="control-label">Check Out Date</label> <input type="text" placeholder="check out date" required="" class="form-control ng-pristine ng-untouched" ng-model="data.CheckOutDate" ng-change="go()"></div></form></div><div class="panel-footer"><div class="clearfix"><div class="pull-left">&nbsp;</div><div class="pull-right"><button class="button" ng-click="ok()">OK</button> <button class="button" ng-click="cancel()">Cancel</button></div></div></div></div><button ng-click="cancel()" class="close-button" aria-label="Close reveal" type="button"><span aria-hidden="true">&times;</span></button>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-my.html',
    '<div class="large-12 columns"><h2>My</h2></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('views/index-template-out.html',
    '<div class="large-12 columns"><table class="hover"><thead><tr><th>Territory</th><th>First Name</th><th>Last Name</th><th>Check Out Date</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="t in territories | orderBy: [\'CheckOutDate\', [\'Territory.TerritoryCode\']]"><td>{{ t.Territory.TerritoryCode }}</td><td>{{ t.User.FirstName }}</td><td>{{ t.User.LastName }}</td><td>{{ t.CheckOutDate | date:\'medium\' }}</td><td class="text-center"><a href="http://www.google.com/" class="button" target="_blank">View</a></td><td class="text-center"><a ng-click="checkIn(t.Territory)" class="button">Check In</a></td></tr></tbody></table></div>');
}]);
