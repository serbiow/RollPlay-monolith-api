import { db } from '../config/firebase.js';
import Sheet from '../models/sheetModel.js';

class SheetRepository {
    constructor() {
        this.collection = db.collection('sheets');
    }

    async createSheet(sheetData) {
        const sheet = sheetData instanceof Sheet ? sheetData : new Sheet(sheetData);
        const ref = this.collection.doc(sheet.uid);
        await ref.set(sheet.toFirestore(), { merge: false });
        return { uid: sheet.uid, ...sheet.toFirestore() };
    }

    async getSheetByUid(uid) {
        const doc = await this.collection.doc(uid).get();
        return doc.exists ? Sheet.fromFirestore(doc) : null;
    }

    async getSheetBySessionUid(sessionUid) {
        const snap = await this.collection.where('sessionUid', '==', sessionUid).get();
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

