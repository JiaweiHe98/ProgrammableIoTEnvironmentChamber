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
document.getElementById(currentDay).style.backgroundColor = "#98c1d9";

caption.innerText = `${date[1]}  ${date[3]}`;
sensorRefresher.addEventListener("click", () => {
    const random = Math.floor(Math.random()*4);
    const random1 = Math.floor(Math.random()*4);
    const random2 = Math.floor(Math.random()*4);
    const random3 = Math.floor(Math.random()*4);
    const random4 = Math.floor(Math.random()*4);
    temperature.value = jsonData.temperature[random];
    humidity.value = jsonData.humidity[random1];
    wind.value = jsonData.windSpeed[random2];
    light1.value = jsonData.lightIntensity.aisles1[random3];
    light2.value = jsonData.lightIntensity.aisles2[random4];
  lastUpdate.innerText = new Date();
});
lastUpdate.innerText = new Date();

userRefresher.addEventListener("click", ()=> {
    executeUserRefresh();
});

const getSensorData = async () => {
  const response = await fetch();
  try {
    if (response.ok) {
      const jsonResponse = response.json();
      console.log(`fetch the data succsessfully ${jsonResponse}`);
      return jsonResponse;
    }
    throw new Error("ooppps, something wrong with fetching the data");
  } catch (error) {
    console.log(error);
  }
};

//function for posting user's setting data 

const postData = async (url='', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


document.getElementById('23').addEventListener('click', ()=> {
  growCycle.innerHTML = createGrowCycleSchedule(23);
  
})
const executeUserRefresh = () => {
    const random = Math.floor(Math.random()*4);
    const temp = ["50","60","70","75"];
    const humidity = ["50","60","70","80"];
    const wind = ["10","15","20","25"];
    const light = ["100", "300", "500", "700"];
    tempu.value = temp[random];
    humidityu.value = humidity[random];
    windu.value = wind[random];
    light1u.value = light[random];
    light2u.value = light[random];
}

// executeDisplay is used to display sensor date on the sensor count.
const executeDisplay = () => {
  getSensorData.then((jsonData) => {
    const random = Math.floor(Math.random()*4);
    temperature.value = jsonData.temperature[random];
    humidity.value = jsonData.humidity[random];
    wind.value = jsonData.windSpeed[random];
    light1.value = jsonData.lightIntensity.aisles1[random];
    light2.value = jsonData.lightIntensity.aisles2[random];
    lastUpdate.innerText = new Date();
  });
};


const jsonData = {
  temperature: ["50","60","70","75"],
  humidity: ["50","60","70","80"],
  windSpeed: ["10","15","20","25"],
  lightIntensity: {
    aisles1: ["100", "300", "500", "700"],
    aisles2: ["100", "300", "500", "700"],
  },
};




const createGrowCycleSchedule = (day)=> {
  if(day == '23') {
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
