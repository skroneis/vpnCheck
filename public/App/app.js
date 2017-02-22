var commonModule = angular.module('common', []);
var mainModule = angular.module('main', ['common', 'ngRoute', 'ngTouch', 'ui.bootstrap']);

commonModule.factory('viewModelHelper', function ($http, $q, $window, $location) { return MyApp.viewModelHelper($http, $q, $window, $location); });

mainModule.controller("TimeCtrl", function ($scope, $timeout) {
    //alert("HI");
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms
    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    // Start the timer
    $timeout(tick, $scope.tickInterval);
});

(function (myApp) {
    "use strict";
    var viewModelHelper = function ($http, $q, $window, $location) {

        var self = this;

        self.modelIsValid = true;
        self.modelErrors = [];

        self.resetModelErrors = function () {
            self.modelErrors = [];
            self.modelIsValid = true;
        }

        //http-GET
        self.apiGet = function (uri, data, success, failure, always) {
            self.modelIsValid = true;
            //4 IsAjaxRequest in MVC
            $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            $http.get(MyApp.rootPath + uri, data)
                .then(function (result) {
                    //alert("res");
                    success(result);
                    if (always != null)
                        always();
                }, function (result) {
                    if (failure != null) {
                        failure(result);
                    }
                    else {
                        var errorMessage = result.status + ':' + result.statusText;
                        if (result.data != null && result.data.Message != null)
                            errorMessage += ' - ' + result.data.Message;
                        self.modelErrors = [errorMessage];
                        self.modelIsValid = false;
                    }
                    if (always != null)
                        always();
                });
        }

        //with anti-forgery token
        self.apiSecGet = function (uri, data, token, success, failure, always) {
            //alert(token);
            console.log("apiSecGet");
            console.log(token);
            $http.defaults.headers.common["RequestVerificationToken"] = token;
            self.apiGet(uri, data, success, failure, always);
        }

        //http-POST
        self.apiPost = function (uri, data, success, failure, always) {
            self.modelIsValid = true;
            //4 IsAjaxRequest in MVC
            $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            $http.defaults.headers.common["Content-Type"] = "application/json";
            $http.post(MyApp.rootPath + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                }, function (result) {
                    if (failure != null) {
                        failure(result);
                    }
                    else {
                        var errorMessage = result.status + ':' + result.statusText;
                        if (result.data != null && result.data.Message != null)
                            errorMessage += ' - ' + result.data.Message;
                        self.modelErrors = [errorMessage];
                        self.modelIsValid = false;
                    }
                    if (always != null)
                        always();
                });
        }

        //with anti-forgery token
        self.apiSecPost = function (uri, data, token, success, failure, always) {
            //alert(token);
            console.log("apiSecPost");
            console.log(token);
            $http.defaults.headers.common["RequestVerificationToken"] = token;
            self.apiPost(uri, data, success, failure, always);
        }

        self.goBack = function () {
            $window.history.back();
        }

        self.navigateTo = function (path) {
            $location.path(MyApp.rootPath + path);
        }

        self.refreshPage = function (path) {
            $window.location.href = MyApp.rootPath + path;
        }

        self.clone = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        }

        self.alert = function (message) {
            alert(message);
        }

        self.notify = function (message) {
            $.notify(message, {
                globalPosition: 'bottom right',
                className: 'info', //success
                //style: 'bootstrap',
                autoHideDelay: 4000,
                showAnimation: 'fadeIn',
                showDuration: 400,
                hideAnimation: 'fadeOut',
                hideDuration: 200,
                style: 'customStyle'
            });
        }

        self.notifySuccessSingle = function (message) {
            $.notify(message,
                {
                    position: "right",
                    className: "success"
                });
        }

        self.notifySuccess = function (item, message) {
            $("#" + item).notify(message,
                {
                    position: "right",
                    className: "success"
                });
        }

        self.notifySuccessBottom = function (item, message) {
            $("#" + item).notify(message,
                {
                    position: "bottom",
                    className: "success"
                });
        }

        self.notifyErrorSingle = function (message) {
            $.notify(message,
                {
                    position: "top right",
                    className: "error"
                });
        }

        self.notifyError = function (item, message) {
            $("#" + item).notify(message,
                {
                    position: "right",
                    className: "error"
                });
        }

        return this;
    };
    myApp.viewModelHelper = viewModelHelper;
} (window.MyApp));