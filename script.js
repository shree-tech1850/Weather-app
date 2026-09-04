const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchButton.addEventListener("click", async function () {
    const city = cityInput.value;

    const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const locationData = await locationResponse.json();

    const latitude = locationData.results[0].latitude;
    const longitude = locationData.results[0].longitude;

    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );

    const weatherData = await weatherResponse.json();

    cityName.textContent = city;
    temperature.textContent = `${weatherData.current.temperature_2m}°C`;
    humidity.textContent = `Humidity: ${weatherData.current.relative_humidity_2m}%`;
    wind.textContent = `Wind: ${weatherData.current.wind_speed_10m} km/h`;
    condition.textContent = "Weather data received!";
});
