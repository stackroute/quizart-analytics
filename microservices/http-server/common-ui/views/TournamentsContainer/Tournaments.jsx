import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TournamentSubCard from './TournamentSubCard';
import TournamentSubCard1 from './TournamentSubCard1';

import restUrl from '../../restUrl';

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const tour_header={
  margin:20,
  textAlign:'center',
  paddingTop:20,
}

export default class Tournaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTournament: [],
      completedTournament: [],
    };
  }

  componentDidMount(){
    var request = $.ajax({
      url: restUrl + '/api/v1/tournaments',
      type: 'GET',
    });
    request.done(function(data) {
      console.log(JSON.stringify(data));
      var active = [];
      var completed = [];
      for(var i=0;i<data.length;i++) {
        if(data[i].isComplete=='false' || data[i].isComplete==false) {
          active.push(data[i]);
        }
      }
      for(var i=0;i<data.length;i++) {
        var levels = data[i].levels;
        var currentLevel = -1;
        for(var j=0;j<levels.length;j++) {
          if(levels[j].active=='yes') {
            currentLevel = j;
            break;
          }
        }
        if(currentLevel==-1) {
          currentLevel = levels.length;
        }
        if(currentLevel>0) {
          completed.push(data[i]);
        }
      }
      console.log('Avtive: '+JSON.stringify(active));
      console.log('Completed: '+JSON.stringify(completed));
      this.setState({
        activeTournament: active,
        completedTournament: completed,
      });
    }.bind(this));
    request.fail(function() {
      console.error('TournamentsContainer error');
    }.bind(this));
  }

  render() {
    var activeTournaments = [];
    var completedTournaments = [];
    for (var i = 0; i < this.state.activeTournament.length; i++) {
      activeTournaments.push(
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" style={{paddingTop: '16px', paddingBottom: '16px'}}>
          <TournamentSubCard tournament={this.state.activeTournament[i]}/>
        </div>
      );
    }
    for (var i = 0; i < this.state.completedTournament.length; i++) {
      completedTournaments.push(
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" style={{paddingTop: '16px', paddingBottom: '16px'}}>
          <TournamentSubCard1 tournament={this.state.completedTournament[i]}/>
        </div>
      );
    }
    return (
      <div>
        <div>
          <Paper style={style} zDepth={2} >
            <Card>
            <h1 style={tour_header}>Active Tournaments</h1>
              <div className='row'>
                {activeTournaments}
              </div>
            </Card>
          </Paper>
        </div>
        <div>
          <Paper style={style} zDepth={2} >
            <Card>
            <h1 style={tour_header}>Completed Tournaments</h1>
            <div className='row'>
              {completedTournaments}
            </div>
            </Card>
          </Paper>
        </div>
      </div>
    )
  }
}
