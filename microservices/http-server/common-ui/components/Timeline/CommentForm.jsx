import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
export default class CommentForm extends React.Component{

  constructor() {
      super();
       this.state = {text: ""};
  }

  handleValueChanged (e) {
    this.setState({value: e.target.value});
  }

  handleKeyDown(e) {
    if(e.keyCode === 13) {
       this.props.newPost(e.target.value);
       this.setState({value:""});
    }
  }

  render () {
    return (
      <Card>
        <CardText>
          <TextField
            hintText="Whats happening in your mind?"
            fullWidth={true}
            onChange={this.handleValueChanged.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            value={this.state.value}
            id = "post"
            disabled= {true}
          />
          <a href="https://twitter.com/intent/tweet?screen_name=quizrtsocial" className="twitter-mention-button" data-show-count="false">Tweet to @quizrtsocial</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  
        </CardText>
      </Card>
    );
  }
}
