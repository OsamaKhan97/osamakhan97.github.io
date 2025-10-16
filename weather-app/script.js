
const API = "d295eb10a32b4cc56b935118b31aa224";

const weatherbtn = document.getElementById("weather-btn");
const cityName = document.getElementById("city-name");
const resultSection = document.getElementById("result-section");

// 1️⃣ Get weather by current location
function checking() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation, error);
  } else {
    alert("Geolocation is not supported by browser");
  }
}

// 2️⃣ If location permission allowed
function getWeatherByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found!");
      return response.json();
    })
    .then((data) => showWeather(data))
    .catch((error) => {
      resultSection.innerHTML = `<p>${error.message}</p>`;
    });
}

// 3️⃣ Get weather by typing city name
function getWeatherByCity() {
  const city = cityName.value.trim();
  if (city === "") {
    alert("Please enter city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found!");
      return response.json();
    })
    .then((data) => showWeather(data))
    .catch((error) => {
      resultSection.innerHTML = `<p>${error.message}</p>`;
    });

  cityName.value = "";
}

// 4️⃣ Display weather data
function showWeather(data) {
  const cityname = data.name;
  const country = data.sys.country;
  const temp = data.main.temp;
  const weather = data.weather[0].description;
  const humidity = data.main.humidity;
  const windspeed = data.wind.speed;
  const icon = data.weather[0].icon;

  resultSection.innerHTML = `
    <h2>${cityname}, ${country}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
    <p><strong>Temperature:</strong> ${temp} °C</p>
    <p><strong>Weather:</strong> ${weather}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${windspeed} m/s</p>
  `;
}

// 5️⃣ Handle location errors
function error() {
  alert("Unable to get your location. Please allow location access or search manually.");
}

// 6️⃣ Event listeners
weatherbtn.addEventListener("click", getWeatherByCity);

cityName.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeatherByCity();
  }
});

window.addEventListener("load", checking);
