//初期にとりあえず表示させる用
window.onload = function initMap() {
    //都庁
    var mapCenter = new google.maps.LatLng(35.6896385, 139.689912);

    var mapOptions = {
        center: mapCenter,
        zoom: 15,
        minZoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //マーカー作成
    var marker = new google.maps.Marker({
        position: mapCenter,
        animation: google.maps.Animation.DROP
    });
    marker.setMap(map);
}