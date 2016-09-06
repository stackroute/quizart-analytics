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

export default class Badges extends React.Component {

  constructor(props){
    super(props);
    this.state={
      details: [{"img":"https://cohortarrivals.com/assets/feature-icons/thumbs-up-aea4eb708ceddc3473a167418e2c6194.png"},
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

render() {
  var badges = this.state.details.map(function (d) {
            return (
              
                <Avatar src={d.img} size={50}/>
            );
        });
  return (
               <Card  style={{height:'450px'}} zDepth={3}>
                    <CardTitle title="Badges" titleColor={cyan900}/>
                   <CardText>{badges}</CardText>
                   </Card>
            );
  }
};