import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import restUrl from '../../restUrl'
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import Cookie from 'react-cookie';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
const TitleStyle={
  fontSize:"1em",
    width:"100%",
  fontWeight:"1em"
}
const SubtitleStyle={
  fontSize:"0.8em",
    width:"100%"
}
var style1= {
  margin:"5px",
}
var imgStyle={
  height:"50%",
  margin:"auto"
}
const BtnStylePlay ={
  marginLeft:350
}
const BtnStyleInvite ={
  marginLeft:20
}
var style1= {
  background:'#c6ecc6'
}
var cardDivStyle={
   margin:0,
}
var title1={
    paddingLeft:10,
    paddingTop:10,
    marginBottom:5
}
var title2={
  paddingLeft:10,
  marginTop:10,
  marginBottom:10,
  height:'30px'
}
var title3={
    textAlign:'center',
    margin:'auto',
    width:'60%',
    color:'white'
}
var title4={
     width:"30%",
     margin:'auto'
}
const style_fav={
    width:'5%',
    float:'right',
    marginTop:20
}
const style_followers={
    width:'12%',
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    cursor:'pointer',
    marginTop:20
}
const style_favorite={
    width:'10%',
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    cursor:'pointer',
    marginTop:20
}
const iconStyles = {
  marginRight: 24,
  height:60,
  width:60,
}
const style_players={
  marginRight:20,
  float:'right',
  color:'white',
  }
  const card={
  height:1770,
  overflow:'auto'
  }
  const cover={
    width:'100%'
  }
  const pro={
  marginTop: -120,
  zIndex : 1
  }
  var heading={
    textAlign:'center'    
  }
  const divstyle = {
    borderLeft : 2,
    borderRight : 0,
    borderTop : 0,
    borderBottom : 0,
    borderStyle : 'solid',
    borderColor : 'lightgrey',
    textAlign : 'center',
    color : 'grey',
    
    }
  const divrow={
    marginLeft:10,
    padding: 20,
    paddingLeft:50,
  }
  const imgsize={
    height:400
  }
  const card2={
    marginTop:20,
    marginBottom:20
  }
  const card3={
    textAlign:'center',
    padding:20
  }
  const div1={
    marginRight:60
  }
  const progress={
    height:30,
    width:500,
    textAlign:'center',
    marginLeft:40,
    borderRadius:20,
    marginRight:30,
    marginTop:10
  }
  
  const tableLeft={
    marginLeft:140
  }
  const tableLeft2={
    marginLeft:180
  }
  export default class AbtTopic extends React.Component {
    constructor(){
      super();
      this.state = {
            arr:[{"_id":"Cartoons","topicName":"Cartoons","topicIcon":"https://quizup-questions.imgix.net/topic-icons/retro-cartoons-2014-10-31T11:32:46.062Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"What's up, Mickey?","topicFollowers":9550,"playersPerMatch":3,"topicCategory":"TV","__v":0}],
      }
    };
    handleClike(tId){
      Cookie.save("topicId",tId);
      console.log('function called handleClike');
      this.context.router.push({
        pathname:'/quiz'
      })
    }
    componentDidMount(){
      var request = $.ajax({
      url: restUrl + '/api/v1/topic/'+this.props.id,
      type: 'GET',

      });
      request.done(function(data) {
      console.log(JSON.stringify(data));
      //this.setState({arr: data});
      }.bind(this));
      request.fail(function() {
      console.error('err');
      }.bind(this));
    };
    render(){
      if(this.state.arr === [] || this.state.arr == null || this.state.arr[0] == undefined)
      { return (<div><p>Loading...........</p></div>) }
      else{
      return(
      <div style={{overflow:'auto'}}>
        <Card style={card} zDepth={3}>
            
              <img src="http://covermyfb.com/media/covers/thumb/7117-cartoon-joker.jpg" style={cover}/>
            <center>
              <RaisedButton primary={true} style={{backgroundColor:'#00BFA5'}} label="Invite" onClick={this.handleClike.bind(this,this.props.id)} />
              <Avatar size={200} zDepth={4} style={pro} elevation='10dp' src="https://s-media-cache-ak0.pinimg.com/736x/e4/23/10/e423109129291207253f96582942f4a9.jpg"/>
              <RaisedButton zDepth={1} primary={true} style={{backgroundColor:'#00BFA5'}} label="Play" onClick={this.handleClike.bind(this,this.props.id)} />
            </center>
            <h1 style={heading}>{this.state.arr[0].topicName}</h1>
            <h3 style={heading}>{this.state.arr[0].topicDescription}</h3>
            <Divider style={card2}/>
            
            <div className="row" style={divrow}>
              <div style={div1}>
                <h3 style={heading}>Confidence Level Graph</h3>
                <img src="http://www.mathgoodies.com/lessons/graphs/images/line_example5.jpg" style={imgsize}/>
              </div>
              <div style={divstyle}>
                <h3 style={heading}>Details</h3>
                <div style={{marginLeft:30}}>
                  <table cellPadding='6' style={tableLeft}>
                  <tr><td><h4>Topic category</h4></td><td><h4> : </h4></td><td><h4>{this.state.arr[0].topicCategory}</h4></td></tr>
                  <tr><td><h4>Topic followers</h4></td><td><h4> : </h4></td><td><h4>{this.state.arr[0].topicFollowers}</h4></td></tr>
                  <tr><td><h4>Players per Match</h4></td><td><h4> : </h4></td><td><h4>{this.state.arr[0].playersPerMatch}</h4></td></tr>
                  </table>
                </div>
                <div style={{marginLeft:30}}>
                  <span style={progress}>Win vs Loss Progress</span><LinearProgress mode="determinate" value='70' style={progress}/>
                  <table cellPadding='6' style={tableLeft2}>
                  <tr><td><h4>Total match</h4></td><td><h4> : </h4></td><td><h4>800</h4></td></tr>
                  <tr><td><h4 style={{marginTop:0}}>Experience</h4></td><td><h4 style={{marginTop:0}}> : </h4></td><td><h4 style={{marginTop:0}}>1200</h4></td></tr>
                  </table>
                </div>
              </div>
              
              </div>
            
              <Divider style={card2}/>
              
              <div style={card3}>
              <h1>Leader Board</h1>
              <img src="https://groovehq.s3.amazonaws.com/uploaded/QhGCTT9afow9ZfasyM1j?1429198041"/>
              </div>
        </Card>
        </div>
      );
    }
    }
  }