
export enum MessageType {
    CHAT = 'CHAT',
    JOINED = 'JOINED',
    LEFT = 'LEFT'
  }
  
  export class ChatMessage {
    type!: MessageType;
    topic!: string;
    content!: string;
    sender!: string;
  }
  