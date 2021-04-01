// const fs = require('fs');

// let text = fs.readFileSync("./test_data.txt").toString("utf-8");
// console.log(text);
// let newText = text.replace(/\s/g, "");
// console.log(newText);
// let arr = newText.split(",");
// console.log(arr);
// let dataArray = newText.split(",");
// let data = {};


const d = new Date();
console.log(d);
const date = d.toString().split(' ');
const currentDay = date[2];
console.log(currentDay);
console.log(typeof currentDay);
console.log(date);