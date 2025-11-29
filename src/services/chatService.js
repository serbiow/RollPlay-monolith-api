import ChatRepository from '../repositories/chatRepository.js';
import ChatMessage from '../models/chatMessageModel.js';

class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
  }

  async listMessages(campaignUid) {
    return this.chatRepository.getMessagesByCampaignUid(campaignUid);
  }

  async sendMessage({ campaignUid, senderId, senderName, content, type }) {
    const chatMessage = new ChatMessage(
      null,                // uid gerado pelo Firestore
      campaignUid,
      senderId,
      senderName,
      content,
      type || 'text',
      new Date()
    );

    return this.chatRepository.createMessage(chatMessage);
  }
}

export default ChatService;
