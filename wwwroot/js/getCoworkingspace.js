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

                // データを地図外に表示
                displayHtml(data);

                const useCurrentPosition = document.getElementById("currentpositionflg");
                if (useCurrentPosition.checked) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            function (position) {
                                const currentLatLng = new google.maps.LatLng(
                                    position.coords.latitude, position.coords.longitude);
                                displayMapByCurrentPosition(data, currentLatLng);
                            },
                            function (error) {
                                switch (error.code) {
                                    case 1: // PERMISSION_DENIED
                                        alert("位置情報の利用が許可されていません");
                                        break;
                                    case 2: // POSITION_UNAVAILABLE
                                        alert("現在位置が取得できませんでした");
                                        break;
                                    case 3: // TIMEOUT
                                        alert("タイムアウトになりました");
                                        break;
                                    default:
                                        alert("その他のエラー(エラーコード:" + error.code + ")");
                                        break;
                                }
                            }
                        )
                    } else {
                        alert("この端末では位置情報が取得できません");
                    }
                } else {
                    displayMap(data);
                }

                //通信エラーになった場合の処理
            }).fail(function (data) {
                alert("失敗しましたm(__)m");
            });
        });
});

function displayHtml(data) {
    $('#cw1_name').html(data[0].name);
    $('#cw1_description').html(data[0].description);
    $('#cw1_link').html("公式サイト");
    var target1 = document.getElementById("cw1_link");
    target1.href = data[0].url;
    $('#cw2_name').html(data[1].name);
    $('#cw2_description').html(data[1].description);
    $('#cw2_link').html("公式サイト");
    var target2 = document.getElementById("cw2_link");
    target2.href = data[1].url;
    $('#cw3_name').html(data[2].name);
    $('#cw3_description').html(data[2].description);
    $('#cw3_link').html("公式サイト");
    var target3 = document.getElementById("cw3_link");
    target3.href = data[2].url;
}

function displayMap(data) {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        // 仮の値（東京都庁）
        center: { lat: 35.6896385, lng: 139.689912 }
    });

    //現在地表示
    const center = map.getCenter();
    makeCurrentPos(map, center.lat(), center.lng());

    //データを距離によって選択
    var arrayPlace = [];
    var arrayName = [];
    for (let i = 0; i < data.length; i++) {

        const place = new google.maps.LatLng(data[i].lat, data[i].lon);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(center, place);

        if (distance < 2400) {
            arrayPlace.push(place);
            arrayName.push(data[i].name);
        }
    }

    // 地図範囲調整
    map.fitBounds(new google.maps.LatLngBounds(
        // sw
        {
            lat: Math.min(...arrayPlace.map(d => d.lat())),
            lng: Math.min(...arrayPlace.map(d => d.lng()))
        },
        // ne
        {
            lat: Math.max(...arrayPlace.map(d => d.lat())),
            lng: Math.max(...arrayPlace.map(d => d.lng()))
        }
    ));

    const markers = Array(arrayPlace.length);
    const infoWindows = Array(arrayPlace.length);

    for (let i = 0; i < arrayPlace.length; i++) {

        const cwLat = arrayPlace[i].lat();
        const cwLng = arrayPlace[i].lng();
        markers[i] = new google.maps.Marker({
            map: map,
            position: { lat: cwLat, lng: cwLng }
        });

        // 吹き出しの追加
        infoWindows[i] = new google.maps.InfoWindow({
            content: '<div class="map">' + arrayName[i] + '</div>'
        });

        // マーカークリック時の吹き出し表示
        markers[i].addListener('click', function () {
            infoWindows[i].open(map, markers[i]);
        });
    }
}

function displayMapByCurrentPosition(data, currentLatLng) {

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        // 現在地
        center: currentLatLng
    });

    //現在地表示
    const center = map.getCenter();
    makeCurrentPos(map, center.lat(), center.lng());

    //データを距離によって選択
    var arrayPlace = [];
    var arrayName = [];
    for (let i = 0; i < data.length; i++) {

        const place = new google.maps.LatLng(data[i].lat, data[i].lon);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(center, place);

        if (distance < 2400) {
            arrayPlace.push(place);
            arrayName.push(data[i].name);
        }
    }

    // 地図範囲調整
    map.fitBounds(new google.maps.LatLngBounds(
        // sw
        {
            lat: Math.min(...arrayPlace.map(d => d.lat())),
            lng: Math.min(...arrayPlace.map(d => d.lng()))
        },
        // ne
        {
            lat: Math.max(...arrayPlace.map(d => d.lat())),
            lng: Math.max(...arrayPlace.map(d => d.lng()))
        }
    ));

    const markers = Array(arrayPlace.length);
    const infoWindows = Array(arrayPlace.length);

    for (let i = 0; i < arrayPlace.length; i++) {

        const cwLat = arrayPlace[i].lat();
        const cwLng = arrayPlace[i].lng();
        markers[i] = new google.maps.Marker({
            map: map,
            position: { lat: cwLat, lng: cwLng }
        });

        // 吹き出しの追加
        infoWindows[i] = new google.maps.InfoWindow({
            content: '<div class="map">' + arrayName[i] + '</div>'
        });

        // マーカークリック時の吹き出し表示
        markers[i].addListener('click', function () {
            infoWindows[i].open(map, markers[i]);
        });
    }
}

// 現在地マーカー作成
function makeCurrentPos(map, currentLat, currentLon) {
    const currentMarker = new google.maps.Marker({
        map: map,
        position: { lat: currentLat, lng: currentLon },
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    })

    const currentMarkerWindow = new google.maps.InfoWindow({
        content: '<div class="map">現在地</div>'
    });

    // マーカークリック時の吹き出し表示
    currentMarker.addListener('click', function () {
        currentMarkerWindow.open(map, currentMarker);
    });
};