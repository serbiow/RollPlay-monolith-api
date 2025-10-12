import express from 'express';
import DiceController from '../controllers/diceController.js';

const router = express.Router();
const diceController = new DiceController();

router.post('/roll', diceController.rollDice.bind(diceController));

export default router;

