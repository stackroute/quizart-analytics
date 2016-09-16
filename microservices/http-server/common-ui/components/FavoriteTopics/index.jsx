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
import {red500,blue50,cyan900} from 'material-ui/styles/colors';


var baseurl='/';

export default class FavoriteTopics extends React.Component {
    getInitialState() {
        return 
        arr:[]      
    };
    componentDidMount() {
        var request = $.ajax({
          url: restUrl + '/api/favouritetopics/user/'+this.props.userid,
          type: 'GET',
        });
        request.done(function(data1) {
            var chart = new CanvasJS.Chart("chartContainer",
        {

            title:{
                text: "Topics"
            },
            animationEnabled: true,
            legend:{
                verticalAlign: "bottom",
                horizontalAlign: "center"
            },
            data: [
            {        
                indexLabelFontSize: 20,
                indexLabelFontFamily: "Monospace",       
                indexLabelFontColor: "darkgrey", 
                indexLabelLineColor: "darkgrey",        
                indexLabelPlacement: "outside",
                type: "pie",       
                showInLegend: true,
                toolTipContent: "{y} - <strong>#percent%</strong>",
                dataPoints: data1
            }   
            ]
        });
        chart.render();
          console.log(JSON.stringify(data));
          this.setState({arr: data});
          console.log(JSON.stringify(this.state.arr));
          console.log("Type of data is", typeof data, typeof this.state.arr);
        }.bind(this));
            request.fail(function() {
          console.error('err');
      }.bind(this));


        
    };
    

    render() {
      return (
         <Card  style={{height:'500px',marginBottom:'20px'}} zDepth={3}>
         <CardTitle title="Topics" titleColor={cyan900}/>
         <CardText><div id="chartContainer"/></CardText>
         </Card>
         );
    };
};