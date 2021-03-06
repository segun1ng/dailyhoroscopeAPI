const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
//CORS- ISSUE SORTED
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
//CORS- ISSUE SORTED
app.get('/', async function(req, res) 
{
    var prediction="";
    var horoscope = ["none","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
    var json =[];
    for(id=1;id<13;id++){
      url = 'https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign='+id;
      var data = await new Promise(function (resolve, reject){
        request(url, function(error, response, html) {
          if(!error) {
            $ = cheerio.load(html);
            prediction = $('div.main-horoscope > p').text();
            resolve({
                id: id,
                horoscope: horoscope[id],
                prediction: prediction,
            });
          }else{
            reject(undefined);
          }
        });
      });
      json.push(data);
    }  
  res.send(json);
});
app.listen(process.env.PORT || 5000);
module.exports = app;