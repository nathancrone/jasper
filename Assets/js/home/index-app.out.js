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
        
        //get the territories
        data.territoryOut().then(function (data) {
            $scope.territories = data;
        }, function () { });

    }]);

})();