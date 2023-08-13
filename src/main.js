// Website Used: weatherapi.com/docs/# 

//------------------------------------------------
console.log("main.js"); //for debugging 

const API_KEY = '9d33630a5cce4194a6b140510230808';
//const LOCATION = 'London';
//------------------------------------------------

//variables for the location/forecast/city and matches with index.html values
const locationEl = document.getElementById('Location'); 
const weatherEl = document.getElementById('Weather');
const citySelection = document.getElementById('select');
const dateEl = document.getElementById('date');
const localTimeEl = document.getElementById('localTime');
const tempEl = document.getElementById('temp');

//------------------------------------------------
//creating a fucntion for fetching te weather data needed from the API
async function getWeather(location){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`); //making a GET request to the API endpoint
        const data = await response.json(); //convert response to JSON format 
        return data;
    }
    catch (e) {
        console.error('Fetching getWeather data Error', e);
        throw e
    }
}
//------------------------------------------------

//------------------------------------------------
//creating a fucntion to update weather widget in html file
async function updatingWidget() {
    try {
        const selectedcity = citySelection.value; //getting selected city
        const WData = await getWeather(selectedcity); //calling created function to get the weather data
        locationEl.textContent = WData.location.name;
        weatherEl.textContent = WData.current.condition.text;

        //adding new functionality of date
        const time = new Date();
        dateEl.textContent = time.toLocaleDateString('en-UK', { weekday: 'short', month: 'long', day: 'numeric'});
         
        //if time permited a time functionality, however it will have to match and change with each city
        // Display local time
        const localTime = new Date(WData.location.localtime);
        localTimeEl.textContent = localTime.toLocaleTimeString('en-UK', {hour: 'numeric', minute: '2-digit', hour12: true});

        const tempc = WData.current.temp_c;
        tempEl.textContent = `${ tempc } °C `;
    }
    catch (e) {
        console.error('Fetching Weather Error', e);
    }
}
//------------------------------------------------


updatingWidget(); //intialising the said weather widget
citySelection.addEventListener('change', updatingWidget); //this listens and updates any city selection change