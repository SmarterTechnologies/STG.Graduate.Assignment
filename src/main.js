// Provide the application with an API key to allow calls to carry out successfully. 
const API_KEY = '9d33630a5cce4194a6b140510230808';

function fetchWeather() {
    // Grab the input from the user in index.html and set that input value as the const city, to be then utilized in the URL. 

    const city = document.getElementById('City').value;
    const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    fetch(URL)
        .then(response => {
            // If the response from the Fetch is not ok, return an error. 
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Set City Name
            document.querySelector('.cityName').textContent = `${data.location.name}, ${data.location.country}`;
            
            // Set Temperature
            document.querySelector('.attributesTemp').textContent = `${data.current.temp_c}°C`;
            document.querySelector('.iconTemp').src = `http:${data.current.condition.icon}`;

            // Set Humidity, same as above. 
            document.querySelector('.attributesHumid').textContent = `${data.current.humidity}%`;

            // Set Wind Speed, same as above. 
            document.querySelector('.attributesWind').textContent = `${data.current.wind_mph}mph`;
        

            // Set Precipitation, same as above. 
            document.querySelector('.attributesPrecip').textContent = `${data.current.precip_mm}mm`;

        })
        .catch(error => {
            // if the Error occurs when returning the information, such as invalid input, this will return a on screen message for the user.
            document.getElementById('errorResult').innerHTML = `
                <p>Error fetching weather: ${error.message}</p>
            `;
        });
}