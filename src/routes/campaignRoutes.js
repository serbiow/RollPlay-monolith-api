// src/routes/campaignRoutes.js
import express from 'express';
import CampaignController from '../controllers/campaignController.js';
import ChatController from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const campaignController = new CampaignController();
const chatController = new ChatController();

router.get('/user/token', authMiddleware, campaignController.getCampaignByUserToken.bind(campaignController));
router.get('/user/:userUid', authMiddleware, campaignController.getCampaignByUserUid.bind(campaignController));
router.patch('/user/enter', authMiddleware, campaignController.enterCampaign.bind(campaignController));

// CHAT DA CAMPANHA
router.get('/:campaignUid/chat', authMiddleware, chatController.getMessages.bind(chatController));
router.post('/:campaignUid/chat', authMiddleware, chatController.createMessage.bind(chatController));

// CRUD campanha
router.post('/', authMiddleware, campaignController.createCampaign.bind(campaignController));
router.get('/:uid', authMiddleware, campaignController.getCampaignByUid.bind(campaignController));
router.put('/:uid', authMiddleware, campaignController.updateCampaign.bind(campaignController));
router.delete('/:uid', authMiddleware, campaignController.deleteCampaign.bind(campaignController));

export default router;
