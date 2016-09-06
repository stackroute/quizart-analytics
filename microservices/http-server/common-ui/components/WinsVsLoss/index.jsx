import React from 'react';
import MainAppBar from '../../components/MainAppBar';
import Dashboard from '../../components/dashboard';
import NavBar from '../../components/NavBar';
// import TabsMobile from '../../components/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import MediaQuery from 'react-responsive';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import SubTopicContainer from '../../components/SubTopics/SubTopicContainer';
import restUrl from '../../restUrl';
import TabsMobile from '../../components/Tabs';
import LinearProgress from 'material-ui/LinearProgress';
import {red500,blue50,cyan900,teal200} from 'material-ui/styles/colors';

const tdstyle={
padding:"10px"
};
var baseurl='/';

export default class WinsVsLoss extends React.Component {

  constructor(props){
    super(props);
    this.state={   details: [
    {
      "wins": 772,
      "loss": 860
    },
    {
      "wins": 840,
      "loss": 846
    },
    {
      "wins": 373,
      "loss": 676
    },
    {
      "wins": 546,
      "loss": 984
    },
    {
      "wins": 318,
      "loss": 724
    },
    {
      "wins": 849,
      "loss": 286
    },
    {
      "wins": 864,
      "loss": 850
    },
    {
      "wins": 132,
      "loss": 794
    },
    {
      "wins": 906,
      "loss": 975
    },
    {
      "wins": 911,
      "loss": 765
    }
  ]}};

add(x,y){
  x=((x/(x+y))*100);
  return x;
};

  render() {

  return (
               <Card zDepth={3}>
                    <CardTitle title="Badges" titleColor={cyan900}/>
                   <CardText>
                   <center>
                    <div className="row">            
                        <div className="col-lg-6 col-sm-12 col-xs-12 col-lg-6 col-md-offset-4" style={{margin:'30px 0 30px 0',marginBottom:'30px', textAlign:'right'}}>
                          <LinearProgress mode="determinate" value={this.add(this.state.details[3].wins,this.state.details[5].loss)} style={{height:'30px',width:'300px'}}/>
                          </div>    
                          <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6" style={{margin:'30px 0 30px 0',textAlign:'left'}}>
                          <span style={{height:'10%',width:'100%',float:'right'}}>Win vs Loss Progress</span>
                      </div>
                    </div>
                    </center>
                    </CardText>
                </Card>
            );
  }
};