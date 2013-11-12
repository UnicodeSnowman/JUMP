Jump.Services.factory('mapService', ['$document', '$http', function ($document, $http) {
    
    var mapOptions = {
        center: new google.maps.LatLng(40.758635,-73.98468),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                stylers: [
                    { hue: '#00ffe6'},
                    { saturation: -100 }
                ]
            }
        ]
    },
    map = new google.maps.Map($document[0].getElementById('map'), mapOptions);

    var teams = $http.get('data/jump.json');

    return {
        map: map,
        markers: teams
    }
}]);
