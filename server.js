var express = require('express'),
  app = express(),
  port = process.env.PORT || 3005,
  mongoose = require('mongoose'),
  _File = require('./api/models/fileModel'),
  path = require('path'),
  bodyParser = require('body-parser'),
  readline = require('readline'),
  server = require('http').Server(app),
  sockets = new Array()
  require('./api/socket/socketController.js')(server)

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Filedb', { useNewUrlParser:true });
// mongoose.connect('mongodb://localhost:27017/Tododb', { useNewUrlParser:true });

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./api/routes/fileRoutes');
routes(app);


server.listen(port);

//loop for connection
var i = 0;
var elapsed = 0;
var timer;
var timer = setInterval(function(){
		// console.log('Test');
		if(mongoose.connection.readyState == 1){
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			clearInterval(timer);
			console.log('Current endpoints: \n'
				+ ' ./files\n'
				+ ' ./files/:fileId\n'
				+' RESTful API server started on port: ' + port);
		} else {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			i = ++i % 4;
			var dots = new Array(i+1).join(".");
			process.stdout.write('attempting to connect to mongodb. Please wait'
                            + dots);
			elapsed += 500;
			if(elapsed > 10000){
				process.stdout.clearLine();
  			process.stdout.cursorTo(0);
				console.log('Mongoose timeout. Please make sure Mongodb is running on '
                     + 'localhost:27017 and try again\n');
				clearInterval(timer);
				process.exit(0);
			}
		}
	}, 500);
