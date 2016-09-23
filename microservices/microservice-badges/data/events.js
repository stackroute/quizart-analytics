<<<<<<< HEAD:microservices/microservice-events/Events.js
var eventsData=[
  {
    eventType:'gameFinish',
    counters:['nOfWin','nOfConsWin','avgResTimeCrctCurrentGame','nOfUniqTopicPlayed','nOfGamePlayed','nOfCrctResCurGame','nOfWinForATopic'],
    badges:['thumbsUp','onARoll','responseNinja','jackOfAll','inspiration','highFive','wiseOne','magister','hatTrick']
  },
  {
    eventType:'successLogin',
    counters:['consLogin'],
    badges:['goodHabit']
  }
];
module.exports=eventsData;
=======
module.exports = [
  {
    eventType:'gameFinish',
    counters:['nOfWin','nOfConsWin','avgResTimeCrctCurrentGame','nOfUniqTopicPlayed','nOfGamePlayed','nOfCrctResCurGame','nOfWinForATopic'],
    badges:['thumbsUp','onARoll','responseNinja','jackOfAll','inspiration','highFive','wiseOne','magister','hatTrick']
  },
  {
    eventType:'successLogin',
    counters:['consLogin'],
    badges:['goodHabit']
  }
];
>>>>>>> f44f7fedd1a1e737461ee71716bccde7cc19691d:microservices/microservice-badges/data/events.js
