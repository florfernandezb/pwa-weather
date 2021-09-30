let API_KEY = "db2352834ea4c64b2aa0d35e4b49e033";
let API_TOMTOM = "ezA7nvGm1PkNwgGdQfyS8SI2tC5GuRPg"
let degrees = document.getElementById('degrees')

const lastSearch = JSON.parse(localStorage.getItem("responseWeather"));

if (lastSearch != null) {
    createWeatherDetail(lastSearch);
    setupDate(lastSearch.weather[0])
    createMap(lastSearch.coord)
    setupCity(lastSearch)
}

function getCity() {
    let input = document.getElementById("input-search")
    getApiResponse(input.value, degrees.value)
}

function getApiResponse(city, degrees) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${degrees}`)
    .then(function(res){
        return res.json() 
    })
    .then(function(data){
        deleteLastSearch()
        console.log(data)
        createWeatherDetail(data)
        setupDate(data.weather[0])
        createMap(data.coord)
        setupCity(data)
        saveResults(data)
    })
    .catch(function(error){
        console.log("Hubo un problema con la peticion Fetch" + error.message)
    })
}