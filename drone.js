'use strict'

var MQTT_username = "<YOUR USERNAME>";
var MQTT_password = "<YOUR PASSWORD>";
var MQTT_host = "wss://m10.cloudmqtt.com:XXXXX";

var dataToTrack_keys = ["battery", "x", "y", "z", "speed"];
var lastDataReceived = null;

var http = require('http');
var fs = require('fs');
var url = require('url');

var PORT = 8889;
var HOST = '192.168.10.1';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');


http.createServer( function (request, response) {

    var pathname = url.parse(request.url).pathname;
    var url_params = request.url.split('/');
    if (url_params.length < 2) return;
    var command = url_params[1];
    var dis;
    switch (command){

        case 'poll':
                        respondToPoll(response);
                        break;

        case 'takeoff':
			console.log('takeoff');
			TakeoffRequest();
		        break;

        case 'land':
			console.log('land');
			LandRequest();
		        break;

        case 'up':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('up ' + dis);
			var message = new Buffer( 'up '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		        break;

        case 'down':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('down ' + dis);
			var message = new Buffer( 'down '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
         		break;

        case 'left':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('left ' + dis);
			var message = new Buffer( 'left '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
        		break;

        case 'right':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('right ' + dis);
			var message = new Buffer( 'right '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
        		break;

	case 'forward':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('forward ' + dis);
			var message = new Buffer( 'forward '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		        break;

        case 'back':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('back ' + dis);
			var message = new Buffer( 'back '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		        break;

        case 'cw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('cw ' + dis);
			var message = new Buffer( 'cw '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
        		break;

	case 'flip':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('flip ' + dis);
			var message = new Buffer( 'flip '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		        break

	case 'ccw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('ccw ' + dis);
			var message = new Buffer( 'ccw '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
			client.on('message',function(msg,info){
				console.log('Data received from server : ' + msg.toString());
				console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
			});
        		break;

	case 'setspeed':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('setspeed ' + dis);
			var message = new Buffer( 'speed '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
	        	break;

	  }
	response.end('Hello Tello.\n');

}).listen(8001);


console.log('---------------------------------------');
console.log('Tello Scratch Ext running at http://127.0.0.1:8001/');
console.log('---------------------------------------');


function respondToPoll(response){

    var noDataReceived = false;

    var resp = "";
    var i;
    for (i = 0; i < dataToTrack_keys.length; i++){
        resp += dataToTrack_keys[i] + " ";
        resp += (i+10);
		resp += "\n";
    }
    response.end(resp);
}

function TakeoffRequest(){

	var message = new Buffer('command');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
	var message = new Buffer('takeoff');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;

	});
}

function LandRequest(){

	var message = new Buffer('land');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
}







var request = require('request');
var mqtt = require('mqtt');
var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
var host = MQTT_host;

var options = {
  keepalive: 10,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  username: MQTT_username,
  password: MQTT_password,
  rejectUnauthorized: false
}

var client2 = mqtt.connect(host, options)

client2.on('error', function (err) {
  console.log(err)
  client.end()
})

client2.on('connect', function () {
  console.log('client connected:' + clientId)
})

client2.subscribe('drone/takeoff', { qos: 1 })
client2.subscribe('drone/land', { qos: 1 })
client2.subscribe('drone/direction', { qos: 1 })
client2.subscribe('drone/flip', { qos: 1 })
client2.subscribe('drone/rotate', { qos: 1 })

client2.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)

  switch (topic) {
      case "drone/takeoff":
        request('http://127.0.0.1:8001/takeoff', { json: true }, (err, res, body) => {
        });
        break; 
      case "drone/land":
        request('http://127.0.0.1:8001/land', { json: true }, (err, res, body) => {
        });
        break;
      case "drone/direction":
        request('http://127.0.0.1:8001/' + message.toString() + '/100', { json: true }, (err, res, body) => {
        });
        break;
      case "drone/flip":
        request('http://127.0.0.1:8001/flip/f', { json: true }, (err, res, body) => {
        });
        break;
      case "drone/rotate":
        switch (message.toString()) {
          case "left":
            request('http://127.0.0.1:8001/ccw/90', { json: true }, (err, res, body) => {});
            break;
          case "right":
            request('http://127.0.0.1:8001/cw/90', { json: true }, (err, res, body) => {});
            break;
          default:
         }
      default:
    }
})

client2.on('close', function () {
  console.log(clientId + ' disconnected')
})
