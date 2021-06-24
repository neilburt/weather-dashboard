const apiKey = "7ef239e2c4471a4b700261b5b01e28e3";
const searchBtn = $('#search-button');
const historyEl = $('#history');
const weatherEl = $('#weather');
const forecastEl = $('#forecast');

function storeCity() {

}

function getHistory() {

}

function clearWeather() {
  weatherEl.remove('div');
}

// function getApiCurrent() {
//   let searchEntry = $('#search-field').val();
//   let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchEntry}&units=imperial&appid=${apiKey}`;

//   fetch(requestUrl)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       console.log(data);
//       function renderCurrent () {
//         weatherEl.append(`<h4><strong>${data.name}</strong> ${moment().format('dddd, M-DD')}</h4>\n<p>Temp: ${Math.round(data.main.temp)}°</p>\n<p>Wind: ${Math.round(data.wind.speed)} MPH</p>\n<p>Humidity: ${data.main.humidity}%</p>\n<p>Feels Like: ${Math.round(data.main.feels_like)}°</p></div>`);
//       }
//       renderCurrent();
//     })
// }

// function getApiForecast() {
//   let searchEntry = $('#search-field').val();
//   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchEntry}&units=imperial&appid=${apiKey}`;

//   fetch(requestUrl)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data2) {
//       console.log(data2);
//       function renderForecast () {
//         forecastEl.append(`<h6><strong>${data2.name}</strong> ${moment().format('dddd, M-DD')}</h6>\n<p>Temp: ${Math.round(data2.main.temp)}°</p>\n<p>Wind: ${Math.round(data2.wind.speed)} MPH</p>\n<p>Humidity: ${data2.main.humidity}%</p>\n<p>Feels Like: ${Math.round(data2.main.feels_like)}°</p></div>`);
//       }
//       // renderForecast();
//     })
// }

function getApi () {
  let searchEntry = $('#search-field').val();
  
  Promise.all([
	  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchEntry}&units=imperial&appid=${apiKey}`),
	  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchEntry}&units=imperial&appid=${apiKey}`)
  ])
  .then(function (responses) {
	// Get a JSON object from each of the responses
	  return Promise.all(responses.map(function (response) {
		  return response.json();
	  }));
  })
  .then(function (data) {
    console.log(data);
	function renderCurrent () {
		weatherEl.append(`<h4><strong>${data[0].name}</strong> ${moment().format('dddd, M-DD')}</h4>\n<p>Temp: ${Math.round(data[0].main.temp)}°</p>\n<p>Wind: ${Math.round(data[0].wind.speed)} MPH</p>\n<p>Humidity: ${data[0].main.humidity}%</p>\n<p>Feels Like: ${Math.round(data[0].main.feels_like)}°</p></div>`);
	}
  function renderForecast () {
		forecastEl.append(`<h6><strong>${data[1].list[5].dt_txt}</strong></h6>\n<p>Temp: ${Math.round(data[1].list[5].main.temp)}°</p>\n<p>Wind: ${Math.round(data[1].list[5].wind.speed)} MPH</p>\n<p>Humidity: ${data[1].list[5].main.humidity}%</p>\n<p>Feels Like: ${Math.round(data[1].list[5].main.feels_like)}°</p></div>`);
		forecastEl.append(`<h6><strong>${data[1].list[13].dt_txt}</strong></h6>\n<p>Temp: ${Math.round(data[1].list[13].main.temp)}°</p>\n<p>Wind: ${Math.round(data[1].list[13].wind.speed)} MPH</p>\n<p>Humidity: ${data[1].list[13].main.humidity}%</p>\n<p>Feels Like: ${Math.round(data[1].list[13].main.feels_like)}°</p></div>`);
		forecastEl.append(`<h6><strong>${data[1].list[21].dt_txt}</strong></h6>\n<p>Temp: ${Math.round(data[1].list[21].main.temp)}°</p>\n<p>Wind: ${Math.round(data[1].list[21].wind.speed)} MPH</p>\n<p>Humidity: ${data[1].list[21].main.humidity}%</p>\n<p>Feels Like: ${Math.round(data[1].list[21].main.feels_like)}°</p></div>`);
		forecastEl.append(`<h6><strong>${data[1].list[29].dt_txt}</strong></h6>\n<p>Temp: ${Math.round(data[1].list[29].main.temp)}°</p>\n<p>Wind: ${Math.round(data[1].list[29].wind.speed)} MPH</p>\n<p>Humidity: ${data[1].list[29].main.humidity}%</p>\n<p>Feels Like: ${Math.round(data[1].list[29].main.feels_like)}°</p></div>`);
		forecastEl.append(`<h6><strong>${data[1].list[37].dt_txt}</strong></h6>\n<p>Temp: ${Math.round(data[1].list[37].main.temp)}°</p>\n<p>Wind: ${Math.round(data[1].list[37].wind.speed)} MPH</p>\n<p>Humidity: ${data[1].list[37].main.humidity}%</p>\n<p>Feels Like: ${Math.round(data[1].list[37].main.feels_like)}°</p></div>`);
    // advance date for each forecast card
	}
  renderCurrent();
  renderForecast();

  }).catch(function (error) {
	  console.log(error);
  });
}
searchBtn.click(getApi);