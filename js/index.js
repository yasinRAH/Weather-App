//specific location: http://ip-api.com/json
//note: if no information is appearing, check the pen's URL and make sure it is using http protocol, not https.

var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?";
var lat;
var lon;
var id = "&APPID=a10b60b276b2186cc15854a238a4510f";
var combinedUrl;
var celsius;
var fahrenheit;

$(document).ready(function() {
  function getLocation() { //obtains lon, lan and region
    $.ajax({
      url: "http://ip-api.com/json",
      success: function(ip) {
        lat = "lat=" + ip.lat;
        lon = "&lon=" + ip.lon;
        combinedUrl = weatherUrl + lat + lon + id;
        console.log(combinedUrl); //used to check url, will be taken out in project's completion.

        function getWeather() { //weather api call
          $.ajax({
            url: combinedUrl,
            success: function(weathData) {

              celsius = weathData.main.temp - 273.15;
              fahrenheit = weathData.main.temp * 9 / 5 - 459.67;

              $("#temp").text(Math.round(celsius));

              function setFahrenheit() {
                return Math.round(fahrenheit);
              }

              function setCelsius() {
                return Math.round(celsius);
              }

              $("#deg").on("click", function() {
                $("#deg").toggleClass("celsius");
                $("#deg").toggleClass("fahrenheit");

                if ($(this).hasClass("celsius")) {
                  $("#temp").text(setFahrenheit());
                  $("#deg").text("° F");
                  return;
                }

                $("#temp").text(setCelsius());
                $("#deg").text("° C");
              });

              switch (weathData.weather[0].icon) { //changes icon depending on conditions
                case "01d":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486178156/clearDay.png" alt="Clear Skies"/>'); //clear skies day
                  break;
                case "01n":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486179805/clearNight.png" alt="Clear Skies"/>'); //clear skies night
                  break;
                case "02d":
                case "03d":
                case "04d":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486184006/cloudDay.png" alt="Slight Clouds"/>'); //clouds day
                  break;
                case "02n":
                case "03n":
                case "04n":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486184206/cloudNight.png" alt="Slight Clouds"/>'); //clouds night
                  break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486184577/rain.png" alt="Showers"/>'); //rain 
                  break;
                case "11d":
                case "11n":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486184741/Thunderstorm.png" alt="thunderstorm"/>'); //thunderstorm
                  break;
                case "13d":
                case "13n":
                  $("#condition-img").append('<img src="http://res.cloudinary.com/yasinrah/image/upload/v1486184889/snow.png" alt="Snow"/>'); //snow
                  break;
                default:
                  $("#condition-img").append('<h1>Icon N.A</h1>'); //other conditions
              }

              switch (weathData.weather[0].icon) { //changes background depending on conditions
                case "01d":
                case "02d":
                  $("body").css("background-image", "url(http://maxpixel.freegreatpicture.com/static/photo/1x/Clear-Sky-Cloudscape-Sun-Sunlight-Halo-Blue-Sky-299765.jpg)"); //clear sky day
                  break;
                case "01n":
                case "02n":
                  $("body").css("background-image", "url(https://c1.staticflickr.com/8/7376/16358792937_4d68693e8d_b.jpg)"); //clear sky night
                  break;
                case "03d":
                case "04d":
                  $("body").css("background-image", "url(http://www.publicdomainpictures.net/pictures/40000/velka/fluffy-clouds.jpg)"); //clouds day
                  break;
                case "03n":
                case "04n":
                  $("body").css("background-image", "url(http://maxpixel.freegreatpicture.com/static/photo/1x/Atmosphere-Clouds-Sky-Moon-Nature-Outdoor-Night-1833172.jpg)"); //clouds night
                  break;
                case "09d":
                case "10d":
                  $("body").css("background-image", "url(http://www.publicdomainpictures.net/pictures/30000/velka/rain-1340354630BEa.jpg)"); //rain day
                  break;
                case "09n":
                case "10n":
                  $("body").css("background-image", "url(https://upload.wikimedia.org/wikipedia/commons/5/58/Rain-drops.jpg)"); //rain night
                  break;
                case "11d":
                  $("body").css("background-image", "url(https://c1.staticflickr.com/1/776/23691566642_bf45ee0bd3_b.jpg)"); //thunderstorm day
                  break;
                case "11n":
                  $("body").css("background-image", "url(http://4.bp.blogspot.com/-ugLw1SISNqY/UYfYLM7D4WI/AAAAAAAAAgM/sygpKe3UBhE/s1600/Tormenta2.jpg)"); //thunderstorm night
                  break;
                case "13d":
                  $("body").css("background-image", "url(https://upload.wikimedia.org/wikipedia/commons/b/be/Lijiang_Yunnan_China_Jade-Dragon-Snow-Mountain-01.jpg)"); //snow day
                  break;
                case "14n":
                  $("body").css("background-image", "url(https://static.pexels.com/photos/6548/cold-snow-winter-mountain.jpeg)"); //snow night
                  break;
                default:
                  $("body").css("background-image", "url(http://www.publicdomainpictures.net/pictures/40000/velka/fluffy-clouds.jpg)"); //default, clouds day background
              }

              $("#cond").text(weathData.weather[0].description);
              $("#region").text(ip.regionName);
            }
          });
        }
        getWeather();
      }
    });
  }

  getLocation();
});