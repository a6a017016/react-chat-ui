import * as React from 'react';
import ChatBubbleProps from './interface';
import styles from './styles';

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {},
};

export default class ChatBubble extends React.Component {
  props;

  constructor(props: ChatBubbleProps) {
    super(props);
  }

  public render() {
    const { bubblesCentered } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
          ...styles.chatbubble,
          ...bubblesCentered ? {} : styles.chatbubbleOrientationNormal,
          ...chatbubble,
          ...userBubble,
        }
        : {
          ...styles.chatbubble,
          ...styles.recipientChatbubble,
          ...bubblesCentered
            ? {}
            : styles.recipientChatbubbleOrientationNormal,
          ...chatbubble,
          ...userBubble,
        };

    let finalChatBubbleStyles = chatBubbleStyles
    if (this.props.index !== 0 && this.props.message.id === 0) {
      finalChatBubbleStyles = {
        ...chatBubbleStyles,
        ...styles.right40
      }
    } else if (this.props.index !== 0 && this.props.message.id !== 0) {
      finalChatBubbleStyles = {
        ...chatBubbleStyles,
        ...styles.left40
      }
    }
    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
        }}
      >
        <div style={finalChatBubbleStyles}>
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
      </div>
    );
  }
}

export { ChatBubbleProps };
