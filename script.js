function getWeatherCondition(code) {
    if (code === 0) {
        return "Clear sky ☀️";
    } else if (code >= 1 && code <= 3) {
        return "Cloudy ☁️";
    } else if (code >= 45 && code <= 48) {
        return "Foggy 🌫️";
    } else if (code >= 51 && code <= 67) {
        return "Rainy 🌧️";
    } else if (code >= 71 && code <= 77) {
        return "Snowy ❄️";
    } else if (code >= 80 && code <= 82) {
        return "Rain showers 🌦️";
    } else if (code >= 95) {
        return "Thunderstorm ⛈️";
    } else {
        return "Unknown weather";
    }
}

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchButton.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    condition.textContent = "Loading...";

    if (city === "") {
        condition.textContent = "Please enter a city.";
        return;
    }

    try {
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            condition.textContent = "City not found.";
            return;
        }

        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathe_code` 
        );

        const weatherData = await weatherResponse.json();

        cityName.textContent = city;
        temperature.textContent =
            `${weatherData.current.temperature_2m}°C`;
        humidity.textContent =
            `${weatherData.current.relative_humidity_2m}%`;
        wind.textContent =
            `${weatherData.current.wind_speed_10m} km/h`;
        condition.textContent = getWeatherCondition(weatherData.current.weather_code);
        changeWeatherTheme(weatherData.current.weather_code);

    } catch (error) {
        condition.textContent =
            "Something went wrong. Please try again.";
    }
}

searchButton.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});
