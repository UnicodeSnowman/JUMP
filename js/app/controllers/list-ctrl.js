Jump.Controllers.controller('ListCtrl', ['$scope', 'mapService', function ($scope, mapService) {

    $scope.teams = _.map(mapService.markers(), function (team) {
        team.data.position = team.position;
        return team.data; 
    });

    this.centerMap = function (location) {
        mapService.zoomTo(location);
    };

}]);
