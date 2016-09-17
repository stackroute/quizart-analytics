// var Event = require('./eventCreator');
// var EventExecutor = require('./eventExecutor');
var mongoose=require('mongoose');
var Asynchrony = require('asynchrony-di');
var asynchrony = new Asynchrony();
var userLogin=require('./userLogin.schema');
var userLoginCounter=require('./userLoginCounter');
var Event = require('./eventCreator');
var EventExecutor = require('./eventExecutor');

module.exports = function(options) {
    //mongoose.connect(options.mongoUrl);
    console.log('===================badges-microservice-plugin=======================');
    this.add('role:badges,cmd:login',function(msg,respond){
        console.log("===============Inside add function of microservice badges plugin==================");
        console.log(msg.eventName+"   "+msg.eventType);
        
        var event = new Event(msg.eventName,msg.eventType);
        var eventExecutor = new EventExecutor(event);
        
        console.log('===================================');
        eventExecutor.execute(function(badgeId) {
            console.log('\n\nBADGE:::: Badge ' + badgeId + 'awarded\n\n');
        });
        
        respond(null, {answer:'inside badges microservice'});
    });
};


var awardBadge=function(){

}