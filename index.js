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
//compatible with All point and click adventures
//Sim City 2000


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
	Bot.say('Click on the stream to control the mouse');
	if ( game == "s2k" ) {
	Bot.say('SimCity2k: %powerplant, %waterpump, %watertower');	
	Bot.say('Zone: Residential(Light: %lightres, Dense: %denseres) ')
	}
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
	if (message === "%powerplant") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(selectPower,2000);
		Bot.say("Input paused for Powerplant menu...")
		robot.moveMouse(30,107)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%waterpump") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(waterPump,2000);
		Bot.say("Input paused for getting waterpump...")
		robot.moveMouse(50,111)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%watertower") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(waterPump,2000);
		Bot.say("Input paused for getting watertower...")
		robot.moveMouse(50,111)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%lightres") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(lightRes,2000);
		Bot.say("Input paused for getting Light Residential...")
		robot.moveMouse(30,156)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%denseres") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(denseRes,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(30,156)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%lightcom") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(lightCom,2000);
		Bot.say("Input paused for getting Light Residential...")
		robot.moveMouse(44,156)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%densecom") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(denseCom,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(44,156)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	
	if (message === "%lightind") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(lightInd,2000);
		Bot.say("Input paused for getting Light Residential...")
		robot.moveMouse(70,156)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
	if (message === "%denseind") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(denseInd,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(70,156)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
		//school
		if (message === "%school") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(selectSchool,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(27,179)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
		if (message === "%college") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(selectCollege,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(27,179)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
		if (message === "%library") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(selectLibrary,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(27,179)
		robot.mouseClick();
		robot.mouseToggle("down");
		//popup located at x48,y135
		}
		if (message === "%museum") {
		acceptInput = false
		//button located at x30,y117
		setTimeout(acceptInputTrue, 5000);
		setTimeout(selectMuseum,2000);
		Bot.say("Input paused for getting Dense Residential...")
		robot.moveMouse(27,179)
		robot.mouseClick();
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
function selectSchool(){
	robot.dragMouse(39,186)
	robot.mouseToggle("up")
}
function selectCollege(){
	robot.dragMouse(47,210)
	robot.mouseToggle("up")
}
function selectLibrary(){
	robot.dragMouse(47,219)
	robot.mouseToggle("up")
}
function selectMuseum(){
	robot.dragMouse(47,237)
	robot.mouseToggle("up")
}
function lightCom(){
	robot.dragMouse(69,160)
	robot.mouseToggle("up")
}
function denseCom(){
	robot.dragMouse(69,180)
	robot.mouseToggle("up")
}
function lightInd(){
	robot.dragMouse(75,160)
	robot.mouseToggle("up")
}
function denseInd(){
	robot.dragMouse(75,180)
	robot.mouseToggle("up")
}
function lightRes(){
	robot.dragMouse(48,160)
	robot.mouseToggle("up")
}
function denseRes(){
	robot.dragMouse(48,180)
	robot.mouseToggle("up")
}
function selectPower(){
	robot.dragMouse(48,135)
	robot.mouseToggle("up")
}
function waterPump(){
	robot.dragMouse(72,133)
	robot.mouseToggle("up")
}
function waterTower() {
	robot.dragMouse(72,153)
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
if ( game == "s2k" ){
}
else { robot.mouseClick(); }
}
}
console.dir(clickData);
ioServer.emit("clickData",clickData)
}
//console.log(clickData.x, clickData.y);
//robot.moveMouse(clickData.x * 800,clickData.y * 600);
//robot.mouseClick();
});


