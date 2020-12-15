var app = angular.module('LmsApp', []);

'use strict';
app.controller('baseCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        function ($scope, $rootScope, $timeout, $q, $window) {
            console.log("Connected to lms App base ctrl");
            $scope.GetUrlParameter = function (param) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get(param);
            }
        }
    ]);

app.controller('InventoryCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window,$http) {
            console.log("Connected to Inventory Ctrl");
            $scope.initIndex = function () {
                var data = null;
                var promise = $http.get("/api/InventoryApi/GetAllData", { params: data, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Inventories = response.data;
                    });
                // $scope.Inventories = $http.get("/api/InvenoryApi/GetAllData", { params: data, headers: { 'Accept': 'application/json' } });
            }

            $scope.AddInit = function () {

            }
            $scope.AddInventory = function (inventory) {
                console.log(inventory);
            }
        }
    ]); 

app.controller('UserCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window, $http) {
            console.log("Connected to User App");
            $scope.initIndex = function () {
                var data = null;
                var promise = $http.get("/api/UserApi/GetListData", { params: data, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Users = response.data.Data;
                    });
                // $scope.Inventories = $http.get("/api/InvenoryApi/GetAllData", { params: data, headers: { 'Accept': 'application/json' } });
            }
            $scope.AddUser = function (user) {
                console.log(user);
                var promise = $http.post("/api/UserApi/RegisterUser", user, {headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        
                    });

            }
            $scope.AddAdmin = function (user) {
                console.log(user);
                var promise = $http.post("/api/UserApi/RegisterAdmin", user, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);

                    });

            }
          
            $scope.AddInit = function () {
                $scope.Admin = {};
            }
        }
    ]);

app.controller('VendorCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window, $http) {
            console.log("Connected to Vendor App");
            $scope.initIndex = function () {
                var promise = $http.get("/api/VendorApi/GetListData", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Vendors = response.data.Data;
                    });
                // $scope.Inventories = $http.get("/api/InvenoryApi/GetAllData", { params: data, headers: { 'Accept': 'application/json' } });
            }
            $scope.AddInit = function () {
                $scope.Vendor = {};
            }
            $scope.AddVendor = function (Vendor) {
                console.log(Vendor);
                if (Vendor.Name == null || Vendor.Name == "") {
                    alert("Name Is Required");
                    return;
                }
                var promise = $http.post("/api/VendorApi/AddVendor", Vendor, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            alert("New Vendor Added Successfully!");
                            window.open('/Vendor');
                           // window.Location.href = '/Vendor';
                            //$timeout(function () { window.Location.href = '/Vendor';}, 2000);
                        }
                        
                    });
            }
           
        }
    ]);