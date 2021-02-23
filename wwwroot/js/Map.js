window.onload = (function (initMap_ts) {
    //都庁
    var mapCenter = new google.maps.LatLng(35.6896385, 139.689912);
    var mapOptions = {
        center: mapCenter,
        zoom: 15,
        minZoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Create a renderer for directions and bind it to the map.
    var directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    // Instantiate an info window to hold step text.
    var stepDisplay = new google.maps.InfoWindow();
    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService();
    var markerArray = [];
    // Listen to change events from the start and end lists.
    var onClickHandler = function () {
        calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map);
    };
    document.getElementById("getRoute").addEventListener("click", onClickHandler);
    //(document.getElementById("end") as HTMLElement).addEventListener(
    //    "change",
    //    onChangeHandler
    //);
    //マーカー作成
    var marker = new google.maps.Marker({
        position: mapCenter,
        animation: google.maps.Animation.DROP
    });
    marker.setMap(map);
});
function calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route({
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        travelMode: google.maps.TravelMode.DRIVING,
    }, function (result, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);
            showSteps(result, markerArray, stepDisplay, map);
        }
        else {
            window.alert("Directions request failed due to " + status);
        }
    });
}
function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = (markerArray[i] =
            markerArray[i] || new google.maps.Marker());
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}
function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, "click", function () {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}
//# sourceMappingURL=Map.js.map