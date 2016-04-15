angular
    .module('starter', ['ionic', 'ngAnimate'])
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
    .config(angularConfig)
    .factory('dataservice', dataServiceFactory)
    .controller('teamController', teamController)
    .controller('memberController', memberController);

function angularConfig($stateProvider, $urlRouterProvider) {
    // if 404 then go to '/page'

    $urlRouterProvider.otherwise('/team');
    $urlRouterProvider.when('/team/member', '/team');

    // Stateprovider
    // ------------------------------
    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'templates/main.tpl.html'
        })
        .state('app.team', {
            url: '/team',
            views: {
                'team@app': {
                    controller: 'teamController as team',
                    templateUrl: 'templates/teamView.tpl.html'
                }
            }
        })
        .state('app.team.member', {
            url: '/member/{id}',
            views: {
                'team@app': {
                    controller: 'memberController as member',
                    templateUrl: 'templates/teamMember.tpl.html'
                }
            }
        })

}

function dataServiceFactory($http) {
    // store data here for when controller refreshes
    var data;
    // uses cached data instead of attempting to retrieving data from server every time
    function getData(callback) {
        if(data) {
            callback(data);
        } else {
            $http.get('/api/people').success(function(response) {
                var idNum = 1000;
                var transformedData = [];
                // transform data
                angular.forEach(response, function(object, platform) {
                    angular.forEach(object, function(member) {
                        member.id = idNum;
                        member.platform = platform;
                        member.photoUrl = member.photoUrl && 'http://assessments.wearetriple.com/photos/' + member.photoUrl || 'img/profile-icon.png';
                        transformedData.push(member)
                        idNum++;
                    })
                })
                callback(data = transformedData);
            });
        }
    }

    return {
        getData: getData
    };
}

function teamController($http, dataservice) {
    var vm = this;
    vm.platforms = ['iOS', 'Android', 'Windows'];
    vm.members
    dataservice.getData(function(data) {
        vm.members = data;
    })

    vm.filterByPlatform = function(platform) {
        if(vm.members && platform) {
            return vm.members.filter(function(value) {
                return value.platform == platform
            });
        }
    }
}

function memberController($stateParams, dataservice) {
    var vm = this;
    var id = $stateParams.id;

    vm.member;

    dataservice.getData(function(data) {
        var filteredData = data.filter(function(value) {
            return value.id == id
        })[0];

        vm.data = filteredData;
    })
}
