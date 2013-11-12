
var Jump = Jump || {};

Jump.Controllers = angular.module('jump.controllers', []);
Jump.Services = angular.module('jump.services', []);

angular.module('Jump', ['jump.controllers', 'jump.services', 'ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        
        $stateProvider
            .state('index', {
                url: ''
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/about.html'
            })
            .state('list', {
                url: '/list',
                templateUrl: 'partials/list.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'partials/contact.html'
            });
    }])
    .run(['mapService', function (mapService) {
        console.log('app started...');
    }]);

