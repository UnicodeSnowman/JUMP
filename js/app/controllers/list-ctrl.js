Jump.Controllers.controller('ListCtrl', ['$scope', 'mapService', function ($scope, mapService) {

    $scope.states = [];

    var groupByState = _.groupBy(mapService.markers(), function (marker) {
       return marker.data.location.state; 
    });

    angular.forEach(groupByState, function (teams, name) {
        $scope.states.push({
            name: name,
            teams: teams
        }); 
    });

    this.centerMap = function (marker) {
        mapService.panTo(marker.position);
    };

}]);
