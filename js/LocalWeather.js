var city = "";
var country = "";

var weather = {
  temp: "",
  temp_max: "",
  temp_min: "",
  main: ""
};

var apiID = "58de62621e21801261d3f7796d764f5a";

$.getJSON('https://ipapi.co/json/', function(data){
  city = data.city;
  country = data.country;

  var target = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiID;

  $.getJSON(target, function(data){

    weather.temp = data.main["temp"];
    weather.temp_max = data.main["temp_max"];
    weather.temp_min = data.main["temp_min"];
    weather.main = data.weather[0]["main"];
    
    kelvinToCelsius();

    setValues();
    });
});



var flag = true;

$(document).ready(function() {
  $(".change").click(function() {
    if (flag) {
      flag = false;
      celsiusToFarenheit();

    } else {
      flag = true;
      farenheitToCelsius();
    }
  });
});



function kelvinToCelsius(){
  weather.temp = (weather.temp - 273);
  $(".temp").html(Math.round(weather.temp) + "ºC");

  weather.temp_min = (weather.temp_min - 273);
  $(".min").html("Min " + Math.round(weather.temp_min) + "º");

  weather.temp_max = (weather.temp_max - 273);
  $(".max").html("Max " + Math.round(weather.temp_max) + "º");
}

function farenheitToCelsius() {
  weather.temp = (weather.temp - 32) * 5 / 9;
  $(".temp").html(Math.round(weather.temp) + "ºC");

  weather.temp_min = (weather.temp_min - 32) * 5 / 9;
  $(".min").html("Min " + Math.round(weather.temp_min) + "º");

  weather.temp_max = (weather.temp_max - 32) * 5 / 9;
  $(".max").html("Max " + Math.round(weather.temp_max) + "º");
}

function celsiusToFarenheit() {
  weather.temp = weather.temp * 9 / 5 + 32;
  $(".temp").html(Math.round(weather.temp) + "ºF");

  weather.temp_min = weather.temp_min * 9 / 5 + 32;
  $(".min").html("Min " + Math.round(weather.temp_min) + "º");

  weather.temp_max = weather.temp_max * 9 / 5 + 32;
  $(".max").html("Max " + Math.round(weather.temp_max) + "º");
}



function setValues() {
  $(".city").html(city + ', ' + country);
  $(".temp").html(Math.round(weather.temp) + "ºC");
  $(".main").html(weather.main);
  $(".min").html("Min " + Math.round(weather.temp_min) + "º");
  $(".max").html("Max " + Math.round(weather.temp_max) + "º");

  switch (weather.main) {
    case 'Clear':
      $("i").addClass("wi-day-sunny");
      break;
    case 'Clouds':
      $("i").addClass("wi-cloud");
      break;
    case 'Rain':
      $("i").addClass("wi-rain");
      break;
    case 'Snow':
      $("i").addClass("wi-snow");
      break;
    case 'Drizzle':
      $("i").addClass("wi-raindrops");
      break;
    case 'Thunderstom':
      $("i").addClass("wi-thunderstorm");
      break;
    case 'Mist':
      $("i").addClass("wi-fog");
      break;
    default:
      $("i").addClass("wi-na");
  }
}
