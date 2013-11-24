Jump.Controllers.controller('ListCtrl', ['$scope', 'mapService', function ($scope, mapService) {

    $scope.teams = _.map(mapService.markers(), function (team) {
        team.data.position = team.position;
        team.data.name = team.data.name.toUpperCase();
        return team.data; 
    });

    this.centerMap = function (marker) {
        mapService.zoomTo(marker);
    };

}]);
