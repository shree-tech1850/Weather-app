const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

searchButton.addEventListener("click", async function () {
    const city = cityInput.value;

    const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const locationData = await locationResponse.json();

    const latitude = locationData.results[0].latitude;
    const longitude = locationData.results[0].longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
});
