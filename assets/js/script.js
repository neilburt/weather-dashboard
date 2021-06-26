var apiKey ="7ef239e2c4471a4b700261b5b01e28e3";
var storeWeather = JSON.parse(localStorage.getItem('weather')) || [];

$('#search-button').on('click', function() {
  var searchInput = $('#search-field').val();
  var weatherSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appId=${apiKey}`;
  var forecastSearch = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&units=imperial&appId=${apiKey}`;
  // using ajax for dual API calls instead of PromiseAll fetch method
  $.ajax({
    url: weatherSearch,
    method: 'GET'
  }).then(function(response) {
    var tempWeather = response;
    
    $.ajax({
      url: forecastSearch,
      method: 'GET'
    }).then(function(response) {
      tempForecast = response;
      propagateWeatherSearch();
      updateStoredWeather(tempWeather.name, tempWeather, tempForecast, response);
      fillWeatherInfo(storeWeather.length -1);
      propagateForecastSearch(storeWeather.length -1);
    })
  })
})
// tells the 
$(document).on('click', '.weatherSearch', function() {
  var index = this.value;
  fillWeatherInfo(index);
  propagateForecastSearch(index);
})
$('#clear').on('click', function() {
  localStorage.clear();
  location.reload();
})
function propagateWeatherSearch() {
  $('#history').empty();

  for(let i = 0; i < storeWeather.length; i++) {
    console.log(storeWeather[i])
    var location = storeWeather[i].location;
    var btn = $('<button>').text(location);

    btn.attr({
      class: "weatherSearch btn btn-outline-secondary"
    })

    $('#history').append(btn);
  }
}
function propagateForecastSearch(index) {
  $('#forecast').empty();

  var temp = storeWeather[index].forecast;
  var count = 8;
  var dayIndex = [0, count, 2*count, 3*count, 4*count]

  for(let i = 0; i < dayIndex.length; i++) {
    var tempWeather = temp.list[dayIndex[i]]

    $('.hidden').removeClass('hidden');
    $('#forecast').append(`
    <div class="card">
    <div class="card-header">
    <h5 class="card-title">${moment(tempWeather.dt_txt).format('dddd, MMM Do')}</h5>
    </div>\n
    <div class="card-body"><p class="card-text">Temp: ${Math.round(tempWeather.main.temp)}°</p>\n
    <p>Wind: ${Math.round(tempWeather.wind.speed)} MPH</p>\n<p>Humidity: ${tempWeather.main.humidity}%</p>\n
    <p>Feels Like: ${Math.round(tempWeather.main.feels_like)}°</p></div></div>`)
  }
}
function fillWeatherInfo(index) {
  var temp = storeWeather[index].currentWeather;
  $('#city').text(temp.name)
  $('#temperature').text(`Temperature: ${Math.round(temp.main.temp)}°`)
  $('#humidity').text(`Humidity: ${temp.main.humidity}%`)
  $('#wind-speed').text(`Windspeed: ${Math.round(temp.wind.speed)} MPH`)
  $('#feels-like').text(`Feels Like: ${Math.round(temp.main.feels_like)}°`)
}
function updateStoredWeather(location, currentWeather, forecast) {
  var tempObj = {
    location: "",
    currentWeather: {},
    forecast: {},
  }
  tempObj.location = location;
  tempObj.currentWeather = currentWeather;
  tempObj.forecast = forecast;
  storeWeather.push(tempObj);
  localStorage.setItem('weather', JSON.stringify(storeWeather));
}