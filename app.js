const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var cityName = req.body.cityName;
  const apiKey = "YOUR API KEY HERE";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric";

  https.get(url, function(response){
    response.on("data", function(data){
      const weatherObject = JSON.parse(data);




        if(weatherObject.cod == 200) {
          const temp = weatherObject.main.temp;
          const description = weatherObject.weather[0].description;
          const icon = weatherObject.weather[0].icon;
          const iconPath = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.send(`<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="description" content="">
              <meta name="author" content="">
              <title>WeatherNow - Check the current Weather in your City</title>

              <!-- Bootstrap core CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

              <!-- Custom styles for this template -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap" rel="stylesheet">

              <link href="css/style.css" rel="stylesheet">
            </head>
            <body>
              <div class="jumbotron jumbotron-fluid">
              <div class="container">
              <h1 class="display-4">Temperature in ${cityName} is ${temp}°C</h1>
              <p class="lead"><img src="${iconPath}"> ${description.toUpperCase()}</p>
            </div>
            <form action="/return" method="post">
          <button class="btn btn-lg btn-info" type="submit" name="button"> Search Another City</button>
          </form>
            </div>

            </body>
          </html>`);
            }

        else {
          res.send(`<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="description" content="">
              <meta name="author" content="">
              <title>WeatherNow - Check the current Weather in your City</title>

              <!-- Bootstrap core CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

              <!-- Custom styles for this template -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap" rel="stylesheet">

              <link href="css/style.css" rel="stylesheet">
            </head>
            <body>
              <div class="jumbotron jumbotron-fluid">
              <div class="container">
              <h1 class="display-4">OOPS</h1>
              <p class="lead">Sorry! Weather Data not available for the location you specified. Try another Location.</p>
            </div>
            <form action="/return" method="post">
          <button class="btn btn-lg btn-info" type="submit" name="button"> Search Another City</button>
          </form>
            </div>

            </body>
          </html>`);
        }



    });
  })


})

app.post("/return", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server Started at Port 3000");
})


//Api Key -
