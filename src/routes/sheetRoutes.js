import express from 'express';
import SheetController from '../controllers/sheetController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const sheetController = new SheetController();

router.get('/campaign/:campaignUid', authMiddleware, sheetController.getSheetByCampaignUid.bind(sheetController));
router.get('/user/token', authMiddleware, sheetController.getSheetByUserToken.bind(sheetController));
router.get('/user/:userUid', authMiddleware, sheetController.getSheetByUserUid.bind(sheetController));

router.post('/', authMiddleware, sheetController.createSheet.bind(sheetController));
router.get('/:uid', authMiddleware, sheetController.getSheetByUid.bind(sheetController));
router.patch('/:uid', authMiddleware, sheetController.updateSheet.bind(sheetController));
router.delete('/:uid', authMiddleware, sheetController.deleteSheet.bind(sheetController));

export default router;
