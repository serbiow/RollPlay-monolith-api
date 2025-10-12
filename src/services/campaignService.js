import CampaignRepository from "../repositories/campaignRepository.js";
import Campaign from "../models/campaignModel.js";

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
            throw new Error("Campaign not found.");
        }
        return campaign;
    }

    async getCampaignByUserUid(userUid) {
        const campaigns = await this.campaignRepository.getCampaignByUserUid(userUid);
        if (!campaigns || campaigns.length === 0) {
            throw new Error("No campaigns found for this user.");
        }
        return campaigns;
    }

    async updateCampaign(uid, campaignData) {
        const existingCampaign = await this.campaignRepository.getCampaignByUid(uid);
        if (!existingCampaign) {
            throw new Error("Campaign not found.");
        }
        const updatedData = { ...campaignData, updatedAt: new Date() };
        return this.campaignRepository.updateCampaign(uid, updatedData);
    }

    async deleteCampaign(uid) {
        const existingCampaign = await this.campaignRepository.getCampaignByUid(uid);
        if (!existingCampaign) {
            throw new Error("Campaign not found.");
        }
        return this.campaignRepository.deleteCampaign(uid);
    }
}

export default CampaignService;

