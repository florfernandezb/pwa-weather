const API_KEY = "db2352834ea4c64b2aa0d35e4b49e033";
const input = document.getElementById("input-search");
const lastSearch = JSON.parse(localStorage.getItem("responseWeather"));

if (lastSearch != null) {
  createWeatherDetail(lastSearch);
  setupCity(lastSearch);
  setupDate(lastSearch.weather[0]);
  createMap(lastSearch.coord);
  setBackgroundColor(lastSearch.weather[0].main);
}

input.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    getCity();
  }
});

function getCity() {
  let degrees = document.getElementById("degrees");

  if (input.value != "") {
    validateError();
    getApiResponse(input.value, degrees.value);
  } else {
    validateError();
    showError("Please enter a city");
  }
}

function getApiResponse(city, degrees) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${degrees}`
  )
    .then(function (res) {
      if (!res.ok) {
        validateError()
        return showError("Please enter a valid city");
      }
      validateError();
      return res.json();
    })
    .then(function (data) {
      deleteLastSearch();
      setupViews(data);
      saveResults(data);
    })
    .catch(function (error) {
      console.log("Hubo un problema con la peticion Fetch" + error.message);
    });
}

function saveResults(result) {
  localStorage.setItem("responseWeather", JSON.stringify(result));
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
