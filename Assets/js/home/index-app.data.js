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

        var _reWork = function (data) {

            var req = {
                method: 'POST',
                url: $("#Rework").attr("href"),
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
            reWork: _reWork, 
            viewLink: _viewLink
        }

    }]);

})();