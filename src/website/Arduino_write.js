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
var myPort = new SerialPort(portName, 9600);

myPort.write(`[${data.userSetting.lightIntensity[Aisles_1]},${data.userSetting.lightIntensity[Aisles_2]}, ${data.userSetting.lightIntensity[Aisles_3]}, ${data.userSetting.lightIntensity[Aisles_3]}]`)


/* // make instance of Readline parser
let Readline = SerialPort.parsers.Readline;

// make a new parser to read ASCII lines
let parser = new Readline();

 // pipe the serial stream to the parser
// myPort.pipe(parser); */
