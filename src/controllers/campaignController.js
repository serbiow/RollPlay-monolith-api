import CampaignService from "../services/campaignService.js";

class CampaignController {
    constructor() {
        this.campaignService = new CampaignService();
    }

    async createCampaign(req, res) {
        const { userUid, name, description, players } = req.body;
        const uid = req.headers["x-campaign-uid"]; // Assuming UID for the campaign is passed in header or generated

        if (!userUid || !name) {
            return res.status(400).json({ message: "Dados inválidos para criação de campanha." });
        }

        try {
            const newCampaignData = {
                uid: uid || Date.now().toString(), // Simple UID generation if not provided
                userUid,
                name,
                description,
                players
            };
            const result = await this.campaignService.createCampaign(newCampaignData);
            return res.status(201).json({ message: "Campanha criada com sucesso!", campaign: result });
        } catch (error) {
            console.error("[CampaignController::createCampaign]:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getCampaignByUid(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID da campanha inválido." });
        }

        try {
            const campaign = await this.campaignService.getCampaignByUid(uid);
            return res.status(200).json({ campaign });
        } catch (error) {
            console.error("[CampaignController::getCampaignByUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async getCampaignByUserUid(req, res) {
        const { userUid } = req.params;

        if (!userUid) {
            return res.status(400).json({ message: "UID do usuário inválido." });
        }

        try {
            const campaigns = await this.campaignService.getCampaignByUserUid(userUid);
            return res.status(200).json({ campaigns });
        } catch (error) {
            console.error("[CampaignController::getCampaignByUserUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async getCampaignByUserToken(req, res) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        try {
            const campaigns = await this.campaignService.getCampaignByUserToken(authHeader);
            return res.status(200).json({ campaigns });
        } catch (error) {
            console.error("[CampaignController::getCampaignByUserToken]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async enterCampaign(req, res) {
        const authHeader = req.headers.authorization;
        const { campaignUid } = req.body;

        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        if (!campaignUid) {
            return res.status(400).json({ message: "UID da campanha é obrigatório." });
        }

        try {
            const updatedCampaign = await this.campaignService.enterCampaign(authHeader, campaignUid);
            return res.status(200).json({
                message: "Usuário entrou na campanha com sucesso!",
                campaign: updatedCampaign
            });
        } catch (error) {
            console.error("[CampaignController::enterCampaign]:", error);
            return res.status(400).json({ message: error.message });
        }
    }

    async updateCampaign(req, res) {
        const { uid } = req.params;
        const campaignData = req.body;

        if (!uid || !campaignData) {
            return res.status(400).json({ message: "Dados inválidos para atualização da campanha." });
        }

        try {
            const updatedCampaign = await this.campaignService.updateCampaign(uid, campaignData);
            return res.status(200).json({ message: "Campanha atualizada com sucesso!", campaign: updatedCampaign });
        } catch (error) {
            console.error("[CampaignController::updateCampaign]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async deleteCampaign(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID da campanha inválido." });
        }

        try {
            const result = await this.campaignService.deleteCampaign(uid);
            return res.status(200).json(result);
        } catch (error) {
            console.error("[CampaignController::deleteCampaign]:", error);
            return res.status(404).json({ message: error.message });
        }
    }
}

export default CampaignController;

