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

        var _viewLink = $("#ViewTerritory").attr("href");

        //get all the apps
        var _territoryOutByUser = function () {
            return $http.get($("#JSON_TerritoryOutByUser").attr("href"))
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

        var _territoryInOldest = function () {
            return $http.get($("#JSON_TerritoryInOldest").attr("href"))
					.then(function (response) {
					    return response.data;
					})
        };

        var _userAll = function () {
            return $http.get($("#JSON_UserAll").attr("href"))
					.then(function (response) {
					    return response.data;
					})
        };

        var _checkOut = function (data) {

            var req = {
                method: 'POST',
                url: $("#CheckOut").attr("href"),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(data)
            }

            return $http(req).then(function (response) {
                return response.data;
            });

        }

        var _checkOutUser = function (data) {

            var req = {
                method: 'POST',
                url: $("#CheckOutUser").attr("href"),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(data)
            }

            return $http(req).then(function (response) {
                return response.data;
            });

        }

        var _checkIn = function (data) {

            var req = {
                method: 'POST',
                url: $("#CheckIn").attr("href"),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(data)
            }

            return $http(req).then(function (response) {
                return response.data;
            });

        }

        return {
            territoryOutByUser: _territoryOutByUser,
            territoryOut: _territoryOut,
            territoryIn: _territoryIn,
            territoryInOldest: _territoryInOldest, 
            userAll: _userAll,
            checkOut: _checkOut,
            checkOutUser: _checkOutUser,
            checkIn: _checkIn,
            viewLink: _viewLink
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

        $scope.viewLink = data.viewLink;
        $scope.sortExpression = ['CheckInDate', ['Territory.TerritoryCode']];
        $scope.selectedTerritory = null;

        $scope.sortBy = function (expr) {
            $scope.sortExpression = expr;
        }

        //get the territories
        data.territoryIn().then(function (data) {
            $scope.territories = data;
        }, function () { });

        //when user clicks "check out"
        $scope.checkOut = function (selectedTerritory, size, backdrop, closeOnClick) {

            $scope.selectedTerritory = selectedTerritory;
            
            var params = {
                templateUrl: 'views/index-template-incheckout.html',
                resolve: {
                    selectedTerritory: function () {
                        return $scope.selectedTerritory;
                    }
                },
                controller: ['$scope', '$modalInstance', 'selectedTerritory', function ($scope, $modalInstance, selectedTerritory) {

                    $scope.users = [];
                    $scope.selectedTerritory = selectedTerritory;
                    $scope.data = { "selectedUser": null, "CheckOutDate": null };

                    //get the users
                    data.userAll().then(function (data) {
                        $scope.users = data;
                    }, function () { });

                    $scope.reposition = function () {
                        $modalInstance.reposition();
                    };

                    $scope.ok = function () {
                        $modalInstance.close({ "selectedTerritory": $scope.selectedTerritory, "selectedUser": $scope.data.selectedUser, "CheckOutDate": $scope.data.CheckOutDate });
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

                data.checkOut({ "TerritoryId": result.selectedTerritory.TerritoryId, "UserId": result.selectedUser.Id, "CheckOutDate": result.CheckOutDate }).then(function (data) {
                    
                    $scope.Response = data;
                    $scope.showSuccess = !data.Error;
                    $scope.showError = data.Error;
                    $scope.alertMessage = data.Message;

                    $route.reload();

                }, function (data) {

                    $scope.Response = data;
                    $scope.showSuccess = false;
                    $scope.showError = true;
                    $scope.alertMessage = "There was an error checking out the territory.";

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
        
        $scope.viewLink = data.viewLink;
        $scope.sortExpression = ['CheckOutDate', ['Territory.TerritoryCode']];
        $scope.selectedTerritory = null;

        $scope.sortBy = function (expr) {
            $scope.sortExpression = expr;
        }

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












        //when user clicks "check out"
        $scope.checkOut = function (size, backdrop, closeOnClick) {
            
            var params = {
                templateUrl: 'views/index-template-mycheckout.html',
                resolve: {
                },
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    
                    $scope.viewLink = data.viewLink;
                    $scope.sortExpression = ['CheckInDate', ['Territory.TerritoryCode']];
                    $scope.selectedTerritory = null;

                    $scope.sortBy = function (expr) {
                        $scope.sortExpression = expr;
                    }

                    $scope.selectTerritory = function (territory) {
                        $scope.selectedTerritory = territory;
                    }

                    //get the territories
                    data.territoryInOldest().then(function (data) {
                        $scope.territories = data;
                    }, function () { });

                    $scope.reposition = function () {
                        $modalInstance.reposition();
                    };

                    $scope.ok = function () {
                        $modalInstance.close({ "selectedTerritory": $scope.selectedTerritory, "CheckOutDate": null });
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

                data.checkOutUser({ "TerritoryId": result.selectedTerritory.TerritoryId, "CheckOutDate": result.CheckOutDate }).then(function (data) {

                    $scope.Response = data;
                    $scope.showSuccess = !data.Error;
                    $scope.showError = data.Error;
                    $scope.alertMessage = data.Message;

                    $route.reload();

                }, function (data) {

                    $scope.Response = data;
                    $scope.showSuccess = false;
                    $scope.showError = true;
                    $scope.alertMessage = "There was an error checking out the territory.";

                });

            }, function () {

            });
        };









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

    .controller('OutCtrl', ['$scope', '$location', '$route', '$routeParams', '$modal', 'app.data', function ($scope, $location, $route, $routeParams, $modal, data) {
        
        $scope.viewLink = data.viewLink;
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