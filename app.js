const { json } = require("express");
const express=require("express");
const https=require("https")
const app=express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
  })
  
  app.post('/',(req,res)=>{
   const query=req.body.city;
   const tempUnit=req.body.temp
   console.log(query);
   console.log(tempUnit);
   let unit = 'metric'; // Default unit is Celsius
   if (tempUnit === 'Fahrenheit') {
       unit = 'imperial'; // Set unit to Fahrenheit
   } else if (tempUnit === 'Kelvin') {
       unit = 'standard'; // Set unit to Kelvin
   }
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&APPID=ca19c92eea96cec0d24cab6afb5cc72b";
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weatherData = JSON.parse(data)
      //  console.log(weatherData)
        const temp=weatherData.main.temp
        //console.log(temp)
        const weatherDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageURL=" http://openweathermap.org/img/wn/10d@2x.png"
        let tempInUnits = temp;
        if (tempUnit === 'Fahrenheit') {
            tempInUnits = (temp * 9/5) + 32; // Convert Celsius to Fahrenheit
        } else if (tempUnit === 'Kelvin') {
            tempInUnits = temp + 273.15; // Convert Celsius to Kelvin
        }
        //console.log(weatherDescription)
        res.write("<h1>The temperature in "+query+" is"+ temp +"degree" + tempUnit+ "</h1>")
        res.write("<p>The weather is currently"+weatherDescription+"</p>")
        res.write("<img src="+imageURL+">")
        res.send();
      })
    })
   })
  
app.get("/", function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca19c92eea96cec0d24cab6afb5cc72b"
    https.get(url,function(response){
        
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data)

           //JSON.stringify(weather);
           const temp=weatherData.main.temp

           const weatherdescription=weatherData.weather[0].description
          const icon=weatherData.weather[0].icon
          const imageurl="http://openweathermap.org/img/wn/10d@2x.png"
           //console.log(weather);
           // console.log(weatherdescription)
           res.write("<h1>the temprature is london from"+ temp +"degree</h1>");
           res.write("<p>the weather is currently"+ weatherdescription + "</p>")
           res.write(`<img src=${imageurl} >`)
           res.send()
        })
    })
   // res.send("server is up and running")
})

app.post("/",(req,res)=>{
    console.log("post request received")
    console.log(req.body.city)
  })
app.listen(3000,function(){
    console.log("server is running on port 3000.")
})