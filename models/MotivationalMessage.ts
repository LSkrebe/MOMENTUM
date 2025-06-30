export interface MotivationalMessage {
  name: string;
  avatar: any;
  habit: string;
  message: string;
}

export class MotivationalMessageManager {
  private message: MotivationalMessage;

  constructor(initialMessage: MotivationalMessage) {
    this.message = initialMessage;
  }

  getMessage() {
    return this.message;
  }

  setMessage(newMessage: MotivationalMessage) {
    this.message = newMessage;
  }
} 