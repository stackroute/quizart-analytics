const seneca = require('seneca');
const gameProvisionerPlugin = require('./game-provisioner/index.js');

const gameProvisioner = seneca();
gameProvisioner.use(gameProvisionerPlugin, {playersPerGame: 1, generateQuestions: generateQuestions, questionTime: 5000});

function generateQuestions() {
  var questions = [];
  for(var i=0; i<3;i++) {
    questions.push({
      question: 'Question '+i+' ?',
      options: ['A'+i,'B'+i,'C'+i,'D'+i],
      correctResponseIndex: i%4,
      imageUrl: ''
    });
  }
  return questions;
};
