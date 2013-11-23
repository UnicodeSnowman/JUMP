
var Jump = Jump || {};

Jump.Controllers = angular.module('jump.controllers', []);
Jump.Services = angular.module('jump.services', []);
Jump.Directives = angular.module('jump.directives', []);

angular.module('Jump', ['jump.controllers', 'jump.services', 'jump.directives', 'ui.router'])
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
    .run(['mapService', '$http', '$templateCache', function (mapService, $http, $templateCache) {
        // bootstraps the mapService by injecting it
        console.log('app started...');

        $http.get('partials/popup.html').then(function (resp) {
            $templateCache.put('popupTemplate.html', resp.data);
        });
    }]);

