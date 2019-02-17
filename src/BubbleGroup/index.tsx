import * as React from 'react';
import BubbleGroupInterface from './interface';
import DefaultChatBubble from '../ChatBubble';
import Message from '../Message';
import styles from './styles';
import Avatar from '@material-ui/core/Avatar'
import * as moment from 'moment'

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

    const messageNodes = messages.map((message, index) => {
      return (
        <ChatBubble
          key={index}
          index={index}
          message={message}
          bubblesCentered={bubblesCentered}
          bubbleStyles={bubbleStyles}
        />
      );
    });
    let sampleAvaImgSrc = 'https://material-ui.com/static/images/avatar/1.jpg';
    return (
      <div style={styles.chatbubbleWrapper}>
        {showSenderName &&
          ((senderName || sampleMessage.senderName) !== '' &&
            (sampleMessage.id !== 0 && (
              <div>
                <Avatar style={{ ...sampleMessage.avatarStyle, float: 'left', margin: '0 10px' }} src={sampleMessage.avatarSrc || 'https://material-ui.com/static/images/avatar/1.jpg'} />
                <h5 style={styles.bubbleGroupHeader}>
                  {senderName || sampleMessage.senderName} - {(sampleMessage.time) ? moment(sampleMessage.time).format('hh:mm A') : {}}
                </h5>
              </div>
            )))}
        {showSenderName &&
          ((senderName || sampleMessage.senderName) !== '' &&
            (sampleMessage.id === 0 && (
              <div>
                <Avatar style={{ ...sampleMessage.avatarStyle, float: 'right', margin: '0 10px' }} src={sampleMessage.avatarSrc || 'https://material-ui.com/static/images/avatar/1.jpg'} />
                <h5 style={styles.myGroupHeader}>
                  Me - {(sampleMessage.time) ? moment(sampleMessage.time).format('hh:mm A') : {}}
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
