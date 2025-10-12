import express from 'express';
import CampaignController from '../controllers/campaignController.js';

const router = express.Router();
const campaignController = new CampaignController();

router.post('/', campaignController.createCampaign.bind(campaignController));
router.get('/:uid', campaignController.getCampaignByUid.bind(campaignController));
router.get('/user/:userUid', campaignController.getCampaignByUserUid.bind(campaignController));
router.put('/:uid', campaignController.updateCampaign.bind(campaignController));
router.delete('/:uid', campaignController.deleteCampaign.bind(campaignController));

export default router;

