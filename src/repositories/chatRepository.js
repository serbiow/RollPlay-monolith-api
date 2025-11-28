import { db } from '../config/firebase.js';
import ChatMessage from '../models/chatMessageModel.js';

class ChatRepository {
  constructor() {
    this.collection = db.collection('chat');
  }

  async createMessage(chatMessage) {
    const docRef = this.collection.doc();
    await docRef.set(chatMessage.toFirestore());
    return { uid: docRef.id, ...chatMessage.toFirestore() };
  }

  async getMessagesByCampaignUid(campaignUid) {
    const snapshot = await this.collection
      .where('campaignUid', '==', campaignUid)
      .orderBy('createdAt', 'asc')
      .get();

    return snapshot.docs.map((doc) => ChatMessage.fromFirestore(doc));
  }
}

export default ChatRepository;
