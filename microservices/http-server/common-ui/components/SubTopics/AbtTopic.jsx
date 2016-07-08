import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


import Add from './Add';


  var topicsData =[{
    title: "Cricket",
    subtitle: "Let's play a cricket quiz",
    avatarImg: './img/topic/avtar.jpg',
    img: './img/topic/main.jpg',
    category: "Sports"
  },
  {
    title: "WorldWars",
    subtitle: "Let's play a history quiz",
    avatarImg: './img/topic/waravtar.jpg',
    img: './img/topic/warmain.jpg',
    category: "History"
  },
  {
    title: "Hollywood",
    subtitle: "Let's play celeb quiz",
    avatarImg: './img/topic/hlavtar.jpg',
    img: './img/topic/hlmain.jpg',
    category: "Celebreties"
  },
  {
    title: "IndianCelebs",
    subtitle: "Let's play a celeb quiz",
    avatarImg: './img/topic/inavtar.jpg',
    img: './img/topic/inmain.jpg',
    category: "Celebreties"
  },
  {
    title: "PoliticalCelebs",
    subtitle: "Let's play a celeb quiz",
    avatarImg: './img/topic/poavtar.jpg',
    img: './img/topic/plmain.jpg',
    category: "Celebreties"
  }
  ];

  var counts = [];
  var count;

  const style = {
  	float : "left",
  	margin : "auto"
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

  const feedImg = {
  	marginTop: "5%",
  	marginBottom : "5%"
  };

  const feedBtnStyle = {
  	backgroundColor : "#00bcd4",
  	color : "#fff",
  	marginBottom:"4%",
  	width : "95%"
  };

  var feedBtn = {
  	textAlign : "-webkit-center"
  };

  const feedStyle = {
  	margin : "2% auto"
  };

  const feedTitleStyle ={
  	textAlign : "-webkit-center",
  };

  export default class AbtTopic extends React.Component {

    constructor(props,context) {
      super(props,context);
      context.router;

  	this.state = {
          count: this.props.initialCount
  	};
  };


    static propTypes = { initialCount: React.PropTypes.number };
    static defaultProps = { initialCount: 0 };

    static initialState(props) {
      return { count: this.state.count };
    }

 tick() {
   this.setState({count: this.state.count + 1});
   counts.push(count);
   console.log(counts);
 }


  static  contextTypes = {
      router : React.PropTypes.object
    };

    componentDidMount(){
      // $.ajax({
      //   url: this.props.urls,
      //   dataType:'json',
      //   success: function(data){
      //     this.setState({topics:data})
      //   }.bind(this)
      // });
    };

    componentWillMount(){
      var outerThis =this;
       var topics=[];
        API.getAllTopics(function(data){
           this.setState({topicsData:data});
           this.state.topicsData.forEach(function(subtopic){
             if(subtopic.title.toLowerCase().indexOf(outerThis.props.topic.title.toLowerCase())!==-1)
             topics.push(subtopic);
           });
           this.setState({subtopics:topics});
       }.bind(this));
     };

  	render(){
  		return (
        <div className="container" style={feedStyle}>
          <div className="row">
            <Card>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <CardHeader style={hStyle}
                    title={this.props.subtopics}
                    subtitle={this.props.topicsData}
                    avatar="http://lorempixel.com/200/200/nature/"
                    />
                </div>
              </div>
              <CardMedia>
                <img
                src="http://lorempixel.com/600/337/nature/" />
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
                label="Add to Favorites" />

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
        </div>

  		);
  	}
  }
