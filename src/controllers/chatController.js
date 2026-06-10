import ChatService from '../services/chatService.js';

class ChatController {
  constructor() {
    this.chatService = new ChatService();
  }

  async getMessages(req, res) {
    const { campaignUid } = req.params;
    const limitParam = parseInt(req.query.limit, 10);
    const beforeParam = req.query.before;

    if (!campaignUid) {
      return res.status(400).json({ message: 'campaignUid é obrigatório.' });
    }

    const limit = Number.isInteger(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 50;
    let before = null;

    if (beforeParam) {
      before = new Date(beforeParam);
      if (Number.isNaN(before.getTime())) {
        return res.status(400).json({ message: 'before inválido.' });
      }
    }

    try {
      const messages = await this.chatService.listMessages(campaignUid, limit, before);
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
