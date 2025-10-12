import { db } from '../config/firebase.js';
import Sheet from '../models/sheetModel.js';

class SheetRepository {
    constructor() {
        this.collection = db.collection('sheets');
    }

    async createSheet(sheetData) {
        const sheetRef = this.collection.doc(sheetData.uid);
        await sheetRef.set(sheetData.toFirestore());
        return { uid: sheetData.uid, ...sheetData.toFirestore() };
    }

    async getSheetByUid(uid) {
        const doc = await this.collection.doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        return Sheet.fromFirestore(doc);
    }

    async getSheetBySessionUid(sessionUid) {
        // Assuming sessionUid is stored in a field within the sheet document
        const snapshot = await this.collection.where('sessionUid', '==', sessionUid).get();
        if (snapshot.empty) {
            return null;
        }
        return snapshot.docs.map(doc => Sheet.fromFirestore(doc));
    }

    async getSheetByUserUid(userUid) {
        const snapshot = await this.collection.where('userUid', '==', userUid).get();
        if (snapshot.empty) {
            return null;
        }
        return snapshot.docs.map(doc => Sheet.fromFirestore(doc));
    }

    async updateSheet(uid, sheetData) {
        const sheetRef = this.collection.doc(uid);
        await sheetRef.update(sheetData);
        const updatedDoc = await sheetRef.get();
        return Sheet.fromFirestore(updatedDoc);
    }

    async deleteSheet(uid) {
        await this.collection.doc(uid).delete();
        return { message: 'Sheet deleted successfully' };
    }
}

export default SheetRepository;

