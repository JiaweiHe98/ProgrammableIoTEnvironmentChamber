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
};
data.userSetting = {
    lightIntensity: {
        Aisles_1: '1',
        Aisles_2: '1',
        Aisles_3: '1',
        Aisles_4: '1'
    }
};

data.fanSwitch = {
    row_1: {
        fan_1: null,
        fan_2: null,
        fan_3: null,
        fan_4: null
    },
    row_2: {
        fan_5: null,
        fan_6: null,
        fan_7: null,
        fan_8: null
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

//Writing light setting to light.txt file to control through a Python script over the light remotely
setInterval(() => {
    let setting = `${data.userSetting.lightIntensity.Aisles_1}\n${data.userSetting.lightIntensity.Aisles_2}\n${data.userSetting.lightIntensity.Aisles_3}\n${data.userSetting.lightIntensity.Aisles_4}\n`
    fs.writeFile('light.txt', setting, (err)=> {
    if(err) {
        return console.log(err.message);
    }
    console.log("data written successfully!");
})}, 500);




setInterval(() => {
    let fanSetting = `${data.fanSwitch.row_1.fan_1}\n${data.fanSwitch.row_1.fan_2}\n${data.fanSwitch.row_1.fan_3}\n${data.fanSwitch.row_1.fan_4}\n${data.fanSwitch.row_2.fan_1}\n${data.fanSwitch.row_2.fan_2}\n${data.fanSwitch.row_2.fan_3}\n${data.fanSwitch.row_2.fan_4}`
    fs.writeFile('relay.txt', fanSetting, (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('relay written');
    })
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

app.put("/fanSwitch/row-1", (req, res, next) => {
    try {
        let existence = req.body.row_1;
        if(existence) {
            data.fanSwitch.row_1 = req.body.row_1;
            return res.send(data);
        }
        throw new Error ('No existence of fanSwitch')
    } catch (error) {
        console.log(error);
    }
});

app.put("/fanSwitch/row-2", (req, res, next) => {
    try {
        let existence = req.body.row_2;
        if(existence) {
            data.fanSwitch.row_2 = req.body.row_2;
            return res.send(data);
        }
        throw new Error ('No existence of fanSwitch')
    } catch (error) {
        console.log(error);
    }
})


// const SerialPort = require('serialport');
// Promise approach
// SerialPort.list().then(ports => {
//   ports.forEach(function(port) {
//     console.log(port.path);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });
//let serialport = require('serialport');// include the library
// get port name from the command line:
//let portName = process.argv[2];


//  setInterval(() => {
  //let light = `${data.userSetting.lightIntensity.Aisles_1}, ${data.userSetting.lightIntensity.Aisles_2}, ${data.userSetting.lightIntensity.Aisles_3}, ${data.userSetting.lightIntensity.Aisles_4}`
//     var myPort = new SerialPort(portName, 115200);
//     myPort.write("100,20,30,40",() => {
//     console.log('Write Successfully!')
// })
//  }, 10000);



app.listen(PORT, () => {
    console.log("server connected successfully!");
});
