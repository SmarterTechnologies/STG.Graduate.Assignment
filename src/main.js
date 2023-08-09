console.log("main.js");

let APIKEY = '9d33630a5cce4194a6b140510230808'

call = 'http://api.weatherapi.com/v1/current.json?key=9d33630a5cce4194a6b140510230808&q=Newport&aqi=no'

function sendAPIRequest(location){
    fetch("http://api.weatherapi.com/v1/current.json?key=" + APIKEY + "&q=" + location + "&aqi=no")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        showWeather(data)
        console.log(data)
    })
}

function showWeather (data) {
    let location = data.location.name
    let description = data.current.condition.text
    let icon = data.current.condition.icon
    let temperature = data.current.temp_c
    let windSpeed = data.current.wind_mph
    let windDirection = data.current.wind_degree

    document.querySelector(".location").innerText = location
    document.querySelector(".description").innerText = description
    document.querySelector(".temperature").innerText = temperature + "°C"
    document.querySelector(".windSpeed").innerText = windSpeed + " mph"
    document.getElementById("weatherIcon").src = icon
    document.getElementById("weatherIcon").alt += description + " weather"


    console.log(location, description, icon, temperature, windSpeed, windDirection)
}

function searchByLocation(){
    let location = document.getElementById("locationSearch").value
    if (location !== ''){
        sendAPIRequest(document.getElementById("locationSearch").value)
    } else {
        document.getElementById("locationSearch").placeholder = "Please enter a location"
    }

}