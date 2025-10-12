import SheetRepository from "../repositories/sheetRepository.js";
import Sheet from "../models/sheetModel.js";

class SheetService {
    constructor() {
        this.sheetRepository = new SheetRepository();
    }

    async createSheet(sheetData) {
        const newSheet = new Sheet(
            sheetData.uid, // Assuming UID is provided or generated before this point
            sheetData.userUid,
            sheetData.name || "New Character",
            sheetData.characterClass || "",
            sheetData.level || 1,
            sheetData.race || "",
            sheetData.alignment || "",
            sheetData.background || "",
            sheetData.attributes || { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
            sheetData.skills || { acrobatics: 0, stealth: 0 },
            sheetData.hp || 10,
            sheetData.ac || 10,
            sheetData.speed || 30,
            sheetData.initiative || 0,
            sheetData.inventory || [],
            sheetData.spells || [],
            sheetData.features || [],
            sheetData.notes || ""
        );
        return this.sheetRepository.createSheet(newSheet);
    }

    async getSheetByUid(uid) {
        const sheet = await this.sheetRepository.getSheetByUid(uid);
        if (!sheet) {
            throw new Error("Sheet not found.");
        }
        return sheet;
    }

    async getSheetBySessionUid(sessionUid) {
        const sheets = await this.sheetRepository.getSheetBySessionUid(sessionUid);
        if (!sheets || sheets.length === 0) {
            throw new Error("No sheets found for this session.");
        }
        return sheets;
    }

    async getSheetByUserUid(userUid) {
        const sheets = await this.sheetRepository.getSheetByUserUid(userUid);
        if (!sheets || sheets.length === 0) {
            throw new Error("No sheets found for this user.");
        }
        return sheets;
    }

    async updateSheet(uid, sheetData) {
        const existingSheet = await this.sheetRepository.getSheetByUid(uid);
        if (!existingSheet) {
            throw new Error("Sheet not found.");
        }
        const updatedData = { ...sheetData, updatedAt: new Date() };
        return this.sheetRepository.updateSheet(uid, updatedData);
    }

    async deleteSheet(uid) {
        const existingSheet = await this.sheetRepository.getSheetByUid(uid);
        if (!existingSheet) {
            throw new Error("Sheet not found.");
        }
        return this.sheetRepository.deleteSheet(uid);
    }
}

export default SheetService;

