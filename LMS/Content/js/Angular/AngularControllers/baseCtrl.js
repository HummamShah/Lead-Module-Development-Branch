'use strict';
app.controller('baseCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        "toaster",
        function ($scope, $rootScope, $timeout, $q, $window, $http, toaster) {
            console.log("Connected to lms App base ctrl");
            $scope.Pop = function () {
                toaster.pop('success', "success", "Done Successfully");
                toaster.pop('error', "error", "Error in task");
                toaster.pop('warning', "warning", "this is Warning");
                toaster.pop('note', "note", "thhis is note");
            }
            $scope.BusinessSegmentationDropDown = [{ id: 0, Name: "ISPs" }, { id: 1, Name: "Distributors" }, { id: 2, Name: "SolutionIntegreator" }, { id: 3, Name: "SoftwareHouse" }, { id: 5, Name: "GOVTSector" }, { id: 6, Name: "FinacialInstitues" }, { id: 7, Name: "FMCG" }, { id: 8, Name: "Telcos" }, { id: 9, Name: "CallCenter_BPO" }, { id: 10, Name: "Pharmaceutical" }, { id: 11, Name: "Textile" }]
            $scope.CityDropDown = [{ id: 0, Name: "Karachi" }, { id: 1, Name: "Lahore" }, { id: 2, Name: "Sialkot" }, { id: 3, Name: "Faisalabad" }, { id: 4, Name: "Rawalpindi" }, { id: 5, Name: "Peshawar" }, { id: 6, Name: "SaiduSharif" }, { id: 7, Name: "Multan" }, { id: 8, Name: "Gujranwala" }, { id: 9, Name: "Islamabad" }, { id: 10, Name: "Quetta " }, { id: 11, Name: "Bahawalpur" }, { id: 12, Name: "Sargodha" }, { id: 13, Name: "Mirpur" }, { id: 14, Name: "Chiniot" }, { id: 15, Name: "Sukkur" }, { id: 16, Name: "Larkana " }, { id: 17, Name: "Shekhupura " }, { id: 18, Name: "Jhang " }, { id: 19, Name: "RahimyarKhan" }, { id: 20, Name: "Gujrat" }]
            $scope.DomainDropDown = [{ Id: 0, Name: "SolutionSet" }, { Id: 1, Name: "Connectivity" }]
            $scope.GetUrlParameter = function (param) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get(param);
            }
            $scope.IsServiceRunning = false;
            $scope.ServiceClassBinder = "LoaderDeActivate"; // bydefualt loader is deactivated
            $scope.TotalNumberOfServicesRunning = 0;
            $scope.AjaxGet = function (link, data) {
                $scope.ServiceClassBinder = "LoaderActivate"; // Loader class Activated
                $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning + 1;
                var promise = $http.get(link, { params: data, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning - 1;
                        $scope.ServiceClassBinder = "LoaderDeActivate"; // Loader class DeActivated
                        console.log(response);

                    }
                );
                return promise;
            }
            $scope.AjaxGetBackground = function (link, data) {
                var promise = $http.get(link, { params: data, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {


                    }
                );
                return promise;
            }

            $scope.AjaxPost = function (link, data) {
                $scope.ServiceClassBinder = "LoaderActivate"; // Loader class Activated
                $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning + 1;
                var promise = $http.post(link, data, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {

                        $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning - 1;
                        $scope.ServiceClassBinder = "LoaderActivate"; // Loader class DeActivated
                        console.log(response);

                    }
                );
                return promise;
            }


        }
    ]);
