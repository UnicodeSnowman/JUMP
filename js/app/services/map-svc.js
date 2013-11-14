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

    var markers = [];

    // TO DO:
    // break out request into team-svc...
    $http.get('data/jump.json').then(function (resp) {
        var bounds = new google.maps.LatLngBounds();

        angular.forEach(resp.data, function (team) {
            var latLng = new google.maps.LatLng(team.location.lat, team.location.lng);
            bounds.extend(latLng);

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: team.name,
                data: team
            });

            google.maps.event.addListener(marker, 'click', function (e) {
                console.log('clicked the maahkah', this);
            });

            markers.push(marker);
        });
        map.fitBounds(bounds);
    });

    var _panTo = function (position) {
        console.log('panning map to ' + position);
        map.panTo(position);
    };

    return {
        map: map,
        markers: function () {
            return markers;
        },
        panTo: _panTo
    }
}]);


