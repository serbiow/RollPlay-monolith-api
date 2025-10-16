// backend/src/config/firebase.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

function tryLoadServiceAccountFromEnv() {
    // 1) Se tiver FIREBASE_SERVICE_ACCOUNT_BASE64, usa ela
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        try {
            const json = JSON.parse(
                Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
            );
            return json;
        } catch (err) {
            console.warn('FIREBASE_SERVICE_ACCOUNT_BASE64 inválido:', err.message);
        }
    }

    // 2) Se GOOGLE_APPLICATION_CREDENTIALS estiver definida, lê o arquivo
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        try {
            const p = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
            const content = readFileSync(p, 'utf-8');
            return JSON.parse(content);
        } catch (err) {
            console.warn('Erro ao ler GOOGLE_APPLICATION_CREDENTIALS:', err.message);
        }
    }

    // 3) Se variáveis individuais estiverem presentes, monta um objeto compatível
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
        return {
            project_id: process.env.FIREBASE_PROJECT_ID,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: privateKey
        };
    }

    // nada encontrado
    return null;
}

const sa = tryLoadServiceAccountFromEnv();

if (!admin.apps.length) {
    if (sa && sa.client_email && sa.private_key) {
        // Usa cert() com o objeto já pronto
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: sa.project_id || process.env.FIREBASE_PROJECT_ID,
                clientEmail: sa.client_email,
                privateKey: sa.private_key
            }),
            projectId: sa.project_id || process.env.FIREBASE_PROJECT_ID
        });
        console.log('Firebase Admin inicializado via service account.');
    } else {
        // Fallback para ADC (usando GOOGLE_APPLICATION_CREDENTIALS ou ambiente do GCE)
        // Também tenta forçar projectId se tiver FIREBASE_PROJECT_ID
        const opts = { credential: admin.credential.applicationDefault() };
        if (process.env.FIREBASE_PROJECT_ID) opts.projectId = process.env.FIREBASE_PROJECT_ID;
        admin.initializeApp(opts);
        console.log('Firebase Admin inicializado via applicationDefault (ADC).');
    }
}

export const auth = admin.auth();
export const db = admin.firestore();
