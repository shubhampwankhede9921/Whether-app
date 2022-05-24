const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();
app.use(bodyparser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    var query ="" +req.body.city+"";
    var appkey = "cc66258c3586cb454030d481a11e2e8e";
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appkey + "&units=" + unit + "";
    https.get(url, function (responce) {
        console.log(responce.status);

        responce.on("data", function (data) {
            const wheatherData = JSON.parse(data);
            const temp = wheatherData.main.temp;
            const des = wheatherData.weather[0].description;
            const icon = wheatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>contry "+ wheatherData.sys.country+"</p>");
            res.write("<p>The weather description of " + query + " is : " + des);
            res.write("<h1>The tempreture of the " + query + " is : " + temp + " deg.</h1>");
            res.write("<img src=" + imgurl + ">");
            res.send();

        })
    });


});


app.listen(3000, function () {
    console.log("server is started at 3000..");
});
