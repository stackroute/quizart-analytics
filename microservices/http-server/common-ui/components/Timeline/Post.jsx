import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

export default class Post extends React.Component{

  constructor(props){
    super(props);

   }

  render() {
    var key =1;
    var iconStyle = {marginLeft:30};
    var cardStyle = {boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 4px',zIndex :1,marginTop:20}

    return (
       <div>
       <div style={cardStyle}>
            <div>
                <span><Avatar
                      src={this.props.post.imgUrl}
                      size={40}
                    />
                    <p style={{display:"inline",paddingLeft:10}}>{this.props.post.user}</p>

               </span>
            <div>
            <p>{this.props.post.text}</p>               {/*post*/}
            </div>

          </div>
           <div>

          </div>

          </div>
       </div>
    );
  }
}
