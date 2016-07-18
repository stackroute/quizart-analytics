import React from 'react';
import CommentForm from  './CommentForm';
import Tweet from 'react-tweet';
var socket = io('/tweets');
export default class Timeline extends React.Component{
  constructor (props){
     super(props);
     this.state = {tweets:[]};

  }

loadDataFromSever(){
  var id;
  if(this.props.user!=undefined){
    id ="user";
    console.log("====user timeline");
  }
 else {
    id ="SuperheroPIXathon";
   console.log("topic timeline");
 }
 var request =  $.ajax({
    url: "api/v1/timeline/twitter/getTwitterData/"+id,
    contentType: 'application/json',
    cache: false,
    headers: {JWT: localStorage.authToken}

  });

  request.done(function(data) {
                console.log("=====id===",id);
               console.log("=======retrievedPosts=======",data);
               if(data instanceof Array){
                  console.log("=====tweets====",data);
                  this.setState({tweets:data})
               }
               else {
                  this.setState({tweets:data.statuses});
               }

    }.bind(this));

      request.fail(function(xhr, status, err) {
      console.error("api/v1/timeline/gettweet/", status, err.toString());
    }.bind(this));


}

  componentDidMount(){
          console.log("=====token",localStorage.authToken);
          this.loadDataFromSever();
          console.log(" new new  componentDidMount called");
          var  that = this;
          socket.on('tweetData', function getTweet (tweet) {
           console.log("============tweet ",tweet);
          if(tweet.user.id!="undefined"){
             console.log("====username====",tweet.user.name);
             that.setState({tweets:[tweet].concat(that.state.tweets)});
         }
});

}

   handlePost(post){

     console.log("====post=====",post);
     var request  =  $.ajax({
       url: "api/v1/timeline/twitter/postToTwitter",
       type: 'POST',
       data: JSON.stringify({text:post}),
       contentType: 'application/json',
       headers: {JWT: localStorage.authToken}
     });

     request.done(function(data) {
     console.log("=========tweeted: "+JSON.stringify(data)+"========");

       }.bind(this));
        request.fail( function(err) {
         console.error("api/v1/timeline/twitter/postToTwitter", status, err.toString());
       }.bind(this));
  }

  render() {


     var createPost = this.state.tweets.map(function(data) {

         return (<Tweet data = {data}/>);
    });
    return (
      <div>
        <CommentForm newPost = {this.handlePost.bind(this)}/>
        <div style = {{marginLeft:0}}>
            {
              createPost
            }
        </div>
      </div>
    )
  }
}
