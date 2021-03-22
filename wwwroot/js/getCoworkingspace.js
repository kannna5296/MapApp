$(function () {
    $('#getCW').click(
        function () {
            $.ajax({
                //自作 コワーキングスペースAPI
                url: 'https://coworkingspaceapi.azurewebsites.net/Coworkingspace',
                //通信方法
                type: 'GET',
                //データ形式を指定
                dataType: 'json',
                //通信に成功した場合の処理
            }).done(function (data) {
                displayHtml(data);
                displayMap(data);
                //通信エラーになった場合の処理
            }).fail(function (data) {
                alert("失敗しましたm(__)m");
            });
        });
});

function displayHtml(data) {
    $('#cw1_name').html(data[0].name);
    $('#cw1_description').html(data[0].description);
    $('#cw2_name').html(data[1].name);
    $('#cw2_description').html(data[1].description);
    $('#cw3_name').html(data[2].name);
    $('#cw3_description').html(data[2].description);
}

function displayMap(data) {

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        // 仮の値（東京都庁）
        center: { lat: 35.6896385, lng: 139.689912 }
    });

    var markers = Array(data.length + 1);
    var infoWindows = Array(data.length + 1);

    var center = map.getCenter();

    // 地図範囲調整
    map.fitBounds(new google.maps.LatLngBounds(
        // sw
        {
            lat: Math.min(...data.map(d => d.lat), center.lat()),
            lng: Math.min(...data.map(d => d.lon), center.lng())
        },
        // ne
        {
            lat: Math.max(...data.map(d => d.lat), center.lat()),
            lng: Math.max(...data.map(d => d.lon), center.lng())
        }
    ));

    for (let i = 0; i < data.length; i++) {

        var place = new google.maps.LatLng(data[i].lat, data[i].lon);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(center, place);

        if (distance < 2400) {
            var cwLat = data[i].lat;
            var cwLng = data[i].lon;
            markers[i] = new google.maps.Marker({
                map: map,
                position: { lat: cwLat, lng: cwLng }
            });

            // 吹き出しの追加
            infoWindows[i] = new google.maps.InfoWindow({
                content: '<div class="map">' + data[i].name + '</div> <div class="distance>' + distance + 'm</div>'
            });

            // マーカークリック時の吹き出し表示
            markers[i].addListener('click', function () {
                infoWindows[i].open(map, markers[i]);
            });
        }
    }
    makeCurrentPos(map, center.lat(), center.lng());
}

function makeCurrentPos(map, currentLat, currentLon) {
    var currentMarker = new google.maps.Marker({
        map: map,
        position: { lat: currentLat, lng: currentLon },
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    })

    var currentMarkerWindow = new google.maps.InfoWindow({
        content: '<div class="map">現在地</div>'
    });

    // マーカーをクリックしたとき
    currentMarker.addListener('click', function () {
        currentMarkerWindow.open(map, currentMarker); 
    });
};