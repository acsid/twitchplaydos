var io = require('socket.io-client')
var robot = require("robotjs");
const socket = io('wss://heat-ebs.j38.net/');
const TwitchBot = require('twitch-bot');
var api = require('twitch-api-v5');
var express = require('express')();
var http = require('http').createServer(express);

var ioServer = require('socket.io')(http);
const config = require('./config.json');


//=======================================
//= CONFIGURATION  SEE config.json
//=======================================


const Bot = new TwitchBot({
	username: 'DOSBOT',
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

//possible "click" "arakey"

var gameMode = "click";
var game = "s2k";

var acceptInput = true;
 
Bot.on('message', chatter => {
  if(chatter.message === '!help') {
	Bot.say('Input keyboard key by typing %<Key> Ex: %a = typing a');
	Bot.say('Click on the stream to controle the mouse');
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

if (game == "s2k") {
	if (message = "%powerplant") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(selectPower,2000);
		Bot.say("Input paused for Powerplant menu...")
		robot.moveMouse(30,117)
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message = "%waterpump") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(waterPump,2000);
		Bot.say("Input paused for getting waterpump...")
		robot.moveMouse(50,111)
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	}

 if(chatter.message === '%return') {
	robot.keyTap("enter");
	keytap("return");
	}
	
	
	}
});

function selectPower(){
	robot.dragMouse(48,135)
	robot.mouseToggle("up")
}
function waterPump(){
	robot.dragMouse(48,135)
	robot.mouseToggle("up")
}

//output keypress
function keytap(keypress,name) {
	var data = { key: keypress, name: name};
	ioServer.emit("keypress",data)
	console.log(name + data)
}

function acceptInputTrue() {
	acceptInput = true
	robot.mouseToggle("up")
	Bot.say("Input Accepted")
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


var minX = 3
var maxX = 643
var minY = 35
var maxY = 427

var screenX = 800
var screenY = 600


socket.on('connect', () => {
socket.emit("channel",config.heat.id)
});


socket.on('click',(data) => {
const clickData = JSON.parse(data);
console.log(robot.getMousePos());
var cx = clickData.x * screenX
var cy = clickData.y * screenY
if (acceptInput) {
if (cx > minX && cx < maxX && cy > minY && cy < maxY){
    console.log("validclick")
console.log(clickData.x, clickData.y);
if (gamemode = "click") {
robot.moveMouse(clickData.x * 800,clickData.y * 600);
robot.mouseClick();
}
}
console.dir(clickData);
ioServer.emit("clickData",clickData)
}
//console.log(clickData.x, clickData.y);
//robot.moveMouse(clickData.x * 800,clickData.y * 600);
//robot.mouseClick();
});


