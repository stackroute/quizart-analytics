var context = require('../../context');
var mesh = context.mesh;
const Twitter = require('twitter');
const util =  require('util');
const appAuth = require('./twitter.auth.config');
var controller = {}  // role:timelineservice,cmd:createAuth'


controller.createToken = function(req,res){

         //console.log("=====Jwt token=====",req.claims);
          var username = 'sandeep'; //req.claims.sub;
          mesh.act('role:timelineservice,cmd:getTwitterAuth',{username:username},function(err,response){
             if(err){
                    console.log("===error in retrieving===",err);
                    res.status(500).send(err);
                 }
            else if (response.TwitterAuth.length<1) {
            // res with empty resposne.
                 console.log("===empty collection===");
                 res.status(500).send(err);
               }
            else {
                var auth = response.TwitterAuth[0];
                 console.log("=====auth data=====",auth);
                 mesh.act('role:jwt,cmd:createAuthToken',{username:username,key:auth.key,secret:auth.secret,userId:auth.userId},function(err,response){
                      if(err){

                           res.status(500).json(err);
                        }
                       else {
                     //response with token and data
                       console.log("==generated token===",response.token);
                       res.status(201).json({authToken:response.token});
                      }
                 });
               }
         });// end of role:timelineservice,cmd:getTwitterAuth

};  // end of createAuthToken

controller.getTwitterData  = function(req,res) {
console.log("====request came getTwitterData=====");
var twitterAuthConfig  ={};

 twitterAuthConfig.consumer_key = appAuth.consumer_key;
 twitterAuthConfig.consumer_secret=appAuth.consumer_secret;

  var authToken =  req.get("JWT");
 console.log("=====authtoken=====",authToken);
  if(authToken){
         var params;
         var endpoint;
     if(req.param("id")!=null){
         params = {q:"#"+req.param("id"),count:10};
         endpoint='search/tweets';
       }
     else {
        params = {q:"#"+req.param("id"),count:10};
        endpoint='search/tweets';
      }

    mesh.act('role:jwt,cmd:verifyAuthToken',{token:authToken},function(err,response){
      if(err){res.status(500).send(err);
        console.log("verification error",err);
       }
       else {
        var claims = response.claims;
        twitterAuthConfig.access_token_key = claims.key;
        twitterAuthConfig.access_token_secret= claims.secret;

        var client =  new Twitter(twitterAuthConfig);

        client.get('search/tweets',params, function(error, tweets, response) {

        if(error){
           res.status(500).send(err);
        }
        else {
            console.log(util.inspect(tweets.statuses.length));
            res.status(201).json(tweets);
         }
        });
      }
   });
   }
  else{
    res.status(500).json(err);
   }
};

controller.postToTwitter  = function(req,res) {
console.log("====request came getTwitterData=====");
var twitterAuthConfig  ={};

 twitterAuthConfig.consumer_key = appAuth.consumer_key;
 twitterAuthConfig.consumer_secret=appAuth.consumer_secret;

  var authToken =  req.get("JWT");
 console.log("=====authtoken=====",authToken);
  if(authToken){

    mesh.act('role:jwt,cmd:verifyAuthToken',{token:authToken},function(err,response){
      if(err){res.status(500).send(err);
        console.log("verification error",err);
       }
       else {
        var claims = response.claims;
        twitterAuthConfig.access_token_key = claims.key;
        twitterAuthConfig.access_token_secret= claims.secret;

        var client =  new Twitter(twitterAuthConfig);


        client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response){
              if(error) {
                  console.log("error in posting tweet",error);
                  res.status(500).json(error)
               }
             else{
                console.log("==tweet===",tweet);
                res.status(201).json(tweet);
              }
            });
         }
      }); // end of mesh act

   }  //end of if
  else{
     res.status(500).json(err);
   }
};

exports = module.exports = controller;
