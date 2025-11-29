import ChatService from '../services/chatService.js';

class ChatController {
  constructor() {
    this.chatService = new ChatService();
  }

  async getMessages(req, res) {
    const { campaignUid } = req.params;

    if (!campaignUid) {
      return res.status(400).json({ message: 'campaignUid é obrigatório.' });
    }

    try {
      const messages = await this.chatService.listMessages(campaignUid);
      return res.status(200).json({ messages });
    } catch (error) {
      console.error('[ChatController::getMessages]', error);
      return res.status(500).json({ message: 'Erro ao buscar mensagens.' });
    }
  }

  async createMessage(req, res) {
    const { campaignUid } = req.params;
    const { content, type, senderId, senderName } = req.body;

    if (!campaignUid || !content || !senderId) {
      return res
        .status(400)
        .json({ message: 'Dados inválidos para mensagem de chat.' });
    }

    try {
      const message = await this.chatService.sendMessage({
        campaignUid,
        content,
        type,
        senderId,
        senderName,
      });

      return res.status(201).json(message);
    } catch (error) {
      console.error('[ChatController::createMessage]', error);
      return res.status(500).json({ message: 'Erro ao enviar mensagem.' });
    }
  }
}

export default ChatController;
