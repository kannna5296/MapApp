function initMap() {

    //getElementById を使う方法の記述例
    var place= document.getElementById("place").value;

    // Geocoderインスタンス化
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': place
    },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                //緯度経度取得
                var latlng = results[0].geometry.location;

                //オプション設定
                var mapOptions = {
                    center: latlng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                //地図表示
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);

                //マーカー作成
                var marker = new google.maps.Marker({
                    position: latlng,
                    animation: google.maps.Animation.DROP
                });
                marker.setMap(map);
            } else {
                alert('場所を取得できませんでした');
            }
        });
};