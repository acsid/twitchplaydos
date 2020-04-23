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


  if(chatter.message === '%a') {
	robot.keyTap("a");
	}
 if(chatter.message === '%return' {
	robot.keyTap("enter")
	}
});





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


