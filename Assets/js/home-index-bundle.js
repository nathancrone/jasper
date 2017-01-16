(function () {
    'use strict';

    angular.module('app', [
        'ngAria',
        'mm.foundation',
        'app.my',
        'app.out',
        'app.in'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/my' });
    }]).controller('MainCtrl', ['$scope', '$location', '$routeParams', 'app.data', function ($scope, $location, $routeParams, data) {

        $scope.currentTab = $location.url().slice(1).split('/')[0];

        $scope.tabSelected = function (tab) {
            return ($scope.currentTab == tab);
        };

        //when user selects a tab
        $scope.tabNavigate = function (tab) {
            $location.url('/' + tab);
        };

        //highlight tab when navigating
        $scope.$on('$locationChangeSuccess', function (event) {
            $scope.currentTab = $location.url().slice(1).split('/')[0]
        });

    }]);

})();
(function () {
    'use strict';

    angular.module('app')

    .factory('app.data', ['$http', function ($http) {

        //get all the apps
        var _territoryOutByUserId = function () {
            return $http.get($("#JSON_TerritoryOutByUserId").attr("href"))
					.then(function (response) {
					    return response.data;
					})
        };

        //get all the tags for an app
        var _territoryOut = function () {
            return $http.get($("#JSON_TerritoryOut").attr("href"))
					.then(function (response) {
					    return response.data;
					})
        };

        //get all the log entries for an app
        var _territoryIn = function () {
            return $http.get($("#JSON_TerritoryIn").attr("href"))
					.then(function (response) {
					    return response.data;
					})
        };

        //var _sendNotification = function (entry) {

        //    var req = {
        //        method: 'POST',
        //        url: $("#SendNotification").attr("href"),
        //        headers: {
        //            'Content-Type': 'application/x-www-form-urlencoded'
        //        },
        //        data: $.param(entry)
        //    }

        //    return $http(req).then(function (response) {
        //        return response.data;
        //    });

        //}

        return {
            territoryOutByUserId: _territoryOutByUserId,
            territoryOut: _territoryOut,
            territoryIn: _territoryIn
        }

    }]);

})();
(function () {
    'use strict';

    angular.module('app.in', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/in', {
            templateUrl: 'views/index-template-in.html',
            controller: 'InCtrl'
        });

    }])

    .controller('InCtrl', ['$scope', '$location', '$route', '$routeParams', '$modal', 'app.data', function ($scope, $location, $route, $routeParams, $modal, data) {

        data.territoryIn().then(function (data) {

            //scope variable for the selected app
            $scope.territories = data;

            console.log(data);

        }, function () { })


    }]);

})();
(function () {
    'use strict';

    angular.module('app.my', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/my', {
            templateUrl: 'views/index-template-my.html',
            controller: 'MyCtrl'
        });

    }])

    .controller('MyCtrl', ['$scope', '$location', '$route', '$routeParams', 'app.data', function ($scope, $location, $route, $routeParams, data) {
        


    }]);

})();
(function () {
    'use strict';

    angular.module('app.out', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/out', {
            templateUrl: 'views/index-template-out.html',
            controller: 'OutCtrl'
        });

    }])

    .controller('OutCtrl', ['$scope', '$location', '$route', '$routeParams', 'app.data', function ($scope, $location, $route, $routeParams, data) {
        


    }]);

})();