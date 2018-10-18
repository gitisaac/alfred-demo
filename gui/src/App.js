import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import SplitterLayout from 'react-splitter-layout';
import { IoLogoTux } from 'react-icons/io';

//import '@material/react-top-app-bar/dist/top-app-bar.css';
//import '@material/react-material-icon/dist/material-icon.css';
//import TopAppBar from '@material/react-top-app-bar';
//import MaterialIcon from '@material/react-material-icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      transcriptions: [],
      bigpopa: []
    }
  }

  componentDidMount() {
    this.scrollToBottom();
    let fetchData = () => {
      let new_data = require('./transcription.json');
      if (new_data.length != this.state.transcriptions.length) {
        this.fill_state(new_data);
      }
    }

    fetchData();
    this.update = setInterval(fetchData, 1000)
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView(false, { behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  fill_state(d) {
    let new_transcriptions = [];
    let new_suggestions = [];
    for(var i = 0; i < d.length; i ++) {
      let m = new Message( {id: d[i]['person'], message: d[i]['msg']})
      if (d[i]['person'] == 0) {
        m['senderName'] = 'Operator'
      }else {
        m['senderName'] = 'Inringande'
      }
      new_transcriptions.push(m);

      if (d[i]['msg'].includes('Addisons')) {
        let newPopa = new Message({id: 0, message: "Notera: \n Addisons sjukdom \n - autoimun sjukdom"});
        new_suggestions.push(newPopa);
        let newPopaMore = new Message({id: 0, message: "Fråga om: \n - kortisolanvändning \n - kräkning/illamående"});
        new_suggestions.push(newPopaMore);
      }else if (d[i]['msg'].includes('kräk')) {
        let anotherOne = new Message({id: 0, message: "Kräkning har förekommit"});
        new_suggestions.push(anotherOne);
        let prio_1 = new Message({id: 0, message: "Prio 1 larm"});
        new_suggestions.push(prio_1)
      }
    };
    this.setState({transcriptions: new_transcriptions, bigpopa: new_suggestions});
  }

  render() {
    console.log(this.state.transcriptions)
    return (
      <SplitterLayout>
        <div className="App">
          <ChatFeed
            messages={ this.state.transcriptions } // Boolean: list of message objects
            isTyping={false} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName={true} // show the name of the user who sent the message
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={
              {
                text: {
                  fontWeight: 'bold',
                  fontSize: 30
                },
                chatbubble: {
                  borderRadius: 70,
                  padding: 30
                }
              }
            }
          />
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el }}>
          </div>
        </div>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                ALFRED
              </Typography>
            </Toolbar>
          </AppBar>
          <ChatFeed
            messages={ this.state.bigpopa } // Boolean: list of message objects
            isTyping={false} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName={true} // show the name of the user who sent the message
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={
              {
                text: {
                  fontWeight: 'bold',
                  fontSize: 25
                },
                chatbubble: {
                  backgroundColor: '#0000A0',
                  borderRadius: 70,
                  padding: 40
                }
              }
            }
          />
        </div>
    </SplitterLayout>
    );
  }
}
/*
<div className="App" style={{border: "1px solid black"}}>
  <TopAppBar
    title='ALFRED'
    navigationIcon={<MaterialIcon
      icon='AI'
      onClick={() => console.log('click')}
    />}
  >
  </TopAppBar>

    HELLO WORLD
</div>
*/

export default App;
