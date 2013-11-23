Jump.Services.factory('mapService', [
    '$document', 
    '$http', 
    '$rootScope', 
    '$compile', 
    '$templateCache',
    function ($document, $http, $rootScope, $compile, $templateCache) {

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
                icon: 'img/marker.png',
                title: team.name,
                data: team
            });

            google.maps.event.addListener(marker, 'click', function (e) {
                angular.element('.infoBox').remove();
                var scope = $rootScope.$new();

                scope.name = marker.data.name;
                scope.location = marker.data.location.city + ', ' + marker.data.location.state;
                scope.contact = {
                    name: marker.data.contact,
                    email: marker.data.email
                };
                scope.close = function () {
                    angular.element('.infoBox').remove();
                };

                var templ = $templateCache.get('popupTemplate.html');
                templ = angular.element(templ)[0].innerHTML;

                content = angular.element(templ);
                content = $compile(content)(scope);
                
                var popupOptions = {
                    content: content[0],
                    pixelOffset: new google.maps.Size(-280, 10)
 
                };

                var popup = new InfoBox(popupOptions);
                scope.$apply(function () {
                    popup.open(map, marker);
                });
            });

            markers.push(marker);
        });
        map.fitBounds(bounds);
    });

    var _zoomTo = function (marker) {
        map.panTo(marker.position);
        map.setZoom(10);
        
        //google.maps.event.trigger(marker, 'click');
    };

    return {
        map: map,
        markers: function () {
            return markers;
        },
        zoomTo: _zoomTo
    }
}]);


