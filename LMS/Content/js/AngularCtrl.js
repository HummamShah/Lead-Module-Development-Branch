var app = angular.module('LmsApp', []);

'use strict';
app.controller('baseCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window, $http) {
            console.log("Connected to lms App base ctrl");
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
            //$scope.TryingAjaxService = function () {
            //    $scope.AjaxGet("/api/UserApi/GetListData", null).then(
            //        function (response) {
            //            console.log(response);
            //        })
            //}
            $scope.initIndex = function () {
                $scope.AjaxGet("/api/UserApi/GetListData", null).then(
                    function (response) {
                        console.log(response);
                        $scope.Users = response.data.Data;
                    });
            }
            $scope.AddUser = function (user) {
                console.log(user);
                if (user.DepartmentId == null || user.DepartmentId == 0) {
                    alert("Please Select Department");
                    return;
                }
                if (user.FirstName == null || user.FirstName == "") {
                    alert("Please Enter First Name");
                    return;
                }
                if (user.Email == null || user.Email == "") {
                    alert("Please Enter Email!");
                    return;
                }
                if (user.Contact1 == null) {
                    alert("Please Enter Primary Contact");
                    return;
                }
                if (user.Password == null || user.Password == "") {
                    alert("Enter Password");
                    return;
                }
                if (user.Password != user.ConfirmPassword) {
                    alert("Password and Confirm Password shoul match");
                    return;
                }
                //Loader need to make it generic so we could use this in a function
                $scope.IsServiceRunning = true;
                var promise = $http.post("/api/UserApi/RegisterUser", user, {headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        $scope.IsServiceRunning = false;
                        console.log(response);
                        if (response.status == 200) {
                            alert("User has been Added Successfully!");
                            $timeout(function () { window.location.href = '/User'; }, 2000);
                        } else {
                            alert("Could Not Add new User");
                        }
                        
                    });

            }
            $scope.AddAdmin = function (user) {
                console.log(user);
                var promise = $http.post("/api/UserApi/RegisterAdmin", user, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            alert("Admin has been added Successfully!");
                            $timeout(function () { window.location.href = '/User'; }, 2000);
                        } else {
                            alert("Could Not Add new admin");
                        }

                    });

            }
            $scope.AddAdminInit = function () {
                $scope.Admin = {};
            }
            $scope.AddInit = function () {
                $scope.User = {};
                //Need to call a request to get all the Departments id and name for dropdown
               // $scope.Departments = [{ Id: 0, Name: "Sales_Lead" }, { Id: 1, Name: "PMD" }, { Id: 2, Name: "Pre_Sale" }, { Id: 3, Name: "Closer" }];
                //Sales_Lead,PMD,Pre_Sale,Closer,Administration
                var promise = $http.get("/api/DepartmentApi/GetDepartmentsDropdown", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Departments = response.data.Data;
                    });
                
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
                $scope.Companies = [];
                $scope.MOCS = [{ Name: "Phone", Id: 0 }, { Name: "Email", Id: 1 }, { Name: "Fax", Id: 2 }, { Name: "Visit", Id: 3 }];
                getCompaniesDropdown();
            }
            getCompaniesDropdown =function (){
                var promise = $http.get("/api/CompanyApi/GetCompaniesDropdown", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Companies = response.data.Data;
                    });
            }


            $scope.WiWax = [{ Name: "WiWax1", Id: 0 }, { Name: "WiWax2", Id: 1 }, { Name: "WiWax3", Id: 2 }];
            $scope.DSL = [{ Name: "DSL1", Id: 0 }, { Name: "DSL2", Id: 1 }, { Name: "DSL3", Id: 2 }];
            $scope.VSAT = [{ Name: "VSAT1", Id: 0 }, { Name: "VSAT2", Id: 1 }, { Name: "VSAT3", Id: 3 }];
            $scope.Fiber = [{ Name: "Fiber", Id: 0 }, { Name: "Fiber1", Id: 1 }, { Name: "Fiber2", Id: 2 }];
            $scope.GetDropdownForServies = function (param) {
                //0-dsl,1=Vsat,2=Wiwax,3=Fiber,4-other
                if (param == 0 || param == '0') {
                    $scope.CurrentServices = $scope.DSL;
                }
                if (param == 1 || param == '1') {
                    $scope.CurrentServices = $scope.VSAT;
                }
                if (param == 2 || param == '2') {
                    $scope.CurrentServices = $scope.WiWax;
                }
                if (param == 3 || param == '3') {
                    $scope.CurrentServices = $scope.Fiber;
                }

            }



            $scope.EditInit = function () {
                $scope.Company = {};
                $scope.Companies = [];
                
                getCompaniesDropdown();
                $scope.MOCS = [{ Name: "Phone", Id: 0 }, { Name: "Email", Id: 1 }, { Name: "Fax", Id: 2 }, { Name: "Visit", Id: 3 }];
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
                        $scope.GetDropdownForServies($scope.Company.CUDS);
                        $scope.ParentCompanyId = $scope.Company.ParentCompanyId;
                        console.log($scope.Company);
                    });

            }
            $scope.GetThisConsole = function (id) {
                console.log(id);
                $scope.Company.ParentCompanyId = id;
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
                console.log(Company);
        
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

app.controller('DepartmentCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window, $http) {
            console.log("Connected to Department App");
            $scope.initIndex = function () {
                var promise = $http.get("/api/DepartmentApi/GetListData", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Departments = response.data.Data;
                    });
            }
            $scope.AddInit = function () {
                $scope.Department = {};
            }
            $scope.EditInit = function () {
                $scope.Company = {};
                var Id = $scope.GetUrlParameter("Id");
                var data = {
                    Id: parseInt(Id)
                }
                console.log(data);
                var promise = $http.get("/api/DepartmentApi/GetDepartment", { params: data }, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Department = response.data;
                    });

            }
            $scope.AddDepartment = function (Department) {
                console.log(Department);
                if (Department.Name == null || Department.Name == "") {
                    alert("Name Is Required");
                    return;
                }
               
                var promise = $http.post("/api/DepartmentApi/AddDepartment", Department, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            alert("New Department Added Successfully!");
                            $timeout(function () { window.location.href = '/Department'; }, 2000);
                        }
                        else {
                            alert("Could not add new department");
                        }

                    });
            }

            $scope.EditDepartment = function (Department) {
                console.log(Department);
                if (Department.Name == null || Department.Name == "") {
                    alert("Name Is Required");
                    return;
                }
               
                var promise = $http.post("/api/DepartmentApi/EditDepartment", Department, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            alert("Department has been updated Successfully!");
                            $timeout(function () { window.location.href = '/Department'; }, 2000);
                        } else {
                            alert("Could Not Update Department");
                        }

                    });
            }

        }
    ]);

app.controller('LeadCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        function ($scope, $rootScope, $timeout, $q, $window, $http) {
            console.log("Connected to Lead App");
            $scope.initIndex = function () {
                $scope.Assignment = {};
                $scope.AssignmentTypes = ["Lead","PMD","PreSale"];
                $scope.AjaxGet("/api/LeadApi/GetListData", null).then(
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
            }
            $scope.AddLead = function (Lead) {
                console.log(Lead);
                $scope.AjaxPost("/api/LeadApi/AddLead", Lead).then(
                    function (response) {
                    if (response.status == 200) {
                        alert("Lead has been Added Successfully!");
                        $timeout(function () { window.location.href = '/Lead'; }, 2000);
                    } else {
                        alert("Could Not Add new Lead");
                    }
                });
                //var promise = $http.post("/api/LeadApi/AddLead", Lead, { headers: { 'Accept': 'application/json' } });
                //promise.then(
                //    function (response) {
                //        console.log(response);
                //        if (response.status == 200) {
                //            alert("Lead has been Added Successfully!");
                //            $timeout(function () { window.location.href = '/Lead'; }, 2000);
                //        } else {
                //            alert("Could Not Add new Lead");
                //        }

                //    });

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
                var promise = $http.get("/api/CompanyApi/GetCompaniesDropdown", { params: null, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Companies = response.data.Data;
                    });
            }
            $scope.AddInit = function () {
                $scope.Company = {};
                $scope.Companies = [];
                $scope.Lead = {};
                $scope.Lead.Domain = 0;
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
            $scope.AddNewCompany = function (CompanyId) {
                //Create a request to add a new company and thek refresh the list of company
                var temp = {
                    Name: "NewCompany",
                    Id: 6
                }
                $scope.Companies.push(temp);
            }
            $scope.GetCompanyData = function (Id) {
               
                var data = {
                    Id: Id
                }
                var promise = $http.get("/api/CompanyApi/GetCompany", { params: data }, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        console.log(response);
                        $scope.Lead = response.data;
                        $scope.Lead.CompanyId = Id;
                        $scope.GetDropdownForServies($scope.Lead.CUDS);
                       
                    });
            }


            $scope.Editinit = function () {
                $scope.Company = {};
                $scope.Companies = [];
                $scope.Lead = {};
                $scope.Lead.Domain = 0;
                var Id = $scope.GetUrlParameter("Id");
                var data = {
                    Id: parseInt(Id)
                }
                console.log(data);
                $scope.AjaxGet("/api/LeadApi/GetLead",  data ).then(
                    function (response) {
                        console.log(response);
                        $scope.Lead = response.data;
                        $scope.GetDropdownForServies($scope.Lead.CUDS);
                    });
             
                $scope.MOCS = [{ Name: "Phone", Id: 0 }, { Name: "Email", Id: 1 }, { Name: "Fax", Id: 2 }, { Name: "Visit", Id: 3 }];
                getCompaniesDropdown();
            }
            $scope.EditLead = function (Lead) {
                console.log(Lead);
            }
        }
    ]);