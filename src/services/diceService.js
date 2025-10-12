class DiceService {
    rollDice(numDice, numSides) {
        if (numDice <= 0 || numSides <= 0) {
            throw new Error("Número de dados e lados deve ser maior que zero.");
        }

        let results = [];
        let total = 0;
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            results.push(roll);
            total += roll;
        }
        return { rolls: results, total: total };
    }
}

export default DiceService;

