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
 
Bot.on('message', chatter => {
  if(chatter.message === '!test') {
    Bot.say('good')
  }
  if(chatter.message === '%return') {
	//press return
	}

//keyboard input

	switch(chatter.message){
		case '%a':
		robot.keyTap("a");
	        keytap("a");
		break;
                case '%b':
                robot.keyTap("b");
                keytap("b");
                break;
                case '%c':
                robot.keyTap("c");
                keytap("c");
                break;
                case '%d':
                robot.keyTap("d");
                keytap("d");
                break;
                case '%e':
                robot.keyTap("f");
                keytap("g");
                break;
                case '%h':
                robot.keyTap("h");
                keytap("h");
                break;
                case '%i':
                robot.keyTap("i");
                keytap("i");
                break;
                case '%j':
                robot.keyTap("j");
                keytap("j");
                break;
                case '%k':
                robot.keyTap("k");
                keytap("k");
                break;
                case '%l':
                robot.keyTap("l");
                keytap("l");
                break;
                case '%m':
                robot.keyTap("m");
                keytap("m");
                break;
                case '%n':
                robot.keyTap("n");
                keytap("n");
                break;
                case '%o':
                robot.keyTap("o");
                keytap("o");
                break;
                case '%p':
                robot.keyTap("p");
                keytap("p");
                break;
                case '%q':
                robot.keyTap("q");
                keytap("q");
                break;
                case '%r':
                robot.keyTap("r");
                keytap("r");
                break;
                case '%s':
                robot.keyTap("s");
                keytap("s");
                break;
                case '%t':
                robot.keyTap("t");
                keytap("t");
                break;
                case '%u':
                robot.keyTap("u");
                keytap("u");
                break;
                case '%v':
                robot.keyTap("v");
                keytap("v");
                break;
                case '%w':
                robot.keyTap("w");
                keytap("w");
                break;
                case '%x':
                robot.keyTap("x");
                keytap("x");
                break;
                case '%y':
                robot.keyTap("y");
                keytap("y");
                break;
                case '%z':
                robot.keyTap("z");
                keytap("z");
                break;
                case '%1':
                robot.keyTap("1");
                keytap("1");
                break;
                case '%2':
                robot.keyTap("2");
                keytap("2");
                break;
                case '%3':
                robot.keyTap("3");
                keytap("3");
                break;
                case '%4':
                robot.keyTap("4");
                keytap("4");
                break;
                case '%5':
                robot.keyTap("5");
                keytap("5");
                break;
                case '%6':
                robot.keyTap("6");
                keytap("6");
                break;
                case '%7':
                robot.keyTap("7");
                keytap("7");
                break;
                case '%8':
                robot.keyTap("8");
                keytap("8");
                break;
                case '%9':
                robot.keyTap("9");
                keytap("9");
                break;
                case '%0':
                robot.keyTap("0");
                keytap("0");
                break;










	}

 if(chatter.message === '%return') {
	robot.keyTap("enter");
	keytap("return");
	}
});

//output keypress
function keytap(keypress) {
ioServer.emit("keypress",keypress)

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

//console.log(clickData.x, clickData.y);
//robot.moveMouse(clickData.x * 800,clickData.y * 600);
//robot.mouseClick();
});


