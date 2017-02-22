mainModule.controller("stoneController", function ($scope, viewModelHelper, $http) {
    $scope.Sepp = "Sepp Forcher";
    $scope.isLoading = false;

    var initialize = function () {
        console.log("initialize");
        $scope.getValues();
    }

    $scope.init = function () {
        console.log("init");
        initialize();
    };

    $scope.getValues = function () {
        //alert("getInfos");
        // console.log("getInfos");
        $scope.isLoading = true;
        //$http.defaults.headers.common["RequestVerificationToken"] = $scope.token;
        // console.log("-----------------------------");
        // console.log(MyApp.rootPath);
        return $http.get(MyApp.rootPath + 'api/getData', null).then(function (response) {
            // console.log(response.data);
            $scope.data = response.data;
            $scope.isLoading = false;
        },
            function errorCallback(response) {
                console.log("ERROR");
                // bootbox.alert("ERROR");            
                console.log(response.data);
            });
    };   

    $scope.getDate = function () {
        return new Date();
    }; 

    setInterval(function () {
        // console.log("get....");
        $scope.getValues();
    }, 1000 * 5) //5 secongs...
});