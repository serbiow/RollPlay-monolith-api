import express from 'express';
import SheetController from '../controllers/sheetController.js';

const router = express.Router();
const sheetController = new SheetController();

router.post('/', sheetController.createSheet.bind(sheetController));
router.get('/campaign/:campaignUid', sheetController.getSheetByCampaignUid.bind(sheetController));
router.get('/user/:userUid', sheetController.getSheetByUserUid.bind(sheetController));
router.get('/:uid', sheetController.getSheetByUid.bind(sheetController));
router.patch('/:uid', sheetController.updateSheet.bind(sheetController));
router.delete('/:uid', sheetController.deleteSheet.bind(sheetController));

export default router;
