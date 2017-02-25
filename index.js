var i, split;
var lat, lng;
var content, time, target;
var myurl = "https://api.darksky.net/forecast/d7a41975c56dc7ca6fb665df24d9f535/";

var d = new Date();
var n = d.getDay(); // to get which day is today
// var weekday = new Array(7);
// weekday[0] = "sun";
// weekday[1] = "mon";
// weekday[2] = "tue";
// weekday[3] = "wed";
// weekday[4] = "thu";
// weekday[5] = "fri";
// weekday[6] = "sat";
// var n = weekday[d.getDay()];
var rain = true;

function issuccess(){
    $.getJSON('ans.json', function(data){
        console.log(data);
    });
}

function trytry() {
    $.post('test.php',{
            ifrain: rain
        }, function(txt){
            issuccess();
    });
    // $.ajax({
    //     url: "test.php",
    //     data: {ifrain:rain},
    //     type:"POST",
    //     dataType:'text',
    //     success: function(){
    //         console.log("success");
    //     },
    //      error:function(){ 
    //        console.log("fail");
    //      }
    // });
}
trytry();

function trans() {
    $("#target").val("");
    content = $("#source").val();
    //計算出現在目標時間的miliseconds
    time    = Date.parse($("#time").val());
    target = time;
    $("body").empty();
    $("body").append("<p>" + time + "</p>");
    checkTime();
}

function checkTime(){
    var now    = Date.now();
    //當目前時間為目標時間前一小時時，搜尋氣象資料
    var active = ((target - now) <= 32393818);
    console.log("check on " + (target - now) + active);

    if(active){
        addressToLatLng(content);
    }
    else{
        setTimeout(checkTime, 3000);
    }
}

function addressToLatLng(addr) {
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({
        "address": addr
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var content = $("#target").val();
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            // $("#target").html( lat + "," + lng );
            myurl += (lat +"," + lng);

            $.ajax({
                type: 'GET',
                url: myurl,
                dataType: 'jsonp',
                contentType: "application/json",
                // data: myurl,
                success: function(data){
                    //完成之後的callback，data為上面的值
                    var flag = false;
                    var icon = "";
                    var diff = 2147483647;
                    for(var i = 0; i < data.hourly.data.length; i++){
                        var temp = Math.abs(data.hourly.data[i].time - target/1000);
                        if(temp < diff){
                            diff = temp;
                            icon = data.hourly.data[i].icon;
                        }
                    }
                    // alert(icon);
                    $("body").empty();
                    $("body").append("<p>" + icon + "</p>");
                },
                error: function(e) {
                    alert('Ajax request 發生錯誤');
                },
            });
            console.log(myurl);
        } else {
            var content = $("#target").val();
            $("#target").html("查無經緯度" + "\n");
        }
    });
    //ajax get method callback return
    // var url = "https://api.darksky.net/forecast/d7a41975c56dc7ca6fb665df24d9f535/"+ lat +"," + lng;
    // console.log(url);
}
function getData(){

     $.getJSON("data.json", function(result){
        $.each(result, function(i){
            $("#test").append("<div id='" + i + "' class='week'>"
                            +  "<div style='text-align:center'>" + this.ch + "</div>"
                            +  "<input type='text' class'home' value='" + this.home + "'/>"
                            +  "<input type='text' class'dest' value='" + this.dest + "'/>"
                            +  "<input type='datetime-local' class='start' value='" + this.start + "'/>"
                            +  "<input type='datetime-local' class='end' value='" + this.end + "'/>"
                            + "</div>");
        });
    });
}
// getData();
