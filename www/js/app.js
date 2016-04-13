angular
    .module('starter', ['ionic'])
    .config(function($httpProvider) {
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
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

function mainController($scope, $http) {
    // import API
    $http.get('/api/people').success(function(results) {
        $scope.platforms = results
    });

}
