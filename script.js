const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

searchButton.addEventListener("click", function () {
    const city = cityInput.value;

    console.log("Searching for:", city);
});
