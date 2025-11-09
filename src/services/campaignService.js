import CampaignRepository from "../repositories/campaignRepository.js";
import Campaign from "../models/campaignModel.js";
import { auth } from "../config/firebase.js";

class CampaignService {
    constructor() {
        this.campaignRepository = new CampaignRepository();
    }

    async createCampaign(campaignData) {
        const newCampaign = new Campaign(
            campaignData.uid || Date.now().toString(), // Simple UID generation if not provided
            campaignData.userUid,
            campaignData.name,
            campaignData.description || "",
            campaignData.players || []
        );
        return this.campaignRepository.createCampaign(newCampaign);
    }

    async getCampaignByUid(uid) {
        const campaign = await this.campaignRepository.getCampaignByUid(uid);
        if (!campaign) {
            throw new Error("Campanha não encontrada.");
        }
        return campaign;
    }

    async getCampaignByUserUid(userUid) {
        const campaigns = await this.campaignRepository.getCampaignByUserUid(userUid);
        if (!campaigns || campaigns.length === 0) {
            throw new Error("Nenhuma campanha encontrada para este usuário.");
        }
        return campaigns;
    }

    async getCampaignByUserToken(token) {
        // formatar o token
        const formattedToken = token.replace('Bearer ', '');
        const decodedToken = await auth.verifyIdToken(formattedToken);

        // pega o UID do sub do token
        const uid = decodedToken.user_id;

        const campaigns = await this.campaignRepository.getCampaignByUserUid(uid);
        if (!campaigns || campaigns.length === 0) {
            throw new Error("Nenhuma campanha encontrada para este usuário.");
        }
        return campaigns;
    }

    async updateCampaign(uid, campaignData) {
        const existingCampaign = await this.campaignRepository.getCampaignByUid(uid);
        if (!existingCampaign) {
            throw new Error("Campanha não encontrada.");
        }
        const updatedData = { ...campaignData, updatedAt: new Date() };
        return this.campaignRepository.updateCampaign(uid, updatedData);
    }

    async deleteCampaign(uid) {
        const existingCampaign = await this.campaignRepository.getCampaignByUid(uid);
        if (!existingCampaign) {
            throw new Error("Campanha não encontrada.");
        }
        return this.campaignRepository.deleteCampaign(uid);
    }
}

export default CampaignService;

