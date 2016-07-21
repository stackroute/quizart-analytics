var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var env = process.env.NODE_ENV || 'dev';


  const connection = mongoose.createConnection(process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4');

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + (process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4'));
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + (process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4'));
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const Tournament = connection.model('Knockout', require('./tournament.schema'));

console.log('before');
  var tour = {"_id":"57909f8004cb700f00cb2e0d","title":"vcxv","avatarURL":"http://lorempixel.com/600/337/nature/","imageURL":"http://lorempixel.com/600/337/nature/","overlayTitle":"vcxv","overlaySubtitle":"cxvxc","description":"vcxvcx","instructions":"vcxcxv","prizes":"cxv","noOfLevels":2,"regEndDate":"2016-07-21T10:11:15.774Z","__v":0,"levels":[{"active":"no","tourStartDate":"2016-07-21T10:11:24.424Z","tourEndDate":"2016-07-21T10:15:30.413Z","_id":"57909f8004cb700f00cb2e0f","games":[[{"userId":"2@gmail.com","score":"50","_id":"5790a04804cb700f00cb2e17"},{"userId":"3@gmail.com","score":"50","_id":"5790a04804cb700f00cb2e16"},{"userId":"1@gmail.com","score":"20","_id":"5790a04804cb700f00cb2e15"},{"userId":"4@gmail.com","score":"20","_id":"5790a04804cb700f00cb2e14"}]],"leaderboard":[{"_id":"5790a04804cb700f00cb2e17","score":"50","userId":"2@gmail.com"},{"_id":"5790a04804cb700f00cb2e16","score":"50","userId":"3@gmail.com"},{"_id":"5790a04804cb700f00cb2e15","score":"20","userId":"1@gmail.com"},{"_id":"5790a04804cb700f00cb2e14","score":"20","userId":"4@gmail.com"}],"registeredPlayers":[{"userId":"1@gmail.com","_id":"57909f8504cb700f00cb2e10"},{"_id":"57909f8a04cb700f00cb2e11","userId":"2@gmail.com"},{"userId":"3@gmail.com","_id":"57909f8e04cb700f00cb2e12"},{"_id":"57909f9704cb700f00cb2e13","userId":"4@gmail.com"}]},{"active":"yes","tourStartDate":"2016-07-21T10:18:41.037Z","tourEndDate":"2016-07-21T10:18:46.505Z","_id":"57909f8004cb700f00cb2e0e","games":[],"leaderboard":[],"registeredPlayers":[]}],"isComplete":false,"eliminationPercentagePerGame":50};
  var arr = [{userId: '2@gmail.com'},{userId: '3@gmail.com'}];
  tour.levels[1].registeredPlayers.push({userId: arr[0].userId});
  tour.levels[1].registeredPlayers.push({userId: arr[1].userId});
  Tournament.update(
     { _id: "57909f8004cb700f00cb2e0d" },
     { $set: tour },
     function(err,res) {
       if(err) {
         console.error('ERROR: ', err);
         return;
       }
     }
  );
console.log('after');
