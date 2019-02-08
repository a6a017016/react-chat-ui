// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from 'react';
import BubbleGroup from '../BubbleGroup';
import DefaultChatBubble from '../ChatBubble';
import ChatInput from '../ChatInput';
import Message from '../Message';
import styles from './styles';
import * as moment from 'moment'

// Model for ChatFeed props.
interface ChatFeedInterface {
  props: {
    bubblesCentered?: boolean;
    bubbleStyles?: object;
    hasInputField?: boolean;
    isTyping?: boolean;
    maxHeight?: number;
    messages: any;
    showSenderName?: boolean;
    chatBubble?: React.Component;
  };
}

// React component to render a complete chat feed
export default class ChatFeed extends React.Component {
  props;
  chat: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
  };

  constructor(props: ChatFeedInterface) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.chat.scrollHeight;
    const height = this.chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  /**
   * Determines what type of message/messages to render.
   */
  renderMessages(messages: [Message]) {
    const { isTyping, bubbleStyles, chatBubble, showSenderName } = this.props;

    const ChatBubble = chatBubble || DefaultChatBubble;

    let group = [];

    const messageNodes = messages.map((message, index) => {
      group.push(message);
      // Find diff in message type or no more messages
      if (!messages[index + 1] || messages[index + 1].id !== message.id || new Date(messages[index].time.getTime()).setSeconds(0, 0) !== new Date(messages[index - 1].time.getTime()).setSeconds(0, 0)) {
        const messageGroup = group;
        group = [];
        if (index === 0 || (new Date(messages[index].time.getTime()).setHours(0, 0, 0, 0) !== new Date(messages[index - 1].time.getTime()).setHours(0, 0, 0, 0))) {
          let dateStr = moment(messages[index].time).format('YYYY/MM/DD');
          if (new Date(messages[index].time.getTime()).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
            dateStr = 'Today'
          }
          return (
            <div key={index}>
              <div style={{ textAlign: 'center', padding: 10, backgroundColor: '#D8D8D8', borderRadius: 100, width: 100, margin: "5px auto" }}>{dateStr}</div>
              <BubbleGroup
                key={index}
                messages={messageGroup}
                id={message.id}
                showSenderName={showSenderName}
                chatBubble={ChatBubble}
                bubbleStyles={bubbleStyles}
              />
            </div>
          )
        } else {
          return (
            <BubbleGroup
              key={index}
              messages={messageGroup}
              id={message.id}
              showSenderName={showSenderName}
              chatBubble={ChatBubble}
              bubbleStyles={bubbleStyles}
            />
          );
        }
      }

      return null;
    });

    // Other end is typing...
    if (isTyping) {
      messageNodes.push(
        <div key="isTyping" style={{ ...styles.chatbubbleWrapper }}>
          <ChatBubble
            message={new Message({ id: 1, message: '...', senderName: '' })}
            bubbleStyles={bubbleStyles}
          />
        </div>
      );
    }

    // return nodes
    return messageNodes;
  }

  /**
   * render : renders our chatfeed
   */
  render() {
    const inputField = this.props.hasInputField && <ChatInput />;
    const { maxHeight } = this.props;

    return (
      <div id="chat-panel" style={styles.chatPanel}>
        <div
          ref={c => {
            this.chat = c;
          }}
          className="chat-history"
          style={{ ...styles.chatHistory, maxHeight }}
        >
          <div className="chat-messages">
            {this.renderMessages(this.props.messages)}
          </div>
        </div>
        {inputField}
      </div>
    );
  }
}
