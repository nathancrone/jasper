(function () {
    'use strict';

    angular.module('app.my', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/my', {
            templateUrl: 'views/index-template-my.html',
            controller: 'MyCtrl'
        });

    }])

    .controller('MyCtrl', ['$scope', '$location', '$route', '$routeParams', '$modal', 'app.data', function ($scope, $location, $route, $routeParams, $modal, data) {
        
        $scope.sortExpression = ['CheckOutDate', ['Territory.TerritoryCode']];
        $scope.selectedTerritory = null;

        //get the territories
        data.territoryOutByUser().then(function (data) {
            $scope.ledgerEntries = data;
        }, function () { });

        //when user clicks "check out"
        $scope.checkIn = function (selectedTerritory, size, backdrop, closeOnClick) {

            $scope.selectedTerritory = selectedTerritory;

            var params = {
                templateUrl: 'views/index-template-mycheckin.html',
                resolve: {
                    selectedTerritory: function () {
                        return $scope.selectedTerritory;
                    }
                },
                controller: ['$scope', '$modalInstance', 'selectedTerritory', function ($scope, $modalInstance, selectedTerritory) {

                    $scope.selectedTerritory = selectedTerritory;
                    
                    $scope.reposition = function () {
                        $modalInstance.reposition();
                    };

                    $scope.ok = function () {
                        $modalInstance.close({ "selectedTerritory": $scope.selectedTerritory, "CheckInDate": null });
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            };

            if (angular.isDefined(closeOnClick)) {
                params.closeOnClick = closeOnClick;
            }

            if (angular.isDefined(size)) {
                params.size = size;
            }

            if (angular.isDefined(backdrop)) {
                params.backdrop = backdrop;
            }

            var modalInstance = $modal.open(params);

            modalInstance.result.then(function (result) {

                data.checkIn({ "TerritoryId": result.selectedTerritory.TerritoryId, "CheckInDate": result.CheckInDate }).then(function (data) {

                    $scope.Response = data;
                    $scope.showSuccess = !data.Error;
                    $scope.showError = data.Error;
                    $scope.alertMessage = data.Message;

                    $route.reload();

                }, function (data) {

                    $scope.Response = data;
                    $scope.showSuccess = false;
                    $scope.showError = true;
                    $scope.alertMessage = "There was an error checking in the territory.";

                });

            }, function () {

            });
        };

    }]);

})();