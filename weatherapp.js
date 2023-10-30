const{response}=require('express');
const express = require('express');
const https =require('https');
const bodyParser =require('body-parser');

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
   res.sendFile(__dirname+"/weatherapp.html");
})

app.post('/',(req,res)=>{

    const querry= req.body.cityName
    const apikey ='aee5716a8944dc1e017608774989ac65'
    const url='https://api.openweathermap.org/data/2.5/weather?q='+querry+'&appid='+apikey+'&units=metric'

    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const discription =weatherData.weather[0].description
            res.write("<h1>the temperature in "+querry+" is "+temp+" degree celcius </h1>");
            res.write("<p> the weather discription is "+discription+"</p>"); 
            
        })
    })
})

app.listen(4321, ()=> 
console.log("server is running in port 4321"))