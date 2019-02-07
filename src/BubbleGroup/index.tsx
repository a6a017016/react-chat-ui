import * as React from 'react';
import BubbleGroupInterface from './interface';
import DefaultChatBubble from '../ChatBubble';
import Message from '../Message';
import styles from './styles';
import { Avatar } from 'antd'

export default class BubbleGroup extends React.Component {
  props;

  constructor(props: BubbleGroupInterface) {
    super(props);
  }

  /**
   * Parses and collects messages of one type to be grouped together.
   * @return {messageNodes} - a JSX wrapped group of messages
   */
  renderGroup(messages: [Message], id: number) {
    const {
      bubblesCentered,
      bubbleStyles,
      showSenderName,
      chatBubble,
      senderName,
    } = this.props;
    const ChatBubble = chatBubble || DefaultChatBubble;
    const sampleMessage = messages[0];

    const messageNodes = messages.map((message, i) => {
      return (
        <div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <ChatBubble
            key={i}
            message={message}
            bubblesCentered={bubblesCentered}
            bubbleStyles={bubbleStyles}
          />
        </div>
      );
    });

    return (
      <div style={styles.chatbubbleWrapper}>
        {showSenderName &&
          ((senderName || sampleMessage.senderName) !== '' &&
            (sampleMessage.id !== 0 && (
              <h5 style={styles.bubbleGroupHeader}>
                {senderName || sampleMessage.senderName}
              </h5>
            )))}
        {showSenderName &&
          ((senderName || sampleMessage.senderName) !== '' &&
            (sampleMessage.id === 0 && (
              <div style={{ overflow: 'auto' }}>
                <h5 style={styles.myGroupHeader}>
                  Me
              </h5>
              </div>
            )))}
        {messageNodes}
      </div>
    );
  }

  render() {
    const { messages, id } = this.props;
    return this.renderGroup(messages, id);
  }
}
