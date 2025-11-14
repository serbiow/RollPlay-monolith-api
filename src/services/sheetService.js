import SheetRepository from "../repositories/sheetRepository.js";
import Sheet from "../models/sheetModel.js";
import { auth } from "../config/firebase.js";

function normalizeIncoming(data = {}) {
    const out = { ...data };

    // Validação para o modelo de spellcasting
    if (!out.spellcasting && out.spells) {
        out.spellcasting = {
            hasSpellcasting: Array.isArray(out.spells) && out.spells.length > 0,
            spellcastingAbility: null,
            spellSaveDC: null,
            spellAttackBonus: null,
            spellcastingMod: null,
            preparedCount: null,
            cantrips: [],
            spellsByLevel: {
                "0": { slots: { total: 0, expended: 0 }, spells: [] },
                "1": { slots: { total: 0, expended: 0 }, spells: [] },
                "2": { slots: { total: 0, expended: 0 }, spells: [] },
                "3": { slots: { total: 0, expended: 0 }, spells: [] },
                "4": { slots: { total: 0, expended: 0 }, spells: [] },
                "5": { slots: { total: 0, expended: 0 }, spells: [] },
                "6": { slots: { total: 0, expended: 0 }, spells: [] },
                "7": { slots: { total: 0, expended: 0 }, spells: [] },
                "8": { slots: { total: 0, expended: 0 }, spells: [] },
                "9": { slots: { total: 0, expended: 0 }, spells: [] }
            },
            spellNotes: ""
        };
        delete out.spells;
    }

    return out;
}

class SheetService {
    constructor() {
        this.sheetRepository = new SheetRepository();
    }

    async createSheet(sheetData) {
        const now = new Date();
        const normalized = normalizeIncoming(sheetData);

        const newSheet = new Sheet({
            ...normalized,
            // Defaults mínimos caso algo essencial venha faltando
            name: normalized.name ?? "New Character",
            level: normalized.level ?? 1,
            speed: normalized.speed ?? { walk: 9, swim: 0, fly: 0, climb: 0, burrow: 0 },
            ac: normalized.ac ?? {
                value: 10,
                breakdown: { base: 10, dex: 0, armor: 0, shield: 0, misc: 0 },
                shieldEquipped: false
            },
            hp: normalized.hp ?? {
                current: 1, max: 1, temp: 0,
                hitDice: { type: "d8", max: 1, spent: 0 }
            },
            createdAt: normalized.createdAt ?? now,
            updatedAt: normalized.updatedAt ?? now,
            schemaVersion: normalized.schemaVersion ?? 2
        });

        return this.sheetRepository.createSheet(newSheet);
    }

    async getSheetByUid(uid) {
        const sheet = await this.sheetRepository.getSheetByUid(uid);
        if (!sheet) {
            throw new Error("Sheet not found.");
        }
        return sheet;
    }

    async getSheetByCampaignUid(campaignUid) {
        const sheets = await this.sheetRepository.getSheetByCampaignUid(campaignUid);
        if (!sheets || sheets.length === 0) {
            throw new Error("No sheets found for this campaign.");
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

    async getSheetByUserToken(token) {
        // formatar o token
        const formattedToken = token.replace('Bearer ', '');
        const decodedToken = await auth.verifyIdToken(formattedToken);

        // pega o UID do sub do token
        const uid = decodedToken.user_id;

        const sheets = await this.sheetRepository.getSheetByUserUid(uid);
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

        const normalized = normalizeIncoming(sheetData);

        // Não permitir mudança de uid
        delete normalized.uid;

        const updatedData = {
            ...normalized,
            updatedAt: new Date()
        };

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
