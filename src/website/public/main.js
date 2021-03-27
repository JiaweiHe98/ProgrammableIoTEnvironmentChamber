// const { response } = require("express");

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("Humidity");
const wind = document.getElementById("wind");
const light1 = document.getElementById("light1");
const light2 = document.getElementById("light2");
const sensorRefresher = document.getElementById("#sensorRefresher");
const lastUpdate = document.getElementById("lupdate");
const tempu = document.getElementById("tempu");
const humidityu = document.getElementById("Humidityu");
const windu = document.getElementById("windu")
const light1u = document.getElementById("light1u");
const light2u = document.getElementById("light2u");
const userRefresher = document.getElementById("userRefresher");
const caption = document.getElementById("caption");
const d = new Date();
const date = d.toString().split(' ');
const currentDay = date[2];
const growCycle = document.getElementById("growCycle")
const openWeatherKey = 'd0fa2e540d5665e291f3ee86e658735c';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const getForecast = async () => {
  try{
    const urlToFetch = `${weatherUrl}?&q=West Melbourne&APPID=${openWeatherKey}`;
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("Request failed!");
  } catch(error) {
    console.log(error);
  }
}

const renderForecast = (day) => { 
	let weatherContent = createWeatherHTML(day);
  document.getElementById('weather-content').innerHTML = weatherContent
}

const createWeatherHTML = (currentDay) => {
  console.log(currentDay)
  return `<h2>Location: West Melbourne</h2>
        <h2>Date: ${weekDays[(new Date()).getDay()]}</h2>
        <h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
        <h2>Condition: ${currentDay.weather[0].description}</h2>
      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

const weatherDisplay = () => {
  getForecast().then((forcast) => {
    renderForecast(forcast);
  })
}

document.getElementById('weather-content').addEventListener('load', weatherDisplay());





document.getElementById(currentDay).style.backgroundColor = "#98c1d9";

caption.innerText = `${date[1]}  ${date[3]}`;




lastUpdate.innerText = new Date();

userRefresher.addEventListener("click", () => {
  executeUserRefresh();
});

const getSensorData = async () => {
  const response = await fetch("/sensorData");
  console.log(response);
  try {
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("ooppps, something wrong with fetching the data");
  } catch (error) {
    console.log(error);
  }
};

sensorRefresher.addEventListener('click', () => {
  getSensorData()
    .then((jsonResponse) => {
      temperature.value = jsonResponse.sensorData.temperature;
      humidity.value = jsonResponse.sensorData.humidity;
      wind.value = jsonResponse.sensorData.windSpeed;
      light1.value = jsonResponse.sensorData.lightIntensity;
      light2.value = jsonResponse.sensorData.lightIntensity;
      lastUpdate.innerText = new Date();
    })
})



//function for posting user's setting data 

// const postData = async (url='', data = {}) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
//     return response.json();
// }


document.getElementById('23').addEventListener('click', () => {
  growCycle.innerHTML = createGrowCycleSchedule(23);

})
const executeUserRefresh = () => {
  const random = Math.floor(Math.random() * 4);
  const temp = ["50", "60", "70", "75"];
  const humidity = ["50", "60", "70", "80"];
  const wind = ["10", "15", "20", "25"];
  const light = ["100", "300", "500", "700"];
  tempu.value = temp[random];
  humidityu.value = humidity[random];
  windu.value = wind[random];
  light1u.value = light[random];
  light2u.value = light[random];
}



// const jsonData = {
//   temperature: ["50","60","70","75"],
//   humidity: ["50","60","70","80"],
//   windSpeed: ["10","15","20","25"],
//   lightIntensity: {
//     aisles1: ["100", "300", "500", "700"],
//     aisles2: ["100", "300", "500", "700"],
//   },
// };




const createGrowCycleSchedule = (day) => {
  if (day == '23') {
    return `<p id="schm-title"> Cycle: Default</p>
						<div>
							<p> Scheme 1</p>
							<span class="flaticon-heat"> 40 F</span> <span class="flaticon-rain">80%</span> <span class="flaticon-wind"></span> 5 Mph
							<br>
							<span class="flaticon-sun">A1: 200 lux; A2:400 lux</span>
						</div>
						<br>
						<div>
							<p> Scheme 2</p>
							<span class="flaticon-heat"> 50 F</span> <span class="flaticon-rain">80%</span> <span class="flaticon-wind"></span> 5 Mph
							<br>
							<span class="flaticon-sun">A1: 200 lux; A2:400 lux</span>
						</div>
						<div class="button-rcycle">
							<p class="button-r">More </p>
						</div>`
  }

}
