const apiKey = "7ef239e2c4471a4b700261b5b01e28e3";
const searchBtn = $('#search-button');

function getApi() {
  let searchEntry = $('#search-field').val();
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchEntry}&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
    })
  console.log(searchEntry);
}

searchBtn.on('click', getApi);