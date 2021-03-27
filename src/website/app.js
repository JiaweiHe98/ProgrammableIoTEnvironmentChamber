const express =require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const fs = require('fs');
const bodyParser = require('body-parser')


let text = fs.readFileSync('./index.txt').toString('utf-8');
let newText = text.replace(/\s/g, '');
let dataArray = newText.split(',');
let data = {};
data.sensorData = {humidity: dataArray[0], temperature: dataArray[1], lightIntensity: dataArray[2], windSpeed: dataArray[3]};
data.userSetting = {};


setInterval(()=> {
    let updatedText = fs.readFileSync('./index.txt').toString('utf-8');
    let updatedNewText = text.replace(/\s/g, '');
    let updatedDataArray = newText.split(',');
    text = updatedText;
    newText = updatedNewText;
    dataArray = updatedDataArray;
    data.sensorData = {humidity: dataArray[0], temperature: dataArray[1], lightIntensity: dataArray[2], windSpeed: dataArray[3]};
}, 1000);

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/sensorData', (req, res, next) => {
    if(dataArray.length > 0) {
        res.send(data);
    } else {
        res.status(404).send('Not found');
    }
})

app.put('/sensorData', (req, res, next) => {
    data.userSetting = req.body.userSetting
    // data.userSetting = {temperature: req.query.temperature, humidity: req.query.humidity, windSpeed: req.query.windSpeed, lightIntensity: req.query.lightIntensity}
    res.send(data);
})
 



app.listen(PORT, () => {
    console.log('server connected successfully!');
})