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
                alert("成功!");
                $('#cw1_name').html(data[0].name);
                $('#cw1_description').html(data[0].description);
                $('#cw2_name').html(data[1].name);
                $('#cw2_description').html(data[1].description);
                $('#cw3_name').html(data[2].name);
                $('#cw3_description').html(data[2].description);
                //通信エラーになった場合の処理
            }).fail(function (data) {
                alert("失敗!");
            });
        });
});