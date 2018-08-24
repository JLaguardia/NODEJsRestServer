var
  // server = require('./server')
  ioBase = require('Socket.io'),
  sockets = new Array()

module.exports = function(http){
  var io = ioBase(http);
  io.listen(3006);
  io.on('connection', function(sock){
    console.log('connected with ' + sock);
    sockets[sockets.length] = sock;
    console.log('sockets connected: ' + sockets.length)
    if(sockets.length > 5){
      console.log('disconnecting sockets.');
      for(var i = 0; i < sockets.length; i++){
        sockets[i].emit('dc');
        sockets[i].disconnect();
      }

      sockets = [];
    }
  });
}
