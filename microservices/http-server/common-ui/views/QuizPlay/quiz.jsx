var React = require('react');
var Slider = require('react-slick');
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import {PropTypes} from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ProgressBar from './progressBar';
import Timer from './timer';
import CircularProgress from 'material-ui/CircularProgress';
import cookie from 'react-cookie';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import base64 from 'base-64';
import restUrl from '../../restUrl'

const optionStyle = {
  margin:12,
  width:'100%'
}

import {
blue300,
cyan500,
blue600,
green600,
indigo900,
orange200,
orange600,
deepOrange500,
pink400,
grey100,
purple500,
} from 'material-ui/styles/colors';

const styles = {
  waiting: {
    "text-align": "center",
    "margin":"auto",
  }
}

export default class QuizPlay extends React.Component{
  constructor() {
    super();
    this.state = { waiting: true }
  }

  static get contextTypes(){
    return {
      router: PropTypes.object.isRequired,
      socket: PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.context.socket.on('authentication',(msg) => {
      this.context.socket.emit('playGame',{topicId: 'sports'});
    });
    this.context.socket.on('queued', (msg) => {
      this.setState({waiting: true});
    });
    this.context.socket.on('gameId', function(gameId) {
      localStorage.gameId = gameId;
      this.setState({waiting: false});
    });
    this.context.socket.on('nextQuestion', (msg) => {
      this.setState({question: msg.question});
    });
    this.context.socket.on('gameComplete', function(leaderboard) {
      alert('Game Completed');
    });
    this.context.socket.emit('authenticate',localStorage.token);
  }

  render() {
    const username = JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub;

    const question = <small>{this.state.question}</small>

    return (
      <div style={styles.waiting}>
        <h2>Waiting for opponents</h2>
        <CircularProgress />
        <p>{question}</p>
      </div>
    );
  }
}
