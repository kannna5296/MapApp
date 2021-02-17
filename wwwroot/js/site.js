function initMap() {

    //getElementById を使う方法の記述例
    var input_message = document.getElementById("place").value;

    // Geocoderインスタンス化
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': input_message
    },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                var latlng = results[0].geometry.location;

                var mapOptions = {
                    center: latlng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById('map'), mapOptions);

                var maker = new google.maps.Maker({
                    position: latlng,
                    animation: google.maps.animation.BOUNCE,
                });


                maker.setMap(map);
            } else {
                alert('場所を取得できませんでした');
            }
        });
};