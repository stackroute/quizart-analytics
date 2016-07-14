var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const Tournament = connection.model('Tournament', require('./tournament.schema'));

  this.add('role:tournaments,cmd:dangerouslyDeleteAllTournaments', function(msg, respond) {
    return Tournament.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:tournaments,cmd:create', function(msg, respond) {
    return Tournament.create(msg, function(err, createdTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: createdTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveById', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveAll', function(msg, respond) {
    Tournament.find({tourEndDate: {"$gte": new Date(), "$lt": new Date(2020, 1, 15)}}, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:registerPlayer', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      retrievedTournament.registeredPlayers.push({userId: msg.userId});
      retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
      });
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:updateWinners', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var winners = msg.winners;
      for(var i=0;i<winners.length;i++) {
        retrievedTournament.gamePlayedPlayers.push({userId: winners[i].name});
      }
      for(var i=0;i<(winners.length*(retrievedTournament.eliminationPercentagePerGame/100));i++) {
        retrievedTournament.levelWinners.push({userId: winners[i].name});
      }
      retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
      });
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

};
