//function getCoworkingspapce() {
//    var url = "https://coworkingspaceapi.azurewebsites.net/Coworkingspace";
//    console.log(url);
//}

function getCoworkingspace() {
    $.getJSON("https://coworkingspaceapi.azurewebsites.net/Coworkingspace",
        {
            zipcode: $('#zip').val()
        }
    )
         結果を取得したら…
        .done(function (data) {
             中身が空でなければ、その値を［住所］欄に反映
            if (data.results) {
                var result = data.results[0];
                console.log(result);
                 中身が空の場合は、エラーメッセージを反映
            } else {
                $('#address').val('該当する住所が存在しません。');
            }
        });
}