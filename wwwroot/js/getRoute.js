function getRoute() {

    //getElementById を使う方法の記述例
    var start = document.getElementById("start_place").value;
    var end = document.getElementById("end_place").value;

    // インスタンス作成
    directionsService = new google.maps.DirectionsService();

    var request = {
        origin: start,         // 開始地点
        destination: end,     // 終了地点
        travelMode: google.maps.TravelMode.DRIVING,     // [自動車]でのルート
        avoidHighways: true,        // 高速道路利用フラグ
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            alert('ルートが見つかりませんでした…');
        }
    });
};