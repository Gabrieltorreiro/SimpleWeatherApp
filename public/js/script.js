var xhttp = new XMLHttpRequest();

let url = "";
let city, country;
let response;

$("#submit").click(() => {
    sendRequest();
});

window.addEventListener("keydown", e=>{
    if(e.key=="Enter"){
        sendRequest();
    }
});

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 & this.status == 200) {
        response = JSON.parse(this.response);
        let temp = response.main.temp;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${response.weather[0]["icon"]}.svg`;
        temp = parseFloat(temp);
        temp = Math.floor(temp);
        $(".city-name").html(response.name + "<div class='country'>" + response.sys.country + "</div");
        $(".temp").html(`${temp}°C`);
        $(".figure").html(`<img src="${icon}" alt="${response.weather[0].description}">`);
        $(".description").html(response.weather[0].description);
        $(".weather").attr("style", "display: flex;");
    }
}

window.onload = function () {
    $(".weather").attr("style", "display: none;");
    let loadCity = window.localStorage.getItem("city");
    if (loadCity) {
        $("#city").val(loadCity);
    }
}

function sendRequest() {
    city = $('#city').val();
    window.localStorage.setItem("city", city);
    if (city != "") {
        url = `/weather?city=${city}`;
        xhttp.open("GET", url);
        xhttp.send();
    }
}
