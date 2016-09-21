const seneca = require('seneca');
const async = require('async');

module.exports = function(options) {
  const playersPerGame = options.playersPerGame;
  const generateQuestions = options.generateQuestions;

  const queue = {};
  const gameManagers = [];
  const count = 0;

  this.add('role:provisioner,cmd:queue', function(msg, respond) {
    const topicId = msg.topicId;
    const playerId = msg.playerId;

    if(!queue[topicId]) { queue[topicId] = []; }

    const topicQueue = queue[topicId];
    
    topicQueue.push(msg.playerId);
    
    if(topicQueue.length >= playersPerGame) {
      console.log("4th player joined!");
      createGame(topicId);
    }

    return respond(null, {response: 'queued'});
  });

  this.use('redis-transport');
  this.listen({type: 'redis', pin: 'role:provisioner,cmd:*'});

  function createGame(topicId) {
    const topicQueue = queue[topicId];
    const players = getPlayers(topicQueue,playersPerGame);
    const gameId = Math.random() * 1823138313274;

    const questions = generateQuestions(topicId);
    const questionTime = 200;

    // Create Game Manager
    const gameManager = seneca({log:'test'});

    gameManager.use('../game-manager/index.js',{gameId:gameId,players:players, questions: questions, questionTime: questionTime});
    gameManagers.push(gameManager);
    
    gameManager.ready(function() {
      players.forEach(sendGameIdToPlayer.bind(this,gameId));
      // players.forEach(playersStartPinging.bind(this,gameId));
    });
  };

  this.on('doDestroy', function(callback) {
    async.each(gameManagers, (gameManager,callback) => {
      gameManager.close(callback);
    }, callback);
  });

  function sendGameIdToPlayer(gameId,player) {

    //console.log("gameId & player are ",gameId,player );

    const microservice = seneca();
    async.series([
      function(callback) {
        microservice.use('redis-transport');
        microservice.client({type: 'redis', pin: 'role:queue,player:'+player+',cmd:*'});
        microservice.ready(callback);
      }, function(callback) {
        console.log("$$$$$$$$$$$$$");
        microservice.act('role:queue,player:'+player+',cmd:ready',{gameId:gameId},function(err, response){
          console.log("Got the response " ,response);
          callback(err,response);
        });

      }, function(callback) {
        microservice.close(callback);
      }
    ]);
  };

  // function playersStartPinging(gameId,player) {
  //     const microservice = seneca();

  //     microservice.add('role:gameplay,gameId:'+gameId+',cmd:nextQuestion', function(msg, respond) {
  //         console.log("Question is ", msg.question);   
  //     });
  //     microservice.use('redis-transport');
  //     microservice.listen({type: 'redis',pin:'role:gameplay,gameId:'+gameId+',cmd:*'});

  //     async.series([
  //     function(callback) {
  //       microservice.client({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',player:'+player+',cmd:*'});
  //       microservice.ready(callback);
  //     },function(callback) {
        
  //       microservice.act('role:gameplay,gameId:' + gameId + ',player:'+player+',cmd:ping',function(err, response){
  //         console.log("Check the response " ,response);
  //         callback(err,response);
  //       });
  //     }]);
  // };

  function getPlayers(topicQueue, noOfPlayers) {
    const players = [];
    for(let i=0; i<noOfPlayers; i++) {
      players.push(topicQueue.shift());
    }
    return players;
  };
};
