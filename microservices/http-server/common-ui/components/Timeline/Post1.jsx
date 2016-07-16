import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';


const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
var flag;
var data;
export default class Post extends React.Component{

  constructor(props){
    super(props);
    this.state = {value:"",data:null,flag:false}

  }

  handleValueChange(e) {
    this.setState({value: e.target.value});
  }
  // handling comments submit

  handleKeyDown(e) {
    if(e.keyCode === 13) {
      this.props.submitComment(this.state.value,this.props.postData.id);
        this.setState({value:""});
    }
  }

handleDelete(){
 this.props.deletePost(this.props.postData) ;

}

YoutubeComponent(){
               console.log("=====called");

               var r = this.props.postData.text.match(rx);

               $.getJSON("https://www.googleapis.com/youtube/v3/videos",{
                 key: "AIzaSyD15jSXoEadq5xCDP4fXSyhIcEST7SqUlk",
                 part: 'snippet,statistics',
                 regionCode:'in',
                 id: r[1]
                },function(data) {
                   console.log("======data",data);
                   var Data  =data;

                }).fail(function(jqXHR, textStatus, errorThrown) {
                 return null;
          }));
}

  render() {


    var key =1;
    var iconStyle = {marginLeft:30};
    var cardStyle = {boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 4px',zIndex :1,marginTop:20}
    //console.log("post...."+this.props.comments);
    var that = this;

    if(this.props.postData.text.match(rx)!=null){
      console.log(this.YoutubeComponent());
    }
    var comments = this.props.comments.map(function(comment) {
      //console.log("ccc"+comment);
      return (
             <div style ={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',zIndex :1,backgroundColor:"#f3f4f5",marginTop:10}}>
             <div>
               <span><Avatar
                    src="http://lorempixel.com/100/100/nature/"
                    size={30}
                />
                <p style={{display:"inline",paddingLeft:10}}>Sandeep</p>

             </span>

           <p>{comment.cdata}</p>               {/*comment*/}
       </div>
        <div>
          <span style={iconStyle}><FontIcon className="muidocs-icon-action-thumb-up"/></span>

       </div>
        </div>
    )

    });

    return (
       <div>
       <div style={cardStyle}>
            <div>
                <span><Avatar
                      src={this.props.postData.imgUrl}
                      size={40}
                    />
                    <p style={{display:"inline",paddingLeft:10}}>{this.props.postData.user}</p>

                </span>
               <span style={{float:"right"}}><FontIcon className="muidocs-icon-content-clear" onTouchTap={this.handleDelete.bind(this)}/></span>
               <div>
                 <p>{this.props.postData.text}</p>

                  {
                     Data.map(function(data){
                       <div>
                            <img src={this.props.data.items[0].snippet.thumbnails.medium.url}
                              width ={this.props.data.items[0].snippet.thumbnails.medium.width}
                             height={this.props.data.items[0].snippet.thumbnails.medium.height}
                             />
                              <h1>{this.props.data.items[0].snippet.title}</h1>
                              <p>{this.props.data.items[0].snippet.description}</p>
                      </div>

                     })

                  }

                </div>

          <div>
            <span style={iconStyle}><FontIcon className="muidocs-icon-action-thumb-up"/></span>

          </div>
             <div  style={{marginLeft:100}}>
              {comments}
             </div>
         {/* <div style={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',marginLeft:100}}>
              <div style={{border:"2px",color:"black",paddingTop:10}}>
              <TextField
               fullWidth={true}
               hintText="Comment"
               value={this.state.value}
               onKeyDown={this.handleKeyDown.bind(this)}
               onChange={this.handleValueChange.bind(this)}
               id = "comment"

             />
             </div>
          </div> */}
          </div>
       </div>
       </div>
    );
  }
}
