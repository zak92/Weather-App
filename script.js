//Enter your unique API key from Open Weather
var apiKey = "db77137d7f704b5cb623cc4bab155266";
//temperature units wil be in dgrees celsius
var units;
var language;
var symbol = "K";

//User determines if temperature units is metric or imperial

    
     document.getElementById("celsius").addEventListener("click", () => {
        units = "metric";
        symbol =  '&deg;C';
    })
    document.getElementById("fahrenheit").addEventListener("click", () => {
        units = "imperial";
        symbol = '&deg;F';
    })
    
//user determines the language
function langOption(){
    language = document.getElementById("lang");
    var i = language.selectedIndex;
    language = language.options[i].value;
    return language;
}

function cityWeather(searchTerm, countryCode){
    langOption();
    //The fetch() method is used to fetch a resource
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm},${countryCode}&APPID=${apiKey}&units=${units}&lang=${language}`).then(result => {
        return result.json() //Transform the data into json
    }).then(result => { //call another function e.g. to display the data
        initialise(result);
    })
}

function initialise(resultFromServer){
    console.log(resultFromServer)
    //retrieve document id's 
    var cityName = document.getElementById("city-name");
    var countryCode = document.getElementById("country-code");
    var weatherIcon = document.getElementById("weather-icon");
    var weatherDescription = document.getElementById("weather-description");
    var temp = document.getElementById("temp");
    var humidity = document.getElementById("humidity");
    var windSpeed = document.getElementById("wind-speed");
    var clouds = document.getElementById("clouds");
    var pressure = document.getElementById("pressure");
    

   document.querySelector(".moreWeatherData").style.visibility = "visible";


    //If the city name is not found in the database
    if(resultFromServer.cod == 404){
        weatherDescription.innerHTML = "The city name you have entered cannot be found &#128546;";
        temp.innerHTML = "";
        humidity.innerHTML = "";
        windSpeed.innerHTML = "";
        clouds.innerHTML = "";
        pressure.innerHTML = "";
        weatherIcon.style.visibility = "hidden";
        cityName.innerHTML = "";
      
    }
    
    else {
        
        //call object properties from json
        countryCode = resultFromServer.sys.country;
        cityName.innerHTML = resultFromServer.name + ", " + countryCode;
        //Add weather icon image
        weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + ".png";
        var description = resultFromServer.weather[0].description;
        weatherDescription.innerText = description.charAt(0).toUpperCase() + description.slice(1);
        temp.innerHTML = Math.round(resultFromServer.main.temp) + " " + symbol;
        humidity.innerHTML = "Humidity " + " " + resultFromServer.main.humidity + "&#37;";
        windSpeed.innerHTML = "Windspeed " + " " + resultFromServer.wind.speed + "m/s";
        clouds.innerHTML = "Cloudiness " + " " + resultFromServer.clouds.all + "&#37;";
        pressure.innerHTML = "Pressure" + " " + resultFromServer.main.pressure + "hPa";
        
    }
    
    
}

//add event listener to search button, when user clicks on the search button, fetch api is called
document.getElementById("searchBtn").addEventListener("click", () => {
    var searchTerm = document.getElementById("searchField").value;
    if (searchTerm){
        cityWeather(searchTerm);
    }
    
})



