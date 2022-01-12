//var io = require('socket.io-client')
var robot = require("robotjs");
var ws = require('websocket').client;

const TwitchBot = require('twitch-bot');
var api = require('twitch-api-v5');
var express = require('express')();
var http = require('http').createServer(express);

var ioServer = require('socket.io')(http);
const config = require('./config.json');
//const socket = io('wss://heat-ebs.j38.net/channel/${config.heat.id}');
var heat = new ws();

heat.connect('wss://heat-ebs.j38.net/channel/${config.heat.id}');

heat.on('connect', function(ebs) {
    console.log('WebSocket Client Connected');
    ebs.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
		ebs.on('message', function(message) {
            // Parse message data.
            var data = JSON.parse(message.data);

            // Write to console.
            console.log(data);
		});
	});
	
	

//=======================================
//= CONFIGURATION  SEE config.json
//=======================================
//compatible with All point and click adventures
//Sim City 2000


const Bot = new TwitchBot({
	username: 'twitchplaydos',
	oauth : config.twitch.oauth,
	channels: ['twitchplaydos']
	})

Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})
 
Bot.on('connected', () =>{ 
	Bot.join('twitchplaydos');
 })

Bot.on('error', err => {
  console.log(err)
})



function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


//possible "click" "arakey"
// Game : Scumm, s2k

var gameMode = config.game.mode;
var game = config.game.engine;



var minX = 3
var maxX = 800
var minY = 35
var maxY = 450 + minY

if (game === "s2k") {
	var minX = 3
	var maxX = 665
	var minY = 35
	var maxY = 515
}
if (game === "scumm") {
	var minX = 3
	var maxX = 800
	var maxY = 492 + minY
}



var acceptInput = true;
 robot.setKeyboardDelay(100);
Bot.on('message', chatter => {
  if(chatter.message === '!help') {
	if (game != "scumm ") { Bot.say('Input keyboard key by typing %<Key> Ex: %a = typing a'); }
	Bot.say('Click on the stream to control the mouse');
	if ( game == "s2k" ) {	Bot.say('SimCity2k Commands are available here: https://00stack.in/twitchplaydos');	}
  }
var name = chatter.display_name;
var message = chatter.message;
//keyboard input
console.log(chatter);

if (acceptInput) {
	if (message.length === 2) {
		switch(chatter.message.charAt(0)){
		//key input command
		case '%':
			robot.keyTap(chatter.message.charAt(1))
			keytap(chatter.message.charAt(1),name)
			break;
		}
	}
	//set keystrokes variables
	var keytime = 1
	var keypress = 0
	//check if the 2nd string is a number set keystrokes to this number 
	if (isNumeric(message.split(" ")[1])) {
		keytime = message.split(" ")[1];
		//hard limit to 10 keystrokes
		if (keytime > 10) { keytime = 10 }
	}
	//keyboard up
	if (message.split(" ")[0] == "up") {
		while ( keypress < keytime ) {
			keypress++;
			keytap("up",name);
		}
	}
	//keyboard dn
	if (message.split(" ")[0] == "dn") {
		while ( keypress < keytime ) {
			keypress++;
			keytap("down",name);
		}
	}
	//keyboard Left
	if (message.split(" ")[0] == "l") {
		while ( keypress < keytime ) {
			keypress++;
			keytap("left",name);
		}
	}
	//keyboard Right
	if (message.split(" ")[0] == "r") {
		while ( keypress < keytime ) {
			keypress++;
			keytap("right",name);
		}
	}
	
	


	if(chatter.message === '%return') {
		robot.keyTap("enter");
		keytap("return",name);
	}
if(chatter.message === '%esc') {
	robot.keyTap("escape");
	keytap("escape",name);
	}
if (chatter.message === "%rclk") {
	robot.mouseClick("right");
	}
}
	
});



function command(command,name) {
	var data = { command: command, name: name}
	ioServer.emit("command",data)
	}

//output keypress
function keytap(keypress,name) {
	robot.keyTap(keypress)
	var data = { key: keypress, name: name};
	ioServer.emit("keypress",data)
	console.log(name + data)
}

function acceptInputTrue() {
	acceptInput = true
	robot.mouseToggle("up")
	Bot.say("Input Reactivated")
}


//inpu


Bot.say('Bot Controller Online');


express.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

ioServer.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
	console.log('overlay server ready on port: 3000');
});


console.log(robot.getMousePos());

api.clientID = config.twitch.apiId;



var screenX = 800
var screenY = 600


// socket.on('connect', () => {
	// console.log("Connected to heat server");
// });


// socket.on('click',(data) => {
// const clickData = JSON.parse(data);
// console.log(robot.getMousePos());
// var cx = clickData.x * screenX
// var cy = clickData.y * screenY
	// if (acceptInput) {
		// if (cx > minX && cx < maxX && cy > minY && cy < maxY){
			// console.log("validclick")
		// console.log(clickData.x, clickData.y);
		// if (gamemode = "click") {
			// robot.moveMouse(clickData.x * 800,clickData.y * 600);
			// robot.mouseClick();
		// }
		// }
	// console.dir(clickData);
	// ioServer.emit("clickData",clickData)
	// }
//console.log(clickData.x, clickData.y);
//robot.moveMouse(clickData.x * 800,clickData.y * 600);
//robot.mouseClick();
//});


