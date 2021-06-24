const apiKey = "7ef239e2c4471a4b700261b5b01e28e3";
const searchBtn = $('#search-button');
const historyEl = $('#history');
const weatherEl = $('#weather');

function storeCity() {

}

function getHistory() {

}

function clearWeather() {
  weatherEl.remove('div');
}

function getApiCurrent() {
  let searchEntry = $('#search-field').val();
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchEntry}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      function renderCurrent () {
        weatherEl.append(`<h4><strong>${data.name}</strong> ${moment().format('dddd, M-DD')}</h4>\n<p>Temp: ${Math.round(data.main.temp)}°</p>\n<p>Wind: ${Math.round(data.wind.speed)} MPH</p>\n<p>Humidity: ${data.main.humidity}%</p>\n<p>Feels Like: ${Math.round(data.main.feels_like)}°</p></div>`);
      }
      renderCurrent();
    })
}

searchBtn.click(getApiCurrent);