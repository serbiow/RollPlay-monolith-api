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

  async getMessagesByCampaignUid(campaignUid, limit = 50, before = null) {
    const buildTimestamp = (value) => {
      if (!value) return null;
      return value.toMillis ? value.toMillis() : new Date(value).getTime();
    };

    const sortDesc = (a, b) => buildTimestamp(b.createdAt) - buildTimestamp(a.createdAt);

    const applyBeforeFilter = (messages) => {
      if (!before) return messages;
      const beforeMillis = buildTimestamp(before);
      return messages.filter((message) => buildTimestamp(message.createdAt) < beforeMillis);
    };

    try {
      let query = this.collection
        .where('campaignUid', '==', campaignUid)
        .orderBy('createdAt', 'desc');

      if (before) {
        query = query.startAfter(before);
      }

      const snapshot = await query.limit(limit).get();
      return snapshot.docs.map((doc) => ChatMessage.fromFirestore(doc));
    } catch (error) {
      if (error.code === 9 || error.message?.includes('requires an index')) {
        console.warn('[ChatRepository] Firestore index required for campaignUid + createdAt query, falling back to in-memory sorting.');

        const fallbackSnapshot = await this.collection.where('campaignUid', '==', campaignUid).get();
        const messages = fallbackSnapshot.docs
          .map((doc) => ChatMessage.fromFirestore(doc))
          .sort(sortDesc);

        return applyBeforeFilter(messages).slice(0, limit);
      }

      throw error;
    }
  }
}

export default ChatRepository;
