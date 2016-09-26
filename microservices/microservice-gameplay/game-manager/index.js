const seneca = require('seneca');

module.exports = function(options) {
  const gameId = options.gameId;
  const playerIds = options.players;
  const questions = options.questions;
  const questionTime = options.questionTime || 10;

  const leaderboard = {};

  console.log('1. CREATING GAME MANAGER FOR ' + JSON.stringify(playerIds) + ' with GAME_ID: ' + gameId);

  var playersJoined = 0;
  this.use('redis-transport');
  playerIds.forEach((playerId, index) => {
    console.log('2. (' + (index+1) + '/' + playerIds.length + ')' + 'CREATING PLAYER_RESPONSE_CHANNEL FOR PLAYER ' + playerId);
    this.add('role:gameplay,gameId:' + gameId + ',player:'+playerId+',cmd:ping', function(msg, respond) {
      playersJoined++;
      leaderboard[playerId] = 0;
      console.log('6. GAME_MANAGER IS ABOUT TO SEND PONG');
      respond(null, {response: 'pong'});
      console.log('7. ' + playersJoined + '/' + playerIds.length + ' players have Joined');
      if(playersJoined === playerIds.length) {
        return startGame.bind(this)();
      }
    });
    this.add('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:respond', function(msg, respond) {
      return respond(null, {correctResponse: correctResponseIndex});
    });
    this.listen({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:*'});
  });

  this.client({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',cmd:*'});
  console.log('3. BROADCAST CHANNEL CREATED');

  var currQuestionIndex = -1;
  var correctResponseIndex;

  var questionInterval;

  function startGame() {
    console.log('8. GAME_MANAGER IS STARTING GAME');
    nextQuestion.bind(this)();

    if(!canStopGame()) {
      questionInterval = setInterval(() => {
        nextQuestion.bind(this)();
      },questionTime);
    }
  }

  function nextQuestion() {
    console.log('Next Question Being Sent');
    var question = questions[++currQuestionIndex];
    correctResponseIndex = question.correctResponseIndex;
    this.act('role:gameplay,gameId:'+gameId+',cmd:nextQuestion',question);
    if(canStopGame()) {
      clearInterval(questionInterval);
      setTimeout(() => {
        this.act('role:gameplay,gameId:'+gameId+',cmd:gameComplete',{leaderboard});
        this.emit('gameComplete', leaderboard);
      },questionTime);
    }
  }

  function canStopGame() {
    return currQuestionIndex === questions.length-1;
  }
};