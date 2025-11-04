import { db } from '../config/firebase.js';
import Sheet from '../models/sheetModel.js';

class SheetRepository {
    constructor() {
        this.collection = db.collection('sheet');
    }

    async createSheet(sheetData) {
        const sheet = sheetData instanceof Sheet ? sheetData : new Sheet(sheetData);

        // Gera uid se não existir
        let ref;
        if (!sheet.uid) {
            ref = this.collection.doc();
            sheet.uid = ref.id;
        } else {
            ref = this.collection.doc(sheet.uid);
        }

        // Grava
        await ref.set(sheet.toFirestore(), { merge: false });

        // Retorna payload já com uid
        return { uid: sheet.uid, ...sheet.toFirestore() };
    }

    async getSheetByUid(uid) {
        const doc = await this.collection.doc(uid).get();
        return doc.exists ? Sheet.fromFirestore(doc) : null;
    }

    // OBS: campaignUid não faz parte do schema novo por padrão.
    // Se você decidir usar em sessões, grave esse campo no documento.
    async getSheetByCampaignUid(campaignUid) {
        const snap = await this.collection.where('campaignUid', '==', campaignUid).get();
        if (snap.empty) return [];
        return snap.docs.map((d) => Sheet.fromFirestore(d));
    }

    async getSheetByUserUid(userUid) {
        const snap = await this.collection.where('userUid', '==', userUid).get();
        if (snap.empty) return [];
        return snap.docs.map((d) => Sheet.fromFirestore(d));
    }

    async updateSheet(uid, partialData) {
        await this.collection.doc(uid).set(partialData, { merge: true });
        const updated = await this.collection.doc(uid).get();
        return Sheet.fromFirestore(updated);
    }

    async deleteSheet(uid) {
        await this.collection.doc(uid).delete();
        return { message: 'Sheet deleted successfully' };
    }
}

export default SheetRepository;
