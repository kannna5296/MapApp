window.onload = (function (initMap) {
    //初期表示（東京都庁）
    const initLocation = { lat: 35.6896385, lng: 139.689912 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: initLocation
    });
    const marker = new google.maps.Marker({
        map: map,
        position: initLocation
    })

    //検索窓追加
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
});

// 地点検索 地点⇔座標変換
$('#getMap').click(function () {
    const address = document.getElementById("address")
        .value;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15
    });
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
})

$('#getRoute').click(function () {

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15
    });
    //始点・終点・モード取得
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const travelMode = document.getElementById("travelmode").value;
    directionsRenderer.setOptions({
        polylineOptions: {
            strokeColor: '#6F51A1'
        }
    });
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[travelMode]
    }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response);
        }
        else {
            window.alert("Directions request failed due to " + status);
        }
    });
})