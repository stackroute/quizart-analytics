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

  constructor(props){
    super(props);
    this.state={
      details: [{"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"}
                ]
    }
  };

  componentDidMount() {
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
            dataPoints: [
                {  y: 4181563, legendText:"Sherlock", indexLabel: "Sherlock" },
                {  y: 2175498, legendText:"Movies", indexLabel: "Movies" },
                {  y: 3125844, legendText:"Logos",exploded: true, indexLabel: "Logos" },
                {  y: 1176121, legendText:"Sports" , indexLabel: "Sports"},
                {  y: 1727161, legendText:"Cricket", indexLabel: "Cricket" },
                {  y: 4303364, legendText:"General Knowledge" , indexLabel: "General Knowledge"},
                {  y: 1717786, legendText:"Animals" , indexLabel: "Animals"}
            ]
        }
        ]
    });
    chart.render();
  };
    

render() {
  return (
               <Card  style={{height:'500px',marginBottom:'20px'}} zDepth={3}>
                    <CardTitle title="Topics" titleColor={cyan900}/>
                   <CardText><div id="chartContainer"/></CardText>
                   </Card>
            );
  }
};