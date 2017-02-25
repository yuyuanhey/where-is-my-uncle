var fi, split;
var lat, lng;
var content, time, target;
var myurl = "https://api.darksky.net/forecast/d7a41975c56dc7ca6fb665df24d9f535/";

function trans() {
    var temp = $("#time").val();
    console.log(temp);
    target = Date.parse(temp);
    // console.log(target);
    checkTime();
}

function checkTime(){
    //當目前時間為目標時間前一小時時，搜尋氣象資料
    var now    = Date.now();
    var active = ((target - now) <= 32418000);
    console.log(target + " - " + now + " " + active + " " + (target - now));
    // active = true;
    if(active){
        addressToLatLng();
    }
    else{
        setTimeout(checkTime, 3000);
    }
}

function addressToLatLng() {
    addr = $("#addr").val();
    // console.log(addr);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        "address": addr
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            myurl += (lat +"," + lng);

            $.ajax({
                type: 'GET',
                url: myurl,
                dataType: 'jsonp',
                contentType: "application/json",
                success: function(data){
                    var flag = false;
                    var icon = "";
                    var stat ="";
                    var p = 0;
                    var t = 0;
                    var diff = 2147483647;
                    for(var i = 0; i < data.hourly.data.length; i++){
                        var time = data.hourly.data[i].time;
                        var temp = Math.abs(time - target/1000);
                        if(temp < diff){
                            diff = temp;
                            icon = data.hourly.data[i].icon;
                            stat = data.hourly.data[i].summary;
                            p = data.hourly.data[i].precipProbability;
                            t = data.hourly.data[i].temperature;
                        }
                    }
                    
                    if(icon === "rain")
                        icon = true;
                    else
                        icon = false;
                    alert(icon);
                    // console.log(t);
                    t = ((t - 32) * 5) / 9;
                    // console.log(t);
                    // $("body").append("<div id='icon' style='display:none'>" + icon + "</div>");
                    // $("#shadow").empty();
                    // $("#shadow").append("<input type='text' name='rain' id='rain' value='" + icon + "'/>"
                    //                   + "<input type='text' name='status' id='status' value='" + stat + "'/>"
                    //                   + "<input type='text' name='precipProbability' id='precipProbability' value='" + p + "'/>"
                    //                   + "<input type='text' name='temperature' id='temperature' value='" + t + "'/>");
                    $.post("demo.php",{rain:icon, status:stat, precipProbability:p,temperature:t},        
                        function(data) {
                            // alert("hi");
                           // $('#message').html(data);
                    });
                },
                error: function(e) {
                    alert('Ajax request 發生錯誤');
                },
            });
            console.log(myurl);
        } else {
            alert("查無經緯度");
        }
    });
}