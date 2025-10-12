import { auth } from "../config/firebase.js";

const authMiddleware = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ message: "Nenhum token de autenticação fornecido." });
    }

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken; // Adiciona as informações do usuário decodificadas à requisição
        next();
    } catch (error) {
        console.error("[authMiddleware]:", error);
        return res.status(403).json({ message: "Token de autenticação inválido ou expirado." });
    }
};

export default authMiddleware;

