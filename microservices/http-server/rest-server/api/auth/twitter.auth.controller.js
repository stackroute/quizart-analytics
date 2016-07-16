var context = require('../../context');
var mesh = context.mesh;
const twitterConfig =  require('./twitter.auth.config')
var twitterAPI = require('node-twitter-api');
var twitterAuth = new twitterAPI(twitterConfig);
var controller = {}
var _requestToken;
var _requestTokenSecret;
var _accessToken,_accessTokenSecret;

controller.getRequestToken = function(req,res){

    console.log("====getRequestTokenrequest request came=====");
    twitterAuth.getRequestToken(function(error, requestToken, requestTokenSecret, results){
     	if (error) {
        	   console.log("Error getting OAuth request token : " + error);
             res.send(error);
  	 } else {
  	          _requestToken =  requestToken;
              _requestTokenSecret =requestTokenSecret;
               //res.send("https://api.twitter.com/oauth/authenticate?oauth_token=" +requestToken);
               res.status(201).json({url:"https://api.twitter.com/oauth/authenticate?oauth_token=" +requestToken});
           }
   });
};
  controller.getAccessToken =   function(req,res){

  var requestToken = req.query.oauth_token;
  var oauth_verifier  = req.query.oauth_verifier;

   console.log('====Received Auth Token!!======');

  twitterAuth.getAccessToken(requestToken, _requestTokenSecret,oauth_verifier,function(error, accessToken, accessTokenSecret, results) {

 if (error) {
	          	 console.log(error);
               res.status(500).send(error);
	    } else {

           _accessToken =  accessToken;
           _accessTokenSecret=accessTokenSecret;
           console.log("======accessToken",accessToken);
           console.log("======accessTokenSecret",accessTokenSecret);

    twitterAuth.verifyCredentials(accessToken, accessTokenSecret, function(err, user) {
       if (err)
          res.status(500).send(err);
          else{
            console.log("=====user-details====",user);
            //call microservice to save credential to database

            res.redirect("/");
         }
     });
     }
  });
};

exports = module.exports = controller;
