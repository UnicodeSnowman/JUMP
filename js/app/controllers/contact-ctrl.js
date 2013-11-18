Jump.Controllers.controller('ContactCtrl', ['$scope', function ($scope) {

    $scope.contact = {
        name: null,
        email: null,
        phone: null,
        message: null
    };

    this.submit = function (isValid) {
        console.log('form submitted, valid: ', isValid);
    };
}]);
