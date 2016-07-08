import React from 'react';
import MainAppBar from '../../components/MainAppBar';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import AbtTopic from '../../components/AbtTopic';
import MediaQuery from 'react-responsive';

export default class EachTopicsPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <NavBar />
            </div>
        </div>

        <MediaQuery query='(min-device-width: 992px)'>
              <MediaQuery query='(min-width: 992px)'>

              <div className="row">
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <AbtTopic/>
              </div>
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              </div>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <ChatDrawer/>
              </div>
              </div>

              </MediaQuery>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 992px)'>
              <MediaQuery query='(max-width: 992px)'>
                  <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <AbtTopic />
                  </div>
                  </div>
                  <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  </div>
                  </div>
              </MediaQuery>
            </MediaQuery>


      </div>
    );
  }
}
