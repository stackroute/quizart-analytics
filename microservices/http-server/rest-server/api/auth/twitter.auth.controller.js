var context = require('../../context');
var mesh = context.mesh;
const twitterConfig =  require('./twitter.auth.config')
var twitterAPI = require('node-twitter-api');
var twitterAuth = new twitterAPI(twitterConfig);
var controller = {}
var _requestToken;
var _requestTokenSecret;
var _accessToken,_accessTokenSecret;
var obj = {};

controller.getRequestToken = function(req,res){

    console.log("====getRequestTokenrequest request came=====");
    var username = req.claims.sub;
    console.log("===username===",username);
    twitterAuth.getRequestToken(function(error, requestToken, requestTokenSecret, results){
     	if (error) {
        	      console.log("Error getting OAuth request token : " + error);
                res.send(error);
  	   } else {
  	          _requestToken =  requestToken;
              _requestTokenSecret =requestTokenSecret;
               //res.send("https://api.twitter.com/oauth/authenticate?oauth_token=" +requestToken);
               console.log("===request token====",requestToken);
               obj[requestToken] = username;
               res.status(201).json({url:"https://api.twitter.com/oauth/authenticate?oauth_token=" +requestToken});
           }
   });
};

controller.getAccessToken =   function(req,res){

  var requestToken = req.query.oauth_token;
  var oauth_verifier  = req.query.oauth_verifier;
  var username = obj[requestToken];
  delete obj[requestToken];
  console.log('====Received Auth Token!!======');
  console.log("=====requestToken",requestToken);
  twitterAuth.getAccessToken(requestToken, _requestTokenSecret,oauth_verifier,function(error, accessToken, accessTokenSecret, results) {

     if(error) {
	         console.log(error);
           res.redirect('http://192.168.99.100:8001/#/authsuccess/'+"error");
	     }
    else {

           _accessToken =  accessToken;
           _accessTokenSecret=accessTokenSecret;
            console.log("======accessToken",accessToken);
            console.log("======accessTokenSecret",accessTokenSecret);

    twitterAuth.verifyCredentials(accessToken, accessTokenSecret, function(err, user) {
      if (err)
          res.redirect('http://192.168.99.100:8001/#/twitterauthsuccess/'+"error");
       else{
         console.log("=====user-details====",user);
         mesh.act('role:timelineservice,cmd:createAuth',{username:username,key:accessToken,secret:accessTokenSecret,userId:user.id},function(err,response){
              if(err){
                  res.redirect('http://192.168.99.100:8001/#/twitterauthsuccess/'+"error");
               }
              else {
                mesh.act('role:jwt,cmd:createAuthToken',{username:username,key:accessToken,secret:accessTokenSecret,userId:user.id},function(err,response){
                     if(err){
                        res.redirect('http://192.168.99.100:8001/#/twitterauthsuccess/'+"error");
                      }
                     else {
                        res.redirect('http://192.168.99.100:8001/#/twitterauthsuccess/'+response.token);
                    }
               });

              }
           }); // outer mesh act
         }
       });
   }  // end of first else
  });
};

exports = module.exports = controller;
