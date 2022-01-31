const express=require('express');
// const res = require('express/lib/response');
const app=express()
const https=require('https')
const bodyparser=require('body-parser')

app.use(bodyparser.urlencoded({extended:true}))
app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html')
})

app.post('/', (req,res)=>{
    const query=req.body.city;
    const url='https://api.openweathermap.org/data/2.5/weather?q=' + query +'&appid=6b3de2ec2685742d20601e3b7052fb7b&units=metric';
    https.get(url, function(response){
        response.on('data', function(data){
            // console.log(JSON.parse(data))
            const weatherdata=JSON.parse(data);
            const temperature=weatherdata.main.temp;
            const weatherdescription=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imageurl=`https://openweathermap.org/img/wn/${icon}@2x.png`
            res.send(`the weather in ${query} is ${weatherdescription} <br> <h1> the current temperature on ${query} is ${temperature} degree celcius</h1> 
            <img src="${imageurl}">`);
        })
    })
})







app.listen(process.env.PORT || 8000,()=>{
    console.log("server is running on port 3000");
})
