import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';





  var counts = [];
  var count;
  var topics = [];
  var topic = [];
  var titles = [];

  // var topics =[
  //   {
  //   id : 1,
  //   title: "Cricket",
  //   subtitle: "Let's play a cricket quiz",
  //   avatarImg: './img/topic/avtar.jpg',
  //   img: './img/topic/main.jpg',
  //   category: "Sports",
  //   followers : 0
  // }
  // ,
  // {
  //   id : 2,
  //   title: "Singers",
  //   subtitle: "Let's play a music quiz",
  //   avatarImg: './img/topic/siavtar.jpg',
  //   img: './img/topic/simain.jpg',
  //   category: "Music",
  //   followers : 0
  // },
  // {
  //   id : 3,
  //   title: "Directors",
  //   subtitle: "Let's play a Directors quiz",
  //   avatarImg: './img/topic/mdavtar.jpg',
  //   img: './img/topic/mdmain.jpg',
  //   category: "Music",
  //   followers : 0
  // }
  // ];

  const style = {
  	float : "left",
  	margin : "auto"
  };

const liStyle = {
  listStyleType : 'none',
};
  const img_style ={
  	height:"50%",
  	width:"50%",
  	borderRadius:"50%",
  	marginLeft : "25%"
  };

  var feedImgStyle = {
  	height:"20%",
  	width : "100%"
  };

  const feedAvatar ={
  	margin : "auto"
  };

  const btnStyle = {
  	margin : 5,
  	backgroundColor : "#00bcd4",
  	color : "#fff"
  };

  const statsStyle = {
  	fontSize:13,
  	textAlign:"center"
  };

  const factStyle = {
  	fontSize : 20,
  	textAlign : "center"
  };

  const hStyle = {
  	textAlign : "-webkit-center"
  };

  var cardDivStyle={
     margin:10,
  }

  var title1={
      paddingLeft:10,
      paddingTop:10,
      marginBottom:5
  }
  var title2={
    paddingLeft:10,
    marginTop:10,
    marginBottom:10
  };

  export default class AbtTopic extends React.Component {

    constructor(props,context) {
      super(props,context);
      context.router;

  	this.state = {
          count: this.props.initialCount,
          topic : this.props.topics
  	};
  };

    static propTypes = { topics: React.PropTypes.array };
    // static  defaultProps(){
    //     // return{
    //
    //         topics :[
    //          {
    //         id : 1,
    //         title: "Cricket",
    //         subtitle: "Let's play a cricket quiz",
    //         avatarimg: './img/SubTopicImages/avtar.jpg',
    //         img: './img/SubTopicImages/main.jpg',
    //         category: "Sports"
    //         }
    //         ,
    //         {
    //         id :2,
    //         title: "Singers",
    //         subtitle: "Let's play a music quiz",
    //         avatarimg: './img/SubTopicImages/siavtar.jpg',
    //         img: './img/SubTopicImages/simain.jpg',
    //         category: "Music"
    //         },
    //         {
    //           id : 3,
    //         title: "Directors",
    //         subtitle: "Let's play directors quiz",
    //         avatarimg: './img/SubTopicImages/mdavtar.jpg',
    //         img: './img/SubTopicImages/mdmain.jpg',
    //         category: "Music"
    //         }
    //         ]
    //
    //       };

    static propTypes = { initialCount: React.PropTypes.number };
    static defaultProps = { initialCount: 0 };

    static initialState(props) {
      return {
        count: this.state.count,
      };
    }

     tick() {
       this.setState({count: this.state.count + 1});
       counts = this.state.count+1;
       //topics.followers.push(counts);
       console.log(counts);
     }
     //
    //  add() {
    //    this.setState({topic: this.state.topic.title});
    //    titles = this.state.topic.title;
    //    console.log(titles);
    //  }

  static  contextTypes = {
      router : React.PropTypes.object
    };

    componentDidMount(){
      this.loadDataFromSever();

    //   $.ajax({
    //     url: 'http://localhost:8083/topics/1',
    //     dataType:'application/json',
    //     success: function(data){
    //       this.setState({topics:data})
    //     }.bind(this)
    //   });
    // };
}

loadDataFromSever(){
  // $.ajax({
  //   url: "http://localhost:8083/topics/1",
  //   dataType: 'json',
  //   cache: false,
  //   success: function(data) {
  //            this.setState({topic: data});
  //   }.bind(this),
  //
  //   error: function(xhr, status, err) {
  //     console.error("http://localhost:8083/topics/1", status, err.toString());
  //   }.bind(this)
  // });

    // $.ajax({
    //        url: "http://localhost:8083/topics/1",
    //         dataType: 'json',
    //         type: 'GET',
    //         cache: false,
    //         success: function(data) {
    //         console.log(data);
    //           this.setState({topics: data});
    //        }.bind(this),
    //        error: function(xhr, status, err) {
    //           console.error("http://localhost:8083/topics/1", status, err.toString());
    //         }.bind(this)
    //       });
          };

  	render(){

 //       var allTheTopics = [];
 //        var topics2 = 	topics.map(function(topic)
 // 		{
 // 			return(
 // 			 <ul style ={liStyle} >
 //
 // 				 <li key={topic.id}>
 // 				 <div className="row">
 // 				 <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
 // 					 <Avatar
 // 					 src={topic.avatarImg}
 // 					 size = {90}
 // 					 />
 // 				 </div>
 // 				 <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
 // 					 {topic.title}
 // 					 <br/>
 // 					 {topic.subtitle}
 // 				 </div>
 // 				 </div>
 // 				 <div>
 // 					 <CardMedia >
 // 						 <img  src={topic.img}/>
 // 					 </CardMedia>
 // 				 </div>
 // 				 </li>
 //
 // 			 </ul>
 //  );
 //
 //  }
 // )
    return(
      <div>
      <Card>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <CardHeader style={hStyle}
                    title={topicName}
                    subtitle={topicDescription}
                    avatar="http://lorempixel.com/200/200/nature/"
                    />
                </div>
              </div>
              <CardMedia>
                <img
                src={topicIcon} />
              </CardMedia>
              <br/>
          <Divider />
          <br/>
          <div>

            <div className="row">

              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <RaisedButton
                style={btnStyle}
                label="Play" />
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <RaisedButton
                onClick={this.tick.bind(this)}
                style={btnStyle}
                label="Follow"/>
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <RaisedButton
              style={btnStyle}
              label="+Fav" />
              </div>

              <br/>
              <Divider />

            </div>

            <br/>
            <Divider/>



            <div className="row">

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={statsStyle}>
                <h4 style={factStyle}>Your Level</h4>
                <h2>1</h2>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={statsStyle}>
                <h4 style={factStyle} onClick={this.tick.bind(this)}>Followers</h4>
                <h2>{this.state.count}</h2>
                </div>
                <br/>
                <Divider />

            </div>

          </div>
      </Card>
      </div>
    );


  }

  }
