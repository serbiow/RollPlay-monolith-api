import DiceService from "../services/diceService.js";

class DiceController {
    constructor() {
        this.diceService = new DiceService();
    }

    async rollDice(req, res) {
        const { numDice, numSides } = req.body;

        if (!numDice || !numSides || typeof numDice !== 'number' || typeof numSides !== 'number') {
            return res.status(400).json({ message: "Número de dados e lados devem ser números válidos." });
        }

        try {
            const result = this.diceService.rollDice(numDice, numSides);
            return res.status(200).json(result);
        } catch (error) {
            console.error("[DiceController::rollDice]:", error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export default DiceController;

