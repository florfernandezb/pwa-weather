let API_KEY = "db2352834ea4c64b2aa0d35e4b49e033";
let degrees = document.getElementById('degrees')

const lastSearch = JSON.parse(localStorage.getItem("responseWeather"));

if (lastSearch != null) {
    createWeatherDetail(lastSearch);
    setupCity(lastSearch)
    setupDate(lastSearch.weather[0])
    createMap(lastSearch.coord)
    setBackgroundColor(lastSearch.weather[0].main)
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
        setupCity(data)
        setupDate(data.weather[0])
        createMap(data.coord)
        setBackgroundColor(data.weather[0].main)
        saveResults(data)
    })
    .catch(function(error){
        console.log("Hubo un problema con la peticion Fetch" + error.message)
    })
}

function saveResults(result) {
    localStorage.setItem('responseWeather', JSON.stringify(result))
}