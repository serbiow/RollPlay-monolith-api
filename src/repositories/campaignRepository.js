import { db } from '../config/firebase.js';
import Campaign from '../models/campaignModel.js';

class CampaignRepository {
    constructor() {
        this.collection = db.collection('campaign');
    }

    async createCampaign(campaignData) {
        const campaignRef = this.collection.doc(campaignData.uid);
        await campaignRef.set(campaignData.toFirestore());
        return { uid: campaignData.uid, ...campaignData.toFirestore() };
    }

    async getCampaignByUid(uid) {
        const doc = await this.collection.doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        return Campaign.fromFirestore(doc);
    }

    async getCampaignByUserUid(userUid) {
        const snapshot = await this.collection.where('userUid', '==', userUid).get();
        if (snapshot.empty) {
            return null;
        }
        return snapshot.docs.map(doc => Campaign.fromFirestore(doc));
    }

    async updateCampaign(uid, campaignData) {
        const campaignRef = this.collection.doc(uid);
        await campaignRef.update(campaignData);
        const updatedDoc = await campaignRef.get();
        return Campaign.fromFirestore(updatedDoc);
    }

    async deleteCampaign(uid) {
        await this.collection.doc(uid).delete();
        return { message: 'Campaign deleted successfully' };
    }
}

export default CampaignRepository;

