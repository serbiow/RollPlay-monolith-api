import express from 'express';
import CampaignController from '../controllers/campaignController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const campaignController = new CampaignController();

router.get('/user/token', authMiddleware, campaignController.getCampaignByUserToken.bind(campaignController));
router.get('/user/:userUid', authMiddleware, campaignController.getCampaignByUserUid.bind(campaignController));

router.post('/', authMiddleware, campaignController.createCampaign.bind(campaignController));
router.get('/:uid', authMiddleware, campaignController.getCampaignByUid.bind(campaignController));
router.put('/:uid', authMiddleware, campaignController.updateCampaign.bind(campaignController));
router.delete('/:uid', authMiddleware, campaignController.deleteCampaign.bind(campaignController));

export default router;
