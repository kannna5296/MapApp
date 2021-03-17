window.onload = (function (initMap) {
    //初期表示（東京都庁）
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 35.6896385, lng: 139.689912 },
    });
    // 地点検索 リスナー設置
    var geocoder = new google.maps.Geocoder();
    document.getElementById("getMap").addEventListener("click", function () {
        geocodeAddress(geocoder, map);
    });
    // 経路検索 リスナー設置
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    document.getElementById("getRoute").addEventListener("click", function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
});
// 地点検索 地点⇔座標変換メソッド
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById("address")
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
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var travelMode = document.getElementById("travelmode").value;
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
