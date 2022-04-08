function formatDate(timestamp) {
  let currentTime = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "e6c27d9409e30f0d97ca8add17211fd2";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrlSearch = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlSearch).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
});

function getGeo(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "e6c27d9409e30f0d97ca8add17211fd2";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrlBack = `${apiEndpoint}lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlBack).then(displayWeatherCondition);
}

let currentLocationButton = document.querySelector("#back-current-button");
currentLocationButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeo);
});

searchCity("Santiago");

// link units
// let celsius = document.querySelector("#celsius-link");
// let fahrenheit = document.querySelector("#fahrenheit-link");
// fahrenheit.addEventListener("click", function (event) {
//   event.preventDefault();
//   h2.innerHTML = 44;
// });
// celsius.addEventListener("click", function (event) {
//   event.preventDefault();
//   h2.innerHTML = 7;
// });
