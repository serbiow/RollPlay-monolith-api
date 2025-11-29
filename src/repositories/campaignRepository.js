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
        if (!userUid) return null;

        const campaignsMap = new Map();

        // 1- puxa as camapanhas que o user é mestre
        const ownerSnapshot = await this.collection.where('userUid', '==', userUid).get();
        if (!ownerSnapshot.empty) {
            ownerSnapshot.docs.forEach(doc => {
                const camp = Campaign.fromFirestore(doc);
                if (camp) campaignsMap.set(camp.uid, camp);
            });
        }

        // 2- puxa as campanhas que o user é player
        try {
            const byUidSnapshot = await this.collection.where('players', 'array-contains', { uid: userUid }).get();
            if (!byUidSnapshot.empty) {
                byUidSnapshot.docs.forEach(doc => {
                    const camp = Campaign.fromFirestore(doc);
                    if (camp) campaignsMap.set(camp.uid, camp);
                });
            }
        } catch (err) {
            // ignora e passa pro fallback
        }

        // última tentativa: varre todas as campanhas (pode ser lento, então só faz se não achou nada antes)
        if (campaignsMap.size === 0) {
            const allSnap = await this.collection.get();
            if (!allSnap.empty) {
                allSnap.docs.forEach(doc => {
                    const camp = Campaign.fromFirestore(doc);
                    if (!camp) return;
                    const found = (camp.players || []).some(p => p?.uid === userUid || p?.userUid === userUid);
                    if (found) campaignsMap.set(camp.uid, camp);
                });
            }
        }

        if (campaignsMap.size === 0) {
            return null;
        }

        return Array.from(campaignsMap.values());
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

