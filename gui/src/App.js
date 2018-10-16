import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      transcriptions: []
    }
  }

  componentDidMount() {
    let fetchData = () => {
      let new_data = require('./transcription.json');
      if (new_data.length != this.state.transcriptions.length) {
        this.fill_state(new_data);
      }
    }

    fetchData();
    this.update = setInterval(fetchData, 2000)
  }

  fill_state(d) {
    let new_transcriptions = [];
    for(var i = 0; i < d.length; i ++) {
      let m = new Message( {id: d[i]['person'], message: d[i]['msg']})
      if (d[i]['person'] == 0) {
        m['senderName'] = 'Operator'
      }else {
        m['senderName'] = 'Inringande'
      }
      new_transcriptions.push(m);
    };
    this.setState({transcriptions: new_transcriptions});
  }

  render() {
    console.log(this.state.transcriptions)
    return (
      <div className="App">
        <ChatFeed
          messages={ this.state.transcriptions } // Boolean: list of message objects
          isTyping={false} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
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
                padding: 40
              }
            }
          }
    />
      </div>
    );
  }
}

export default App;
