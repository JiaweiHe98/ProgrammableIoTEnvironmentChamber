const SerialPort = require('serialport');
// Promise approach
SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    console.log(port.path);
  });
});

let serialport = require('serialport');
// include the library
// get port name from the command line:
let portName = process.argv[2];
var myPort = new SerialPort('/dev/tty.usbserial-141240', {baudRate: 115200});
let data = [100,100,100,100];
let updata = data.join(' ') + ' '
myPort.write('100 10 10 10 ', (err) => {
  if(err) {
    return console.log('Error on write ', err.message);
  } else {
    console.log('message written');
  }
}
);

// myPort.write('[20,30,40,50]', ()=> {
//   console.log('write successfully!');
// });

//myPort.write(`[${data.userSetting.lightIntensity[Aisles_1]},${data.userSetting.lightIntensity[Aisles_2]}, ${data.userSetting.lightIntensity[Aisles_3]}, ${data.userSetting.lightIntensity[Aisles_3]}]`)


/* // make instance of Readline parser
let Readline = SerialPort.parsers.Readline;

// make a new parser to read ASCII lines
let parser = new Readline();

 // pipe the serial stream to the parser
// myPort.pipe(parser); */
