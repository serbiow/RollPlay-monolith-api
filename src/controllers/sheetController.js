import SheetService from "../services/sheetService.js";

class SheetController {
    constructor() {
        this.sheetService = new SheetService();
    }

    async createSheet(req, res) {
        const uidFromHeader = req.headers["x-sheet-uid"]; // opcional
        const body = req.body || {};

        if (!body.userUid) {
            return res.status(400).json({ message: "UID do usuário é obrigatório para criar uma ficha." });
        }

        try {
            const newSheetData = {
                ...body,
                uid: body.uid || uidFromHeader // pode vir do header ou do body; se nenhum vier, será gerado no repositório
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

    async getSheetByCampaignUid(req, res) {
        const { campaignUid } = req.params;
        if (!campaignUid) {
            return res.status(400).json({ message: "UID da sessão inválido." });
        }

        try {
            const sheets = await this.sheetService.getSheetByCampaignUid(campaignUid);
            return res.status(200).json({ sheets });
        } catch (error) {
            console.error("[SheetController::getSheetByCampaignUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }
    async getCampaignSheetByUserToken(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido." });
        }
        
        const { campaignUid } = req.params;
        if (!campaignUid) {
            return res.status(400).json({ message: "UID da sessão inválido." });
        }

        try {
            const sheets = await this.sheetService.getCampaignSheetByUserToken(authHeader, campaignUid);
            return res.status(200).json({ sheets });
        } catch (error) {
            console.error("[SheetController::getCampaignSheetByUserToken]:", error);
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

    async getSheetByUserToken(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        try {
            const sheets = await this.sheetService.getSheetByUserToken(authHeader);
            return res.status(200).json({ sheets });
        } catch (error) {
            console.error("[SheetController::getSheetByUserToken]:", error);
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
