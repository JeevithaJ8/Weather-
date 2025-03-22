// OpenWeather API Key and base URL
const apiKey = 'YOUR_API_KEY';  // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Select DOM elements
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

// Fetch weather data from the API
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            // Update the DOM with weather information
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            weatherDescription.textContent = data.weather[0].description;
            temperature.textContent = data.main.temp;
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = data.wind.speed;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            errorMessage.textContent = '';
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorMessage.textContent = `Error: ${error.message}`;
    }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        errorMessage.textContent = 'Please enter a city name.';
    }
});

// Allow pressing "Enter" to search as well
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
