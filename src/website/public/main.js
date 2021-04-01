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
const light1u = document.getElementById("light1u");
const light2u = document.getElementById("light2u");
const light3u = document.getElementById("light3u");
const light4u = document.getElementById("light4u");
const userRefresher = document.getElementById("userRefresher");
const caption = document.getElementById("caption");
const d = new Date();
const date = d.toString().split(' ');
const currentDay = date[2];
const growCycle = document.getElementById("growCycle")
const openWeatherKey = 'd0fa2e540d5665e291f3ee86e658735c';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const userPost = document.getElementById('userPost');
const fanSwitch1 = document.getElementById('fanSwitch1');
const fanSwitch2 = document.getElementById('fanSwitch2');


const postSetting = async () => {
  let postData = {
    userSetting: {
      temperature: tempu.value,
      humidity: humidityu.value,
      lightIntensity: {
        Aisles_1: light1u.value,
        Aisles_2: light2u.value,
        Aisles_3: light3u.value,
        Aisles_4: light4u.value
      }
    }
  }
  const response = await fetch('/sensorData', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    throw new Error('Request failed');
  }
};




fanSwitch1.addEventListener("click", async () => {
  if(fanSwitch1.value == 'off'){
    fanSwitch1.style.backgroundColor = '#06d6a0'
    fanSwitch1.value = 'on';
    let fan = {
      row_1: {
        fan_1: 1,
        fan_2: 1,
        fan_3: 1,
        fan_4: 1
      }
    };
    const response = await fetch ('/fanSwitch/row-1', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(fan)
    })
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error('Request Failed')
  } else {
    fanSwitch1.style.backgroundColor = '#e63946';
    fanSwitch1.value = 'off';
    let fan = {
      row_1: {
        fan_1: 0,
        fan_2: 0,
        fan_3: 0,
        fan_4: 0
      }
    };
    const response = await fetch ('/fanSwitch/row-1', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(fan)
    })
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error('Request Failed')
  }
})



fanSwitch2.addEventListener("click", async () => {
  if(fanSwitch2.value == 'off'){
    fanSwitch2.style.backgroundColor = '#06d6a0'
    fanSwitch2.value = 'on';
    let fan = {
      row_2: {
        fan_1: 1,
        fan_2: 1,
        fan_3: 1,
        fan_4: 1
      }
    };
    const response = await fetch ('/fanSwitch/row-2', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(fan)
    })
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error('Request Failed')
  } else {
    fanSwitch2.style.backgroundColor = '#e63946';
    fanSwitch2.value = 'off';
    let fan = {
      row_2: {
        fan_1: 0,
        fan_2: 0,
        fan_3: 0,
        fan_4: 0
      }
    };
    const response = await fetch ('/fanSwitch/row-2', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(fan)
    })
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error('Request Failed')
  }
})

document.getElementById("userPost").addEventListener("click", () => {
  postSetting();
})


const getForecast = async () => {
  try {
    const urlToFetch = `${weatherUrl}?&q=West Melbourne&APPID=${openWeatherKey}`;
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("Request failed!");
  } catch (error) {
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






caption.innerText = `${date[1]}  ${date[3]}`;

if(date[1] == 'Mar') {
  document.getElementById('CalendarTable').innerHTML = year.Mar
  document.getElementById('caption').innerText = `${date[1]}  ${date[3]}`;
  document.getElementById(currentDay).style.backgroundColor = "#98c1d9";
}

if(date[1] == 'Apr') {
  document.getElementById('CalendarTable').innerHTML = year.Apri
  document.getElementById('caption').innerText = `${date[1]}  ${date[3]}`;
  document.getElementById(currentDay).style.backgroundColor = "#98c1d9";
}





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
      lastUpdate.innerText = new Date();
    })
})

window.addEventListener('load', () => {
  getSensorData()
    .then((jsonResponse) => {
      temperature.value = jsonResponse.sensorData.temperature;
      humidity.value = jsonResponse.sensorData.humidity;
      wind.value = jsonResponse.sensorData.windSpeed;
      light1.value = jsonResponse.sensorData.lightIntensity;
      lastUpdate.innerText = new Date();
    })
});



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
  const random_1 = Math.floor(Math.random() * 4);
  const random_2 = Math.floor(Math.random() * 4);
  const random_3 = Math.floor(Math.random() * 4);
  const random_4 = Math.floor(Math.random() * 4);
  const temp = ["50", "60", "70", "75"];
  const humidity = ["50", "60", "70", "80"];
  const wind = ["10", "15", "20", "25"];
  const light = ["30", "50", "70", "90"];
  tempu.value = temp[random_1];
  humidityu.value = humidity[random_2];
  light1u.value = light[random_1];
  light2u.value = light[random_2];
  light3u.value = light[random_3];
  light4u.value = light[random_4];
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
