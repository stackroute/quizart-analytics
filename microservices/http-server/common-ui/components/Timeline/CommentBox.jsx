import React from 'react';
import Post from './Post';
import FlatButton from 'material-ui/FlatButton';
import CommentForm from  './CommentForm';
import Tweet from 'react-tweet';
var id ="SuperheroPIXathon";
var socket = io('/tweets');

export default class CommentBox extends React.Component{
  constructor (){
     super();
     this.state = {postList:[]};

  }

loadDataFromSever(){
 var request =  $.ajax({
    url: "api/v1/timeline/twitter/getTwitterData/"+id,
    contentType: 'application/json',
    cache: false,
    headers: {JWT: localStorage.authToken}

  });

  request.done(function(data) {

               console.log("=======retrievedPosts=======",data);
               var tweets = data;
               console.log("=====tweets====",tweets);
               this.setState({postList:tweets});

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
             console.log("====user profile image====",tweet.user.profile_image_url);
            // var post = {text:tweet.text,imgUrl:tweet.user.profile_image_url,user:tweet.user.name};
             that.setState({postList:[tweet].concat(that.state.postList)});
         }
});

}

   handlePost(newPost){


      var post ={parentId:"t1",text:newPost,imgUrl:"http://lorempixel.com/100/100/nature/",user:"sandeep",postDate:new Date()}
    //  this.setState({postList:[post].concat(this.state.postList)});
     //console.log("postList"+this.state.postList);
       this.WritePostToServer(post)

  }

  WritePostToServer(post){

       var request  =  $.ajax({
          url: "api/v1/timeline/createpost",
          type: 'POST',
          data: JSON.stringify(post),
          contentType: 'application/json'});

          request.done(function(data) {
            console.log("=========data: "+JSON.stringify(data)+"========");
          //  console.log("=========data: "+data.postId+"========");
            var Data = JSON.stringify(data);
            var newpost =  {_id:Data.postId,user:post.user,imgUrl:post.imgUrl,text:post.text}
                commentList.set(Data.postId,[]);
                this.setState({postList:[newpost].concat(this.state.postList)});
          }.bind(this));

          request.fail( function(err) {
            console.error("api/v1/timeline/createpost", status, err.toString());
          }.bind(this));



  }




  render() {


     var createPost = this.state.postList.map(function(data) {

         return (<Tweet data = {data}/>);
    });
    return (
      <div>

        <div style = {{marginLeft:0}}>
            {
              createPost
            }
        </div>
      </div>
    )
  }
}
