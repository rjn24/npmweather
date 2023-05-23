const express= require("express");
const https= require("https");
const bodyparser=require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  
 res.sendFile(__dirname + "/index.html")
});
  
  app.post("/",function(req,res){
    
     const query = req.body.cityName;
     const appid = "39b9e8872957950971352fb5b3f98617";
     const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+     "&appid="+appid+  "&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp  = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const weatherDescription = weatherData.weather[0].description;
            res.write("<h1> temperature is = "+temp +"Centigrade<h1> ");
            res.write("<h1>   and the description is "+weatherDescription+"<h1>");
            res.write("<h1><img src= " + imageUrl + "></h1> ");
            res.send();
        });
    });
  
  });
  
  
  
  
  

app.listen (process.env.PORT || 3000, function(){
    console.log("Server is running")
});