import SheetService from "../services/sheetService.js";

class SheetController {
    constructor() {
        this.sheetService = new SheetService();
    }

    async createSheet(req, res) {
        const { userUid, name, characterClass, level, race, alignment, background, attributes, skills, hp, ac, speed, initiative, inventory, spells, features, notes } = req.body;
        const uid = req.headers["x-sheet-uid"]; // Assuming UID for the sheet is passed in header or generated

        if (!userUid) {
            return res.status(400).json({ message: "UID do usuário é obrigatório para criar uma ficha." });
        }

        try {
            const newSheetData = {
                uid: uid || Date.now().toString(), // Simple UID generation if not provided
                userUid,
                name,
                characterClass,
                level,
                race,
                alignment,
                background,
                attributes,
                skills,
                hp,
                ac,
                speed,
                initiative,
                inventory,
                spells,
                features,
                notes
            };
            const result = await this.sheetService.createSheet(newSheetData);
            return res.status(201).json({ message: "Ficha criada com sucesso!", sheet: result });
        } catch (error) {
            console.error("[SheetController::createSheet]:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getSheetByUid(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID da ficha inválido." });
        }

        try {
            const sheet = await this.sheetService.getSheetByUid(uid);
            return res.status(200).json({ sheet });
        } catch (error) {
            console.error("[SheetController::getSheetByUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async getSheetBySessionUid(req, res) {
        const { sessionUid } = req.params;

        if (!sessionUid) {
            return res.status(400).json({ message: "UID da sessão inválido." });
        }

        try {
            const sheets = await this.sheetService.getSheetBySessionUid(sessionUid);
            return res.status(200).json({ sheets });
        } catch (error) {
            console.error("[SheetController::getSheetBySessionUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async getSheetByUserUid(req, res) {
        const { userUid } = req.params;

        if (!userUid) {
            return res.status(400).json({ message: "UID do usuário inválido." });
        }

        try {
            const sheets = await this.sheetService.getSheetByUserUid(userUid);
            return res.status(200).json({ sheets });
        } catch (error) {
            console.error("[SheetController::getSheetByUserUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async updateSheet(req, res) {
        const { uid } = req.params;
        const sheetData = req.body;

        if (!uid || !sheetData) {
            return res.status(400).json({ message: "Dados inválidos para atualização da ficha." });
        }

        try {
            const updatedSheet = await this.sheetService.updateSheet(uid, sheetData);
            return res.status(200).json({ message: "Ficha atualizada com sucesso!", sheet: updatedSheet });
        } catch (error) {
            console.error("[SheetController::updateSheet]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async deleteSheet(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID da ficha inválido." });
        }

        try {
            const result = await this.sheetService.deleteSheet(uid);
            return res.status(200).json(result);
        } catch (error) {
            console.error("[SheetController::deleteSheet]:", error);
            return res.status(404).json({ message: error.message });
        }
    }
}

export default SheetController;

