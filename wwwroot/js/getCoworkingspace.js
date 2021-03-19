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

    // 地図範囲調整
    map.fitBounds(new google.maps.LatLngBounds(
        // sw
        {
            lat: Math.min(...data.map(d => d.lat)),
            lng: Math.min(...data.map(d => d.lon))
        },
        // ne
        {
            lat: Math.max(...data.map(d => d.lat)),
            lng: Math.max(...data.map(d => d.lon))
        }
    ));

    var markers = Array(data.length);
    var infoWindows = Array(data.length);

    var center = map.getCenter();

    for (let i = 0; i < data.length; i++) {

        var place = new google.maps.LatLng(data[i].lat, data[i].lon);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(center, place);

        if (distance < 1400) {
            var cwLat = data[i].lat;
            var cwLng = data[i].lon;
            markers[i] = new google.maps.Marker({
                map: map,
                position: { lat: cwLat, lng: cwLng }
            });

            infoWindows[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: '<div class="map">' + data[i].name + '</div> <div class="distance>' + distance + 'm</div>' // 吹き出しに表示する内容
            });

            markers[i].addListener('click', function () { // マーカーをクリックしたとき
                infoWindows[i].open(map, markers[i]); // mapみmakerをの吹き出しの表示します
            });
        }
    }
}