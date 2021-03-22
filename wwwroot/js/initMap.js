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

    // 地点検索 リスナー設置
    const geocoder = new google.maps.Geocoder();
    document.getElementById("getMap").addEventListener("click", function () {
        geocodeAddress(geocoder, map);
    });
    // 経路検索 リスナー設置
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    document.getElementById("getRoute").addEventListener("click", function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
});

// 地点検索 地点⇔座標変換メソッド
function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address")
        .value;
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
// 経路検索メソッド
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
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
            directionsRenderer.setDirections(response);
        }
        else {
            window.alert("Directions request failed due to " + status);
        }
    });
}
