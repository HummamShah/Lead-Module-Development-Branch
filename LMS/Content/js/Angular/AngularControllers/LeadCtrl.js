app.controller('LeadCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        "toaster",
        function ($scope, $rootScope, $timeout, $q, $window, $http, toaster) {
            console.log("Connected to Lead App");
            $scope.initIndex = function () {
                $scope.Assignment = {};
                $scope.AssignmentTypes = ["Lead", "PMD", "PreSale"];
                $scope.AjaxGet("/api/LeadApi/GetListData", null).then(
                    function (response) {
                        console.log(response);
                        $scope.Leads = response.data.Data;
                    });

            }
            $scope.initPmdIndex = function () {
                $scope.Assignment = {};
                $scope.AssignmentTypes = ["Lead", "PMD", "PreSale"];
                $scope.AjaxGet("/api/LeadApi/GetListForPmd", null).then(
                    function (response) {
                        console.log(response);
                        $scope.Leads = response.data.Data;
                    });

            }
            $scope.SetAssigningDataToModal = function (Lead) {
                console.log(Lead);
                $scope.Assignment.Id = Lead.Id;
                $scope.Assignment.Header = "Assign A User";

            }
            $scope.SetAssigningType = function (Type) {
                $scope.AjaxGet("/api/UserApi/GetAgentsForAssignment", { Type: Type }).then(
                    function (response) {
                        console.log(response);
                        $scope.AssignmentAgents = response.data.Data;
                    });
            }
            $scope.AssignUser = function (Assignment) {
                console.log(Assignment);
                if (Assignment.Type == null) {
                    toaster.pop('error', "error", "Select Type Of User");
                    return;
                }
                if (Assignment.AssignedUserId == null) {
                    toaster.pop('error', "error", "Select User To Assign");
                    return;
                }
                $scope.AjaxPost("/api/LeadApi/AssignLead", Assignment).then(
                    function (response) {
                        if (response.status == 200) {
                            //alert("User Has Been Assigned Successfully!");
                            toaster.pop('success', "success", "User Has Been Assigned Successfully!");
                            $timeout(function () { window.location.href = '/Lead'; }, 2000);
                        } else {
                            //alert("Could Not Assign User");
                            toaster.pop('error', "error", "Could not Assign User");
                        }
                    });
            }
            $scope.AddLead = function (Lead) {
                console.log(Lead);
                return;
                if (Lead.CompanyId == null) {
                    toaster.pop('error', "error", "Please Select Company!");
                    return;
                }
                if (Lead.Domain == null) {
                    toaster.pop('error', "error", "Please Select Domain!");
                    return;
                }
                if (Lead.ContactPersonName == null || Lead.ContactPersonName == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Name");
                    return;
                }
                if (Lead.ContactPersonNumber == null || Lead.ContactPersonNumber == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Number");
                    return;
                }
                if (Lead.ContactPersonEmail == null || Lead.ContactPersonEmail == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Email");
                    return;
                }
                if (Lead.ContactPersonTitle == null || Lead.ContactPersonTitle == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Title");
                    return;
                }
                if (Lead.ContactPersonDepartment == null || Lead.ContactPersonDepartment == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Department");
                    return;
                }

                $scope.AjaxPost("/api/LeadApi/AddLead", Lead).then(
                    function (response) {
                        if (response.status == 200) {
                            // alert("Lead has been Added Successfully!");
                            toaster.pop('success', "success", "Lead Has Been Added Successfully");
                            $timeout(function () { window.location.href = '/Lead'; }, 2000);
                        } else {
                            //alert("Could Not Add new Lead");
                            toaster.pop('error', "error", "Could not add lead!");
                        }
                    });


            }
            getParentCompaniesDropdown = function () {
                var promise = $http.get("/api/CompanyApi/GetParentCompaniesDropdown", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Companies = response.data.Data;
                    });
            }
            getCompaniesDropdown = function () {
                $scope.AjaxGet("/api/CompanyApi/GetCompaniesDropdown", null).then(
                    function (response) {
                        console.log(response);
                        $scope.Companies = response.data.Data;
                    });

            }
            $scope.AddInit = function () {
                $scope.Company = {};
                $scope.Companies = [];
                $scope.Lead = {};
                $scope.Lead.SolutionDetails = {};
                $scope.Lead.SolutionDetails.IsNew = false;
                $scope.ShowContactInformation = false;
                $scope.ShowBusinessInformation = false;
                //$scope.Lead.Domain = 0;
                $scope.MOCS = [{ Name: "Phone", Id: 0 }, { Name: "Email", Id: 1 }, { Name: "Fax", Id: 2 }, { Name: "Visit", Id: 3 }];
                getCompaniesDropdown();
            }

            $scope.WiWax = [{ Name: "WiWax1", Id: 0 }, { Name: "WiWax2", Id: 1 }, { Name: "WiWax3", Id: 2 }];
            $scope.DSL = [{ Name: "DSL1", Id: 0 }, { Name: "DSL2", Id: 1 }, { Name: "DSL3", Id: 2 }];
            $scope.VSAT = [{ Name: "VSAT1", Id: 0 }, { Name: "VSAT2", Id: 1 }, { Name: "VSAT3", Id: 3 }];
            $scope.Fiber = [{ Name: "Fiber", Id: 0 }, { Name: "Fiber1", Id: 1 }, { Name: "Fiber2", Id: 2 }];
            $scope.GetDropdownForServies = function (param) {
                //0-dsl,1=Vsat,2=Wiwax,3=Fiber,4-other
                if (param == 0) {
                    $scope.CurrentServices = $scope.DSL;
                }
                if (param == 1) {
                    $scope.CurrentServices = $scope.VSAT;
                }
                if (param == 2) {
                    $scope.CurrentServices = $scope.WiWax;
                }
                if (param == 3) {
                    $scope.CurrentServices = $scope.Fiber;
                }

            }
            $scope.AddNewCompany = function (Company) {
                //Create a request to add a new company and then refresh the list of company
                if (Company.Name == null || Company.Name == "") {
                    //alert("Name Is Required");
                    toaster.pop('error', "error", "Name Is Required!");
                    return;
                }
                if (Company.Latitude == null ) {
                    toaster.pop('error', "error", "Latitude Is Required!");
                    return;
                }
                if (Company.Longitude == null) {
                    toaster.pop('error', "error", "Longitude Is Required!");
                    return;
                }
                if (Company.Address == null || Company.Address == "") {
                    //alert("Address Is Required");
                    toaster.pop('error', "error", "Address Is Required!");
                    return;
                }
                if (Company.Contact == null || Company.Contact == "") {
                    //alert("Contact Is Required");
                    toaster.pop('error', "error", "Contact Is Required!");
                    return;
                }
                console.log(Company);
                $scope.AjaxPost("/api/CompanyApi/AddCompany", Company).then(function (response) {
                    console.log(response);
                    if (response.status == 200) {
                        toaster.pop('success', "success", "Company Added Successfully");
                        //$scope.AjaxGetBackground().then(function (resp) {

                        //})
                        getCompaniesDropdown();
                    }
                });

            }
            $scope.GetCompanyData = function (Company) {
                console.log(Company.Id);
                $scope.Lead.CompanyId = Company.Id;
                var data = {
                    Id: Company.Id
                }
                var promise = $http.get("/api/CompanyApi/GetCompany", { params: data }, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Lead = response.data;
                        $scope.Lead.CompanyId = Company.Id;
                        $scope.GetDropdownForServies($scope.Lead.CUDS);

                    });
            }


            $scope.Editinit = function () {
                $scope.Company = {};
                $scope.Companies = [];
                $scope.Lead = {};
                $scope.ShowContactInformation = false;
                $scope.ShowBusinessInformation = false;
                $scope.ShowFeasibilityInformation = false;
                // $scope.Lead.Domain = 0;
                var Id = $scope.GetUrlParameter("Id");
                getCompaniesDropdown();
                var data = {
                    Id: parseInt(Id)
                }
                console.log(data);
                $scope.AjaxGet("/api/LeadApi/GetLead", data).then(
                    function (response) {
                        console.log(response);
                        $scope.Lead = response.data;
                       
                        var Company = {};
                        angular.forEach($scope.Companies, function (value, key) {
                            if (value.Id == $scope.Lead.CompanyId) {
                                Company = value;
                                return;
                            }
                        }); 
                        $scope.CompanyId = Company;
                        $scope.GetDropdownForServies($scope.Lead.CUDS);
                    });

                $scope.MOCS = [{ Name: "Phone", Id: 0 }, { Name: "Email", Id: 1 }, { Name: "Fax", Id: 2 }, { Name: "Visit", Id: 3 }];
                
            }
            $scope.EditLead = function (Lead) {
                console.log(Lead);
                if (Lead.CompanyId == null) {
                    toaster.pop('error', "error", "Please Select Company!");
                    return;
                }
                if (Lead.Domain == null) {
                    toaster.pop('error', "error", "Please Select Domain!");
                    return;
                }
                if (Lead.ContactPersonName == null || Lead.ContactPersonName == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Name");
                    return;
                }
                if (Lead.ContactPersonNumber == null || Lead.ContactPersonNumber == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Number");
                    return;
                }
                if (Lead.ContactPersonEmail == null || Lead.ContactPersonEmail == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Email");
                    return;
                }
                if (Lead.ContactPersonTitle == null || Lead.ContactPersonTitle == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Title");
                    return;
                }
                if (Lead.ContactPersonDepartment == null || Lead.ContactPersonDepartment == "") {
                    toaster.pop('error', "error", "Please Enter Contact Person Department");
                    return;
                }

                $scope.AjaxPost("/api/LeadApi/EditLead", Lead).then(
                    function (response) {
                        if (response.status == 200) {
                            //alert("Lead has been Updated Successfully!");
                            toaster.pop('success', "success", "Lead Has Been Updated Successfully!");
                            $timeout(function () { window.location.href = '/Lead'; }, 2000);
                        } else {
                            toaster.pop('error', "error", "Unable to update lead!");
                        }
                    });
            }
            $scope.FeasibiltyAddInit = function () {
                $scope.Lead = {};
                $scope.LeadFeasibility = [];
                $scope.Vendors = [];
                $scope.FeasibilityStatus = 2;
                $scope.ShowContactInformation = false;
                $scope.ShowBusinessInformation = false;
                $scope.ShowFeasibilityInformation = false;
                var Id = $scope.GetUrlParameter("Id");
                var data = {
                    Id: parseInt(Id)
                }
                console.log(data);
                $scope.AjaxGet("/api/LeadApi/GetLead", data).then(
                    function (response) {
                        console.log(response);
                        $scope.Lead = response.data;
                    });
                getVendors();
            }
            $scope.FeasibiltyEditInit = function () {
                $scope.Lead = {};
                $scope.LeadFeasibility = [];
                $scope.Vendors = [];
                $scope.DeletedRows = [];
                $scope.FeasibilityStatus = 2;
                $scope.ShowContactInformation = false;
                $scope.ShowBusinessInformation = false;
                $scope.ShowFeasibilityInformation = false;
                var Id = $scope.GetUrlParameter("Id");
                var data = {
                    Id: parseInt(Id)
                }
                console.log(data);
                $scope.AjaxGet("/api/LeadApi/GetLead", data).then(
                    function (response) {
                        console.log(response);
                        $scope.Lead = response.data;
                    });
                getVendors();
            }
            getVendors = function () {
                $scope.AjaxGet("/api/VendorApi/GetVendors", null).then(
                    function (response) {
                        console.log(response);
                        $scope.Vendors = response.data.Data;
                    });
            }
            $scope.ExpandCollapse = function (PortionName) {
                if (PortionName == "BI") {
                    $scope.ShowBusinessInformation = !$scope.ShowBusinessInformation;
                }
                if (PortionName == "CI") {
                    $scope.ShowContactInformation = !$scope.ShowContactInformation;
                }
                if ("FF") {
                    $scope.ShowFeasibilityInformation = !$scope.ShowFeasibilityInformation;
                }
            }
            $scope.AddRow = function () {
                var temp = {
                    Id:0,
                    VendorId: null,
                    LeadId: $scope.Lead.Id,
                    OTC: 0,
                    MRC: 0,
                    BandWidth: "",
                    Remarks: "",
                    ConnectivityType:0,
                }
                $scope.LeadFeasibility.push(temp);
                console.log($scope.LeadFeasibility);
            }
            $scope.AddRowInEditForm = function () {
                var temp = {
                    Id:0,
                    VendorId: null,
                    LeadId: $scope.Lead.Id,
                    OTC: 0,
                    MRC: 0,
                    BandWidth: "",
                    Remarks: "",
                    ConnectivityType:0,
                }
                $scope.Lead.FeasibilityDetails.push(temp);
                console.log($scope.Lead.FeasibilityDetails);
            }
            $scope.RemoveRow = function (index) {
                console.log(index);
                $scope.LeadFeasibility.splice(index, 1);
            }
            $scope.RemoveEditRow = function (index) {
                console.log(index);
                if ($scope.Lead.FeasibilityDetails[index].Id != 0) {
                    $scope.DeletedRows.push($scope.Lead.FeasibilityDetails[index]);
                }
                $scope.Lead.FeasibilityDetails.splice(index, 1);
            }
            $scope.AddFeasibility = function (LeadFeasibility) {
                console.log(LeadFeasibility);
                var temp = {
                    Feasibility: LeadFeasibility,
                    Status: $scope.FeasibilityStatus
                }
                console.log(temp);
                $scope.AjaxPost("/api/LeadApi/AddFeasibility", temp).then(
                    function (response) {
                        if (response.status == 200) {
                            //alert("Lead has been Updated Successfully!");
                            toaster.pop('success', "success", "Pmd Details Has Been Added Successfully!");
                            $timeout(function () { window.location.href = '/Lead/List'; }, 2000);
                        } else {
                            toaster.pop('error', "error", "Unable to update lead!");
                        }
                    });
            }
            $scope.EditFeasibility  = function (LeadFeasibility) {
                console.log(LeadFeasibility);
                console.log($scope.DeletedRows);
                console.log(LeadFeasibility);
                var temp = {
                    Feasibility: LeadFeasibility,
                    Status: $scope.FeasibilityStatus,
                    DeletedRows: $scope.DeletedRows
                }
                console.log(temp);
                $scope.AjaxPost("/api/LeadApi/EditFeasibility", temp).then(
                    function (response) {
                        if (response.status == 200) {
                            //alert("Lead has been Updated Successfully!");
                            toaster.pop('success', "success", "Pmd Details Has Been Updated Successfully!");
                            $timeout(function () { window.location.href = '/Lead/List'; }, 2000);
                        } else {
                            toaster.pop('error', "error", "Unable to update Feasibility!");
                        }
                    });
            }
        }
    ]);