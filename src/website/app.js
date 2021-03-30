const express = require("express");

const app = express();

const PORT = process.env.PORT || 4001;

const fs = require("fs");

const bodyParser = require("body-parser");

const { error } = require("console");

let text = fs.readFileSync("./index.txt").toString("utf-8");
let newText = text.replace(/\s/g, "");
let dataArray = newText.split(",");
let data = {};
data.sensorData = {
    humidity: dataArray[0],
    temperature: dataArray[1],
    lightIntensity: dataArray[2],
    windSpeed: dataArray[3],
};
data.userSetting = {
    lightIntensity: {
        Aisles_1: '',
        Aisles_2: '',
        Aisles_3: '',
        Aisles_4: ''
    }
};

// read the index file per secdon in order for the in-time updating the sensor data
setInterval(() => {
    let updatedText = fs.readFileSync("./index.txt").toString("utf-8");
    let updatedNewText = text.replace(/\s/g, "");
    let updatedDataArray = newText.split(",");
    text = updatedText;
    newText = updatedNewText;
    dataArray = updatedDataArray;
    data.sensorData = {
        humidity: dataArray[0],
        temperature: dataArray[1],
        lightIntensity: dataArray[2],
        windSpeed: dataArray[3],
    };
}, 1000);

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/sensorData", (req, res, next) => {
    if (dataArray.length > 0) {
        res.send(data);
    } else {
        res.status(404).send("Not found");
    }
});

app.put("/sensorData", (req, res, next) => {
    try {
        let existence = req.body.userSetting;
        if (existence !== "") {
            data.userSetting = req.body.userSetting;
            return res.send(data);
        }
        throw new Error("new error found!");
    } catch (Error) {
        console.log(Error);
    }
});


const SerialPort = require('serialport');
// Promise approach
SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    console.log(port.path);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
let serialport = require('serialport');// include the library
// get port name from the command line:
let portName = process.argv[2];
var myPort = new SerialPort(portName, 115200);

myPort.write(`[${data.userSetting.lightIntensity.Aisles_1},${data.userSetting.lightIntensity.Aisles_2}, ${data.userSetting.lightIntensity.Aisles_3}, ${data.userSetting.lightIntensity.Aisles_4}]`, () => {
    console.log('Write Successfully!')
})


app.listen(PORT, () => {
    console.log("server connected successfully!");
});
