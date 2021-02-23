window.onload = ((initMap) => {
    //初期表示（東京都庁）
    const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
            zoom: 15,
            center: { lat: 35.6896385, lng: 139.689912 },
        }
    );

    // 地点検索 リスナー設置
    const geocoder = new google.maps.Geocoder();
    (document.getElementById("getMap") as HTMLButtonElement).addEventListener(
        "click",
        () => {
            geocodeAddress(geocoder, map);
        }
    );

    // 経路検索 リスナー設置
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    (document.getElementById("getRoute") as HTMLButtonElement).addEventListener(
        "click",
        () => {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
    );
});

// 地点検索 地点⇔座標変換メソッド
function geocodeAddress(
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map
) {
    const address = (document.getElementById("address") as HTMLInputElement)
        .value;
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// 経路検索メソッド
function calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
) {
    //始点・終点・モード取得
    var start = (document.getElementById("start") as HTMLInputElement).value;
    var end = (document.getElementById("end") as HTMLInputElement).value;
    var travelMode = (document.getElementById("travelmode") as HTMLInputElement).value;
    directionsService.route(
        {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode[travelMode]
        },
        (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}