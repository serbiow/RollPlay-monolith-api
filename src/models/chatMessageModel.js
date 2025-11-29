class ChatMessage {
  constructor(
    uid,
    campaignUid,
    senderId,
    senderName,
    content,
    type = 'text',
    createdAt = new Date()
  ) {
    this.uid = uid;
    this.campaignUid = campaignUid;
    this.senderId = senderId;
    this.senderName = senderName;
    this.content = content;
    this.type = type;
    this.createdAt = createdAt;
  }

  toFirestore() {
    return {
      campaignUid: this.campaignUid,
      senderId: this.senderId,
      senderName: this.senderName,
      content: this.content,
      type: this.type,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new ChatMessage(
      snapshot.id,
      data.campaignUid,
      data.senderId,
      data.senderName,
      data.content,
      data.type,
      data.createdAt
    );
  }
}

export default ChatMessage;
