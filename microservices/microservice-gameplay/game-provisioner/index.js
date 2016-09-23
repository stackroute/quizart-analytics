const seneca = require('seneca');
const async = require('async');

const gameManagerPlugin = require('../game-manager');

module.exports = function(options) {
  const playersPerGame = options.playersPerGame;
  const generateQuestions = options.generateQuestions;

  const questionTime = options.questionTime || 10;

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

      createGame(topicId);
    }

    return respond(null, {response: 'queued'});
  });

  this.use('redis-transport');
  this.listen({type: 'redis', pin: 'role:provisioner,cmd:*'});

  function createGame(topicId) {
    console.log('Creating Game');
    const topicQueue = queue[topicId];
    const players = getPlayers(topicQueue,playersPerGame);
    const gameId = 'game-'+Math.random() * 1823138313274;

    const questions = generateQuestions(topicId);

    console.log('CREATING GAME WITH QUESTION_TIME: ' + questionTime);

    // Create Game Manager
    const gameManager = seneca({log:'test'});

    gameManager.use(gameManagerPlugin,{gameId:gameId,players:players, questions: questions, questionTime: questionTime});
    gameManagers.push(gameManager);

    gameManager.on('gameComplete', function(leaderboard) {
      updateUserGameCompleteData(gameId, topicId, leaderboard);
    });

    gameManager.ready(function() {
      console.log('Game ID Sent to players');
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

    const microservice = seneca();
    async.series([
      function(callback) {
        microservice.use('redis-transport');
        microservice.client({type: 'redis', pin: 'role:queue,player:'+player+',cmd:*'});
        microservice.ready(callback);
      }, function(callback) {

        microservice.act('role:queue,player:'+player+',cmd:ready',{gameId:gameId},function(err, response){

          callback(err,response);
        });

      }, function(callback) {
        microservice.close(callback);
      }
    ]);
  };


  function getPlayers(topicQueue, noOfPlayers) {
    const players = [];
    for(let i=0; i<noOfPlayers; i++) {
      players.push(topicQueue.shift());
    }
    return players;
  };

  function updateUserGameCompleteData(gameId, topicId, leaderboard) {
    console.log('PROVISIONER_GAME_COMPLETED: gameId: ' + gameId);
    console.log('PROVISIONER_GAME_COMPLETED: topicId: ' + topicId);
    console.log('PROVISIONER_GAME_COMPLETED: leaderboard:', leaderboard);
  };
};
