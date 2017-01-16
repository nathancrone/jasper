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