// Website Used: weatherapi.com/docs/# 

//------------------------------------------------
console.log("main.js"); //for debugging 

const API_KEY = '9d33630a5cce4194a6b140510230808';
const LOCATION = 'London';
//------------------------------------------------

//variables for the location/forecast and matches with index.html values
const locationEl = document.getElementById('Location'); 
const weatherEl = document.getElementById('Weather');

//------------------------------------------------
//creating a fucntion for fetching te weather data needed from the API
async function getWeather(){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}`); //making a GET request to the API endpoint
        const data = await response.json(); //convert response to JSON format 
        return data;
    }
    catch (error) {
        console.error('Fetching data Error', error);
        throw error
    }
}
//------------------------------------------------

//------------------------------------------------
//creating a fucntion to update weather widget in html file
async function updatingWidget() {
    try {
        const WData = await getWeather();
        locationEl.textContent = WData.Location.name;
        weatherEl.textContent = WData.current.condition.text;
    }
    catch (error){
        console.error('Fetching Weather Error', error);
    }
}
//------------------------------------------------

updatingWidget();