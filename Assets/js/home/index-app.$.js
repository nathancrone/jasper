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