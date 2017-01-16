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

        $scope.selectedTerritory = null;
        $scope.selectedUser = null;
        $scope.CheckOutDate = null;

        //get the territories
        data.territoryIn().then(function (data) {
            $scope.territories = data;
        }, function () { });

        //when user clicks "check out"
        $scope.checkOut = function (size, backdrop, closeOnClick) {

            var params = {
                templateUrl: 'views/index-template-incheckout.html',
                resolve: {
                    selectedTerritory: function () {
                        return $scope.selectedTerritory;
                    },
                    selectedUser: function () {
                        return $scope.selectedUser;
                    },
                    CheckOutDate: function () {
                        return $scope.CheckOutDate;
                    }
                },
                controller: ['$scope', '$modalInstance', 'selectedTerritory', 'selectedUser', 'CheckOutDate', function ($scope, $modalInstance, selectedTerritory, selectedUser, CheckOutDate) {

                    $scope.selectedTerritory = selectedTerritory;
                    $scope.selectedUser = selectedUser;
                    $scope.CheckOutDate = CheckOutDate;

                    $scope.reposition = function () {
                        $modalInstance.reposition();
                    };

                    $scope.ok = function () {
                        $modalInstance.close({ "selectedTerritory": $scope.selectedTerritory, "selectedUser": $scope.selectedUser, "CheckOutDate": CheckOutDate });
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

                data.checkOut({ "TerritoryId": result.selectedTerritory.TerritoryId, "UserId": result.selectedUser.UserId, "CheckOutDate": result.CheckOutDate }).then(function (data) {
                    
                    $scope.Response = data;
                    $scope.showSuccess = !data.Error;
                    $scope.showError = data.Error;
                    $scope.alertMessage = data.Message;

                }, function (data) {

                    $scope.Response = data;
                    $scope.showSuccess = false;
                    $scope.showError = true;
                    $scope.alertMessage = "There was an error sending your notification.";

                });

            }, function () {

            });
        };

        $scope.closeAlert = function () {
            $scope.showSuccess = false;
            $scope.showError = false;
            $scope.alertMessage = "";
        }


    }]);

})();