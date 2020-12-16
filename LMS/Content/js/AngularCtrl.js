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
                            //window.open('/Vendor');
                            window.location = '/Vendor';
                            $timeout(function () { window.location.href = '/Vendor';}, 2000);
                        }
                        
                    });
            }
           
        }
    ]);

app.controller('CompanyCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window, $http) {
            console.log("Connected to Company App");
            $scope.initIndex = function () {
                var promise = $http.get("/api/CompanyApi/GetListData", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Companies = response.data.Data;
                    });
            }
            $scope.AddInit = function () {
                $scope.Company = {};
            }
            $scope.EditInit = function () {
                $scope.Company = {};
                var Id = $scope.GetUrlParameter("Id");
                var data = {
                    Id: parseInt(Id)
                }
                console.log(data);
                var promise = $http.get("/api/CompanyApi/GetCompany", { params:data} ,{  headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Company = response.data;
                    });

            }
            $scope.AddCompany = function (Company) {
                console.log(Company);
                if (Company.Name == null || Company.Name == "") {
                    alert("Name Is Required");
                    return;
                }
                if (Company.Address == null || Company.Address == "") {
                    alert("Address Is Required");
                    return;
                }
                if (Company.Contact == null || Company.Contact == "") {
                    alert("Contact Is Required");
                    return;
                }
                var promise = $http.post("/api/CompanyApi/AddCompany", Company, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            alert("New Company Added Successfully!");
                            $timeout(function () { window.location.href = '/Company'; }, 2000);
                        }

                    });
            }

            $scope.EditCompany = function (Company) {
                console.log(Company);
                if (Company.Name == null || Company.Name == "") {
                    alert("Name Is Required");
                    return;
                }
                if (Company.Address == null || Company.Address == "") {
                    alert("Address Is Required");
                    return;
                }
                if (Company.Contact == null || Company.Contact == "") {
                    alert("Contact Is Required");
                    return;
                }
                var promise = $http.post("/api/CompanyApi/EditCompany", Company, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            alert("Company has been updated Successfully!");
                            $timeout(function () { window.location.href = '/Company'; }, 2000);
                        }

                    });
            }

        }
    ]);