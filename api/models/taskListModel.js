'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the task.'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});
// var TestSchema = new Schema({
//     id: Number,
//     name: String

// });
// module.exports = mongoose.model('Test', TestSchema)
module.exports = mongoose.model('Tasks', TaskSchema);
