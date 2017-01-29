(function () {
    'use strict';

    angular.module('app.out', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/out', {
            templateUrl: 'views/index-template-out.html',
            controller: 'OutCtrl'
        });

    }])

    .controller('OutCtrl', ['$scope', '$location', '$route', '$routeParams', '$modal', 'app.data', function ($scope, $location, $route, $routeParams, $modal, data) {
        
        $scope.sortExpression = ['CheckOutDate', ['Territory.TerritoryCode']];
        $scope.selectedTerritory = null;

        $scope.sortBy = function (expr) {
            $scope.sortExpression = expr;
        }

        //get the territories
        data.territoryOut().then(function (data) {
            $scope.territories = data;
        }, function () { });


        //when user clicks "check out"
        $scope.checkIn = function (selectedTerritory, size, backdrop, closeOnClick) {

            $scope.selectedTerritory = selectedTerritory;

            var params = {
                templateUrl: 'views/index-template-outcheckin.html',
                resolve: {
                    selectedTerritory: function () {
                        return $scope.selectedTerritory;
                    }
                },
                controller: ['$scope', '$modalInstance', 'selectedTerritory', function ($scope, $modalInstance, selectedTerritory) {

                    $scope.selectedTerritory = selectedTerritory;
                    $scope.data = { "CheckInDate": null };

                    $scope.reposition = function () {
                        $modalInstance.reposition();
                    };

                    $scope.ok = function () {
                        $modalInstance.close({ "selectedTerritory": $scope.selectedTerritory, "CheckInDate": $scope.data.CheckInDate });
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