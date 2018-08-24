'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var TaskSchema = new Schema({
//   name: {
//     type: String,
//     required: 'Enter the name of the task.'
//   },
//   Created_date: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: [{
//       type: String,
//       enum: ['pending', 'ongoing', 'completed']
//     }],
//     default: ['pending']
//   }
// });
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var hrs = date.getHours();
var mins = date.getMinutes();
var secs = date.getSeconds();
if(day < 10){
  day = '0' + day;
}

if(month < 10){
  month = '0' + month;
}

if(hrs < 10){
  hrs = '0' + hrs;
}

if(mins < 10){
  mins = '0' + mins;
}

if(secs < 10){
  secs = '0' + secs;
}

var dateStr = day + '-' + month + '-' + date.getFullYear()
              + 'T' + hrs + ':' + mins + ':' + secs;
var FileSchema = new Schema({
    name: {
      type: String,
      default: dateStr + '.default'
    },
    description: {
      type: String,
      default: 'A file with no description created on ' + dateStr
    },
    imagePath: String,
    dataPath: String

});
module.exports = mongoose.model('Files', FileSchema)
// module.exports = mongoose.model('Tasks', TaskSchema);
