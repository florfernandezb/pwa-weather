"use-strict";
let GOOGLE_API_KEY = "AIzaSyBo6hfkrJYKHFbtGrPuhcoQldA26su_6mA";

function setupViews(data) {
  deleteLastSearch();
  createWeatherDetail(data);
  setupCity(data);
  setupDate(data.weather[0]);
  createMap(data.coord);
  setBackgroundColor(data.weather[0].main);
}

function createWeatherDetail(data) {
  console.log(data);
  let container = document.getElementById("weatherDetail");

  let div = document.createElement("div");
  div.setAttribute("id", "details");

  let img = document.createElement("img");
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  let maxTemp = document.createElement("p");
  maxTemp.setAttribute("class", "tempDetail");

  let minTemp = document.createElement("p");
  minTemp.setAttribute("class", "tempDetail");

  let humidity = document.createElement("p");
  humidity.setAttribute("class", "tempDetail");

  let feelsLike = document.createElement("p");
  feelsLike.setAttribute("class", "tempDetail");

  let pressure = document.createElement("p");
  pressure.setAttribute("class", "tempDetail");

  let windSpeed = document.createElement("p");
  windSpeed.setAttribute("class", "tempDetail");

  maxTemp.innerHTML = `Maximum temperature: <span>${data.main.temp_max}°</span>`;
  minTemp.innerHTML = `Minimum temperature: <span>${data.main.temp_min}°</span>`;
  humidity.innerHTML = `Humidity: <span>${data.main.humidity}°</span>`;
  feelsLike.innerHTML = `Feels like: <span>${data.main.feels_like}°</span>`;
  pressure.innerHTML = `Prssure: <span>${data.main.pressure}°</span>`;
  windSpeed.innerHTML = `Wind speed: <span>${data.wind.speed} km/h</span>`;

  div.append(img, maxTemp, minTemp, humidity, feelsLike, pressure, windSpeed);
  container.appendChild(div);
}

function setupCity(data) {
  let container = document.getElementById("weather-row");

  let div = document.createElement("div");
  div.setAttribute("id", "city");
  div.setAttribute("class", "col-12");

  let temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.main.temp}°`;

  let city = document.createElement("h2");
  city.textContent = data.name;

  div.append(city, temperature);
  container.appendChild(div);
}

function setupDate(data) {
  let date = new Date();
  let container = document.getElementById("weather-row");

  let div = document.createElement("div");
  div.setAttribute("id", "date");
  div.setAttribute("class", "col-12");

  let today = document.createElement("p");
  today.textContent = date.toDateString();

  let weatherDescription = document.createElement("p");
  weatherDescription.textContent = data.description;

  div.append(weatherDescription, today);
  container.appendChild(div);
}

function createMap(data) {
  let container = document.getElementById("weather");

  let div = document.createElement("div");
  div.setAttribute("id", "map");
  div.setAttribute("class", "row");

  let iframe = document.createElement("iframe");
  iframe.setAttribute("class", "col-12 p-0");
  iframe.frameborder = "0";
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${data.lat},${data.lon}`;

  div.appendChild(iframe);
  container.appendChild(div);
}

function deleteLastSearch() {
  let divDetails = document.getElementById("details");
  let divDate = document.getElementById("date");
  let divCity = document.getElementById("city");
  let divMap = document.getElementById("map");
  if (divDetails && divDate && divCity && divMap) {
    divDetails.remove();
    divDate.remove();
    divCity.remove();
    divMap.remove();
  }
}

function setBackgroundColor(weather) {
  let thunderstorm = "#272838";
  let drizzle = "#a5a5a5";
  let snow = "#acbbce";
  let clear = "#00b4d8";
  let clouds = "#cccccc";
  let body = document.getElementById("body");

  switch (weather) {
    case "Clouds":
      body.style.backgroundColor = clouds;
      break;
    case "Thunderstorm":
      body.style.backgroundColor = thunderstorm;
      break;
    case "Drizzle":
    case "Rain":
      body.style.backgroundColor = drizzle;
      break;
    case "Snow":
      body.style.backgroundColor = snow;
      break;
    case "Clear":
      body.style.backgroundColor = clear;
      break;
  }
  console.log(weather);
}

function showError(message) {
  let div = document.getElementById('input-error')
  
  let msg = document.createElement('p')
  msg.setAttribute("id", "error");
  msg.setAttribute("class", "col-12");

  msg.textContent = message

  div.appendChild(msg)
}

function removeError() {
  let error = document.getElementById('error')
  error.remove()
}
