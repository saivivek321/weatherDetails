const express= require("express");
const bodyParser=require("body-parser");


const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
         res.sendFile(__dirname+"/index.html");
  //res.send("Todays weather is cooler");
})

app.post("/",function(req,res){

  const city=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d30addb49f9dfa0b26e23589c6ef47ac&units=metric";

  https.get(url,(response)=>{
  //  console.log(response);
      response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const dis=weatherData.weather[0].description;
        const place=weatherData.name;
        const icon =weatherData.weather[0].icon;
        const src="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       //console.log(place+" "+temp+" "+dis);
       res.write("<html>")
       res.write("<h3>Place :"+place+"</h3>")
        res.write("<h2>Description "+ dis+"</h2>")
       res.write("<h1>Temperature at this place is "+temp+"</h1>")
       res.write("<img src="+ src+" >")
      // res.write("</html>")
       res.send();
      })
  })
})

app.listen(3000,()=>{
  console.log("Servere is running at 3000");
})
