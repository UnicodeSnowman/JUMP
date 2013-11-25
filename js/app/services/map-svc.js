Jump.Services.factory('mapService', [
    '$document', 
    '$http', 
    '$rootScope', 
    '$compile', 
    '$templateCache',
    '$state',
    function ($document, $http, $rootScope, $compile, $templateCache, $state) {

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
    var scope = $rootScope.$new();

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

                markers.forEach(function (marker) {
                    marker.setIcon('img/marker.png');
                });

                angular.element('.infoBox').remove();

                this.setIcon('img/marker_blue.png');

                scope.name = marker.data.name.toUpperCase();
                scope.location = marker.data.location.city + ', ' + marker.data.location.state;
                scope.contact = {
                    name: marker.data.contact,
                    email: marker.data.email,
                    tel: marker.data.phone
                };
                scope.close = function () {
                    angular.element('.infoBox').remove();
                    marker.setIcon('img/marker.png');
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
                window.setTimeout(function () {
                    scope.$apply(function () {
                        popup.open(map, marker);
                        if ($state.current.name === 'index') {
                            $state.transitionTo('map');
                        }
                        
                    });
                }, 0);
            });

            markers.push(marker);
        });
        map.fitBounds(bounds);
    });

    var _zoomTo = function (marker) {
        map.panTo(marker.position);
        map.setZoom(10);
        
        var mkr = _.find(markers, function (m) {
            return m.title.toLowerCase() == marker.name.toLowerCase();
        });
        google.maps.event.trigger(mkr, 'click');
    };

    return {
        map: map,
        markers: function () {
            return markers;
        },
        zoomTo: _zoomTo
    }
}]);


