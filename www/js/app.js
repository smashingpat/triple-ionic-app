angular
    .module('starter', ['ionic'])
    .factory('dataservice', dataServiceFactory)
    .run(function($ionicPlatform, $http) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller('mainController', mainController);

function dataServiceFactory($http) {
    function retrieveData() {
        return $http.get('/api/people').then(function(response) {
            return response.data;
        });
    }

    return {
        retrieveTeam: retrieveData
    }
}

function mainController($scope, $http, dataservice) {
    $scope.platforms = [];
    dataservice.retrieveTeam().then(function(data) {
        $scope.platforms = data;
    })
}
