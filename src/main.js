const APIKEY = '9d33630a5cce4194a6b140510230808';

function requestByLocation(location){
    fetch("http://api.weatherapi.com/v1/current.json?key=" + APIKEY + "&q=" + location + "&aqi=no")
    .then(function(response){
        if(!response.ok){
            window.alert("We could not find weather at that location. Please try again");
            throw new Error("Weather request failed.");
        }
        return response.json();
    })
    .then(function(data){
        showWeather(data);
    });
}

function showWeather (data) {
    let location = data.location.name;
    let description = data.current.condition.text;
    let icon = data.current.condition.icon;
    let temperature = data.current.temp_c;
    let windSpeed = data.current.wind_mph;
    let windDirection = data.current.wind_degree;
    let windDirectionCompass = data.current.wind_dir;

    document.querySelector(".location").innerText = location;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temperature + "°C";
    document.querySelector(".windSpeed").innerText = windSpeed + " mph";
    document.getElementById("weatherIcon").src = icon;
    document.getElementById("weatherIcon").alt += description + " weather";
    document.getElementById("windDirectionArrow").style.transform = "rotate(" + windDirection + "deg)";
    document.getElementById("windDirectionArrow").alt += windDirectionCompass;

}

function searchByLocation(){
    let location = document.getElementById("locationSearch").value;
    if (location !== ''){
        requestByLocation(document.getElementById("locationSearch").value);
    } else {
        document.getElementById("locationSearch").placeholder = "Please enter a location"
    }
}

document.getElementById("locationSearch").addEventListener("keyup", function (event){
    if (event.key == "Enter"){
        searchByLocation();
    }
});

function getCoords(){
    if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(requestByCoords);
    } else {
     document.querySelector(".exactLocation").remove();
     window.alert("Your exact location could not be assessed. Please search for your location instead.");
    }
}

function requestByCoords(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    fetch("http://api.weatherapi.com/v1/current.json?key=" + APIKEY + "&q=" + lat + "," + long + "&aqi=no")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        showWeather(data);
    });
}

requestByLocation("Newport"); // To pre-load as default
