var seneca = require('seneca');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


var mesh = seneca();
mesh.use('mesh',{auto:true});

var context = require('./context');
context.mesh = mesh;
context.authorizeMiddleware = function(req, res, next) {
  mesh.act('role:jwt,cmd:verify', {token: req.get('JWT')}, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response !== 'success') { return res.status(404).send(); }
    req.claims = response.claims;
    next();
  });
};


var env = process.env.NODE_ENV || 'dev';

console.log('env is: ' + env);

app.use(express.static(__dirname + '/../common-ui'));

if(env.trim() === 'dev') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    console.log("inside server checking env",env);
    next();
  });
};

app.use(require('body-parser').json());

app.use('/api/v1', require('./router'));

var chat = io.of('/chat');
// var chat1 = io.of('/chat1');

// chat1.on('connection',function(socket){
//     console.log("====Inside socket.io of chat 1======");
//
//     socket.on('call_socket2',function(text){
//       console.log("====Inside Express from Socket 2 msg is:",text);
//     })
// });
// chat1.on('disconnect',function(socket){
//   console.log("=====Inside Express when socket 1 closes====");
//   socket.close();
// });

chat.on('connection', function(socket) {
  console.log("Inside socket.io");
  var chatMiddlewareMicroservice = require('seneca')();
  var flag = false;
  var count =0;
  socket.on('create_room', function(userids){
    // chatmiddleware.use('redis-transport');

    count++;
    console.log("=====Inside App.js Socket initaited , ",count);
      var channelId = false;
      mesh.act('role:chat,cmd:joinprivateroom',{ids:userids}, function(err, response){
          if(err) { console.error('===== ERR: ', err, ' =====');  }

          console.log("Inside App.js getting room ID===",response.roomId[0].object);
          channelId = response.roomId[0].object ;
      }).ready(function(){
      chatMiddlewareMicroservice.use('chatmiddlewareplugin',{chatroomId:channelId,socket:socket});
    });
  });

  socket.on('chat_message', function(msgToSend){
    console.log("Inside App.js meessage from client via socket====",msgToSend);

      console.log("Inside App.js meessage from client via socket inside flag condition====",msgToSend);
      chatMiddlewareMicroservice.act('role:chat,cmd:sendMsg', {msg: msgToSend}, function(err, response) {
          if(err) { console.error('===== ERR: ', err, ' =====');  }
          if(response.response === 'success')
          console.log("====Inside express after acting the response is msg ,===",response.message);
        });
      });

    socket.on('disconnect',function(){
      chatMiddlewareMicroservice.act('role:chat,cmd:unsubscribe', {msg: 'unsubscribe'}, function(err, response) {
          if(err) { console.error('===== ERR: ', err, ' =====');  }
          if(response.response === 'success')
          console.log("====Inside express unsubscribed from redis=== ",response.message);
        });
      console.log("=====Inside Express Socket.disconnected and redis unsubscribed=====");

    });
});

app.get('/topics',function(req,res) {
  console.log('form express-alltopics');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  mesh.act('role:allTopics,action:retrive',function(err,result){
    if (err) return console.error(err)
  console.log('-----------------'+result+'------------------------')
  res.send(result)
  })
  console.log('send');
});


app.get('/topics/myfav',function(req,res) {
 mesh.act('role:myFav,action:retrive',{user:req.params.uid},function(err,result){
 if (err) return console.error(err)
console.log('------------yahi to hai result-----'+result+'------------------------')
res.send(result);
 })
 console.log('agrt dfglca;lkg');
 })

 app.get('/tournamentSection',function(req,res) {
   console.log('form express-tournamentSection');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:randTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

 app.get('/tournaments',function(req,res) {
   console.log('form express-alltopics');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:allTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

app.post('/api/check',function(req,res){
 console.log('-------------- abc from express floow---------------');
 console.log(req.body.incre+'   0----------------------');
 console.log(req.body.id+'    ---------------------');
 var test = {
   id:req.body.id,
   incre:req.body.incre,
   username:req.body.uName
 }

 var username = req.body.uName;

 mesh.act('role:topic,action:like',{data:test},function(err,result){

   if(err) console.log(err+'---------------------------------------done liked---------');

   console.log(result+'yaha thak hai>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
   if(!req.body.incre) {
     mesh.act('role:topic,action:delete',{data:test},function(err,result2){

       if(err) console.log(err+' ========================');

       res.send(result)
     })
   }
     //  res.send(result);
 })
});


app.use(function(req, res) {
  return res.status(404).send();
});

exports = module.exports = server;
