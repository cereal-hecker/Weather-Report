const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); 
app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "d2b1709311d3954355b7aca180752e4b";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherDescription);
            console.log(temp);
            res.write("<html>")
            res.write("<h3>The weather is currently " + weatherDescription + ".<h3>");
            res.write("<h1>The temperature in " + query + " is " + temp + "° Celcius.</h1>");
            res.write("<img src=" + imageURL + ">")
            res.write("</html>")
            res.send();
        })
    })
})

app.listen(3000, function(){
    console.log("server on 3k");
})