const request = require('request');
const express = require("express");
const path = require('path');
const { encode } = require('punycode');
const app = express();

const key = "4d8fb5b93d4af21d66a2948710284366";

app.use(express.static("public"));

app.get("/weather", (req, res) => {
    let city = encodeURI(req.query.city);
    request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`, (err, r, body) => {
        res.send(body);
    });
});

app.listen(3000);