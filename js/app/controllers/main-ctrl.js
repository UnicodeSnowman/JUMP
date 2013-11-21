
var Jump = Jump || {}

Jump.Controllers.controller('MainController', ['$scope', '$state', function ($scope, $state) {
    $scope.$on('$stateChangeSuccess', function (e, params) {
        $scope.current = params.name;
    });
}]);
