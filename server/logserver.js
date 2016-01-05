var spawn = require('child_process').spawn;
var ws = require('nodejs-websocket');

var proc = spawn('tail', ['-f', '/var/log/lxd/lxd.log']);

var config = {
  port : process.env.PORT || 8080,
  host : process.env.HOST || '0.0.0.0'
};

var server = ws
.createServer(onConnection)
.listen(config.port, config.host, function() {
  console.log('Broadcasting @', this.socket.address());
});

function onConnection(conn) {

  addListeners();

  function addListeners() {
    proc.stdout.on('data', onProcStdout);
    proc.stderr.on('data', onProcStderr);
    proc.on('error', onProcError);

    conn.on('close', onConnectionClose);
    conn.on('error', onConnectionError);
  }

  function remoteListeners() {
    proc.stdout.removeListener('data', onProcStdout);
    proc.stderr.removeListener('data', onProcStderr);
    proc.removeListener('error', onProcError);
  }

  function onConnectionClose(code, reason) {
    console.log('Connection closed')
    remoteListeners();
  }

  function onConnectionError(err) {
    console.log('Error', err);
    remoteListeners();
  }

  function onProcStdout(data) {
    data = data.toString().trim();
    conn.sendText(data)
  }

  function onProcStderr(data) {
    data = data.toString().trim();
    conn.sendText(data)
  }

  function onProcError(err) {
    console.log('ERROR: '+err)
  }
}
