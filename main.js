'use-strict';
let GOOGLE_API_KEY = "AIzaSyBo6hfkrJYKHFbtGrPuhcoQldA26su_6mA"

function createWeatherDetail(data) {
    console.log(data)
    let container = document.getElementById("weatherDetail");

    let div = document.createElement('div');
    div.setAttribute('id', 'details');

    let img = document.createElement('img')
    img.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"

    let temp = document.createElement('p');
    temp.setAttribute('class', 'tempDetail');

    let maxTemp = document.createElement('p');
    maxTemp.setAttribute('class', 'tempDetail');

    let minTemp = document.createElement('p');
    minTemp.setAttribute('class', 'tempDetail');

    let humidity = document.createElement('p');
    humidity.setAttribute('class', 'tempDetail');

    let feelsLike = document.createElement('p');
    feelsLike.setAttribute('class', 'tempDetail');

    let pressure = document.createElement('p');
    pressure.setAttribute('class', 'tempDetail');

    let windSpeed = document.createElement('p');
    windSpeed.setAttribute('class', 'tempDetail');

    temp.textContent = `Temperatura: ${data.main.temp}°`
    maxTemp.textContent = `Temperatura máxima: ${data.main.temp_max}°`
    minTemp.textContent = `Temperatura mínima: ${data.main.temp_min}°`
    humidity.textContent = `Humedad: ${data.main.humidity}°`
    feelsLike.textContent = `Sensación térmica: ${data.main.feels_like}°`
    pressure.textContent = `Presión atmosférica: ${data.main.pressure}°`

    div.append(img, temp, maxTemp, minTemp, humidity, feelsLike, pressure, windSpeed)
    container.appendChild(div)
}

function setupDate(data) {
    let date = new Date()
    let container = document.getElementById("weather");
    
    let div = document.createElement('div');
    div.setAttribute('id', 'date');
    div.setAttribute('class', 'col-12');

    let today = document.createElement('p')
    today.textContent = date.toDateString()

    let weatherDescription = document.createElement('p')
    weatherDescription = data.description

    div.append(today, weatherDescription)
    container.appendChild(div)
}

function createMap(data) {
    let container = document.getElementById("weather");
    
    let div = document.createElement('div');
    div.setAttribute('id', 'map');
    div.setAttribute('class', 'col-12');

    let iframe = document.createElement('iframe')
    iframe.width = "450"
    iframe.height = "250"
    iframe.frameborder = "0"
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${data.lat},${data.lon}` 

    div.appendChild(iframe)
    container.appendChild(div)
}

function setupCity(data) {
    let container = document.getElementById("weather");
    
    let div = document.createElement('div');
    div.setAttribute('id', 'city');

    let temperature = document.createElement('p')
    temperature.textContent = `Temperatura: ${data.main.temp}°`

    let city = document.createElement('h2')
    city.textContent = data.name

    div.append(temperature, city)
    container.appendChild(div)
}

function deleteLastSearch() {
    let divDetails = document.getElementById("details")
    let divDate = document.getElementById("date")
    let divCity = document.getElementById("city")
    if(divDetails && divDate && divCity) {
        divDetails.remove();
        divDate.remove();
        divCity.remove()
    }
}

function saveResults(result) {
    localStorage.setItem('responseWeather', JSON.stringify(result))
}
