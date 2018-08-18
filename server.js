var express = require('express'),
  app = express(),
  port = process.env.PORT || 3005,
  mongoose = require('mongoose'),
  Task = require('./api/models/taskListModel'),
  bodyParser = require('body-parser');
  readline = require('readline')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tododb', { useNewUrlParser:true });

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/taskListRoutes');
routes(app);

app.listen(port);

var i = 0;
var elapsed = 0;
var timer;
var timer = setInterval(function(){
		// console.log('Test');
		if(mongoose.connection.readyState == 1){
			process.stdout.clearLine();
			clearInterval(timer);
			console.log('Current endpoints: \n'
				+ ' ./tasks\n'
				+ ' ./tasks/:taskId\n'
				+' RESTful API server started on port: ' + port);
		} else {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			i = ++i % 4;
			var dots = new Array(i+1).join(".");
			process.stdout.write('attempting to connect to mongodb. Please wait' + dots);
			elapsed += 500;
			if(elapsed > 10000){
				process.stdout.clearLine();
				console.log('\nMongoose timeout. Please make sure Mongodb is running on localhost:27017 and try again');
				clearInterval(timer);
				process.exit(0);
			}
		}
	}, 500);
