var xhttp = new XMLHttpRequest();

let url = "";
let city, country;
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
let response;

let btn = document.querySelector("#submit");
btn.onclick = function () {
    city = document.querySelector("#city").value;
    window.localStorage.setItem("city", city);
    if (city != "") {
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        xhttp.open("GET", url);
        xhttp.send();
    }
}

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 & this.status == 200) {
        response = JSON.parse(this.response);
        let temp = response.main.temp;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${response.weather[0]["icon"]
            }.svg`;
        temp = parseFloat(temp);
        temp = Math.floor(temp);
        document.querySelector(".city-name").innerHTML = response.name;
        document.querySelector(".city-name").innerHTML += "<div class='country'>" + response.sys.country + "</div";
        document.querySelector(".temp").innerHTML = `${temp}°C`;
        document.querySelector(".figure").innerHTML = `<img src="${icon}" alt="${response.weather[0].description}">`;
        document.querySelector(".description").innerHTML = response.weather[0].description;
        document.querySelector(".weather").setAttribute("style", "display: flex;");
    }
}

window.onload = function () {
    document.querySelector(".weather").setAttribute("style", "display: none;");
    let buf = window.localStorage.getItem("city");
    if (buf) {
        document.querySelector("#city").value = buf;
    }
}