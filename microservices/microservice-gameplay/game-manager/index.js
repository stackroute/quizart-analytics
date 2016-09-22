const seneca = require('seneca');

module.exports = function(options) {
  const gameId = options.gameId;
  const playerIds = options.players;
  const questions = options.questions;
  const questionTime = options.questionTime || 10;

  var playersJoined = 0;
  this.use('redis-transport');
  playerIds.forEach((playerId) => {
    this.add('role:gameplay,gameId:' + gameId + ',player:'+playerId+',cmd:ping', function(msg, respond) {
      playersJoined++;
      respond(null, {response: 'pong'});
      if(playersJoined === playerIds.length) {
        return startGame.bind(this)();
      }
    });
    this.add('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:respond', function(msg, respond) {
      return respond(null, {correctResponse: correctResponseIndex});
    })
    this.listen({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:*'});
  });

  this.client({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',cmd:*'});

  var currQuestionIndex = -1;
  var correctResponseIndex;

  var questionInterval;

  function startGame() {
    nextQuestion.bind(this)();

    if(!canStopGame()) {
      questionInterval = setInterval(() => {
        nextQuestion.bind(this)();
      },questionTime);
    }
  }

  function nextQuestion() {
    var question = questions[++currQuestionIndex];
    correctResponseIndex = question.correctResponseIndex;
    this.act('role:gameplay,gameId:'+gameId+',cmd:nextQuestion',question);
    if(canStopGame()) { clearInterval(questionInterval); }
  }

  function canStopGame() {
    return currQuestionIndex === questions.length-1;
  }
};
