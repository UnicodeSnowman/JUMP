
var parseData = function (teams) {

    return teams.map(function (team) {

        var _location = team.location.split(",");
        _location = _location.map(function (loc) {
            return loc.trim();
        });

        _location = {
            city: _location[0],
            state: _location[1].split(' ')[0],
            zip: _location[1].split(' ')[1]
        }

        team.location = _location;

            

        return team;
    });
}

var setLatLng = function (teams) {

    return teams.map(function (team) {
    
        $.ajax({
            method: 'GET',
            //url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + team.location.city + ',' + team.location.state + ',' + team.location.zip + '&sensor=false',
            url: 'http://open.mapquestapi.com/geocoding/v1/address?key=Kmjtd%7Cluu7n162n1%2C22%3Do5-h61wh&location=' + team.location.city + ',' + team.location.state,
            async: false,
            success: function (data) {
                console.log(data); 
                team.location.lat = data.results[0].locations[0].latLng.lat;
                team.location.lng = data.results[0].locations[0].latLng.lng;
            }
        });

        return team;
    })
    
}
