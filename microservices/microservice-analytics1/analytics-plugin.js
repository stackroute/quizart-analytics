var mongoose = require('mongoose');

module.exports = function(options) {

  // TODO: Connect to MongoDB
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
  const Game = connection.model('Game', require('./gameschema'),'game_info');
  const Filter = connection.model('Filter', require('./filterschema'),'filtered_data');
  const Winloss = connection.model('Winloss', require('./winloss.schema'),'win_loss');

  // Register Services
  
  this.add('role:analytics,cmd:favouritetopics',function(msg,respond){
    // var a= new Filter({userId:51});
    // a.save();
    // // var a={}
    Filter.findOne({userId:msg.userid},function(err,response){
      if(err) return handleError(err);
      console.log(response._id);
      console.log(response.favTopics);
      console.log(response.userId);
      // a=response;
    return respond(null,{response: 'success', result: response.favTopics}); 
    });
    // console.log(a);
    // var result={"bharath":[
    //         {  y: 4181563, legendText:"Sherlock", indexLabel: "Sherlock" },
    //         {  y: 2175498, legendText:"Movies", indexLabel: "Movies" },
    //         {  y: 3125844, legendText:"Logos",exploded: true, indexLabel: "Logos" },
    //         {  y: 1176121, legendText:"Sports" , indexLabel: "Sports"},
    //         {  y: 1727161, legendText:"Cricket", indexLabel: "Cricket" },
    //         {  y: 4303364, legendText:"General Knowledge" , indexLabel: "General Knowledge"},
    //         {  y: 1717786, legendText:"Animals" , indexLabel: "Animals"}
    //     ],"bharath1":[
    //         {  y: 4181564, legendText:"Sherlock", indexLabel: "Sherlock" },
    //         {  y: 2175498, legendText:"Movies", indexLabel: "Movies" },
    //         {  y: 3125844, legendText:"Logos",exploded: true, indexLabel: "Logos" },
    //         {  y: 1176121, legendText:"Sports" , indexLabel: "Sports"},
    //         {  y: 1727161, legendText:"Cricket", indexLabel: "Cricket" },
    //         {  y: 4303364, legendText:"General Knowledge" , indexLabel: "General Knowledge"},
    //         {  y: 1717786, legendText:"Animals" , indexLabel: "Animals"}
    //     ]};

    //     console.log("analytics favtopics");
    // return respond(null,{response: 'success', result: result.bharath1[msg.userid]}); 
});

  this.add('role:analytics,cmd:favtopicsfilter',function(msg,respond){
     Game.aggregate([
            { $group: { _id: {userId: "$user_id", topicId: "$topic_id"}, count: {$sum: 1} } },
            { $sort: {_id: -1, count: -1} },
            { $group: { _id: "$_id.userId", favTopics: {$push: {topicId: "$_id.topicId", gamesPlayed: "$count"} } }},
            { $project: { userId: "$_id", _id: 0, favTopics: 1 } },
            { $out: "filtered_data" }

          ], function(err, result) {
            if(err) { return console.error("Error with Aggregate"); }
            console.log("Result", JSON.stringify(result[0]));
          });
     console.log("analytics filterdata");
   return respond(null,{response: 'success', result: "Data is Filtered and stored in filtered_data Collection" });
});

  this.add('role:analytics,cmd:winlossfilter',function(msg,respond){
    Game.aggregate([
            { $group: { _id: {userId: "$user_id", statusId: "$status"}, count: {$sum: 1} } },
            { $group: { _id: "$_id.userId", status: {$push: {statusId: "$_id.statusId", count: "$count"} } }},
            { $project: { userId: "$_id",status:"$status" } },
            { $out: "win_loss" }

          ], function(err, result) {
            if(err) { return console.error("Error with Aggregate"); }
            console.log("Result", JSON.stringify(result[0]));
          });
    return respond(null,{response: 'success', result: "Data is Filtered and stored in win_loss Collection"}); 
    });

this.add('role:analytics,cmd:winloss',function(msg,respond){
    // new Winloss({userId:"bharath"}).save();    
    Winloss.findOne({userId:msg.userid},function(err,response){
      if(err) return handleError(err);
      console.log(response);
      // console.log(response.favTopics);
      // console.log(response.userId);
    return respond(null,{response: 'success', result: response.status}); 
    });
    });
}