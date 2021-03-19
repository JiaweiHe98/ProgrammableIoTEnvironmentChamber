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
sensorRefresher.addEventListener("click", () => {
  temperature.value = jsonData.temperature;
  humidity.value = jsonData.humidity;
  wind.value = jsonData.windSpeed;
  light1.value = jsonData.lightIntensity.aisles1;
  light2.value = jsonData.lightIntensity.aisles2;
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



const executeUserRefresh = () => {
    tempu.value = "50";
    humidityu.value = "80";
    windu.value = "25";
    light1u.value = '300';
    light2u.value = '400';
}

// executeDisplay is used to display sensor date on the sensor count.
const executeDisplay = () => {
  getSensorData.then((jsonData) => {
    temperature.value = jsonData.temperature;
    humidity.value = jsonData.humidity;
    wind.value = jsonData.windSpeed;
    light1.value = jsonData.lightIntensity.aisles1;
    light2.value = jsonData.lightIntensity.aisles2;
    lastUpdate.innerText = new Date();
  });
};

const jsonData = {
  temperature: "50",
  humidity: "80",
  windSpeed: "25",
  lightIntensity: {
    aisles1: "200",
    aisles2: "500",
  },
};
