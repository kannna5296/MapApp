window.onload = ((initMap_ts) => {
    //都庁
    const mapCenter = new google.maps.LatLng(35.6896385, 139.689912);

    const mapOptions = {
        center: mapCenter,
        zoom: 15,
        minZoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Create a renderer for directions and bind it to the map.
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    // Instantiate an info window to hold step text.
    const stepDisplay = new google.maps.InfoWindow();

    // Instantiate a directions service.
    const directionsService = new google.maps.DirectionsService();

    const markerArray: google.maps.Marker[] = [];

    // Listen to change events from the start and end lists.
    const onClickHandler = function () {
        calculateAndDisplayRoute(
            directionsRenderer,
            directionsService,
            markerArray,
            stepDisplay,
            map
        );
    };
    (document.getElementById("getRoute") as HTMLElement).addEventListener(
        "click",
        onClickHandler
    );
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

function calculateAndDisplayRoute(
    directionsRenderer: google.maps.DirectionsRenderer,
    directionsService: google.maps.DirectionsService,
    markerArray: google.maps.Marker[],
    stepDisplay: google.maps.InfoWindow,
    map: google.maps.Map
) {
    // First, remove any existing markers from the map.
    for (let i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route(
        {
            origin: (document.getElementById("start") as HTMLInputElement).value,
            destination: (document.getElementById("end") as HTMLInputElement).value,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (
            result: google.maps.DirectionsResult | null,
            status: google.maps.DirectionsStatus
        ) => {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === google.maps.DirectionsStatus.OK && result) {

                directionsRenderer.setDirections(result);
                showSteps(result, markerArray, stepDisplay, map);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}

function showSteps(
    directionResult: google.maps.DirectionsResult | null,
    markerArray: google.maps.Marker[],
    stepDisplay: google.maps.InfoWindow,
    map: google.maps.Map
) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    const myRoute = directionResult!.routes[0]!.legs[0]!;

    for (let i = 0; i < myRoute.steps.length; i++) {
        const marker = (markerArray[i] =
            markerArray[i] || new google.maps.Marker());
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
            stepDisplay,
            marker,
            myRoute.steps[i].instructions,
            map
        );
    }
}

function attachInstructionText(
    stepDisplay: google.maps.InfoWindow,
    marker: google.maps.Marker,
    text: string,
    map: google.maps.Map
) {
    google.maps.event.addListener(marker, "click", () => {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}