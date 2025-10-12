import AuthService from "../services/authService.js";

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async signUp(req, res) {
        const { displayName, email, password } = req.body;

        if (!email || !password || !displayName) {
            return res.status(400).json({ message: "Dados inválidos para registro." });
        }

        try {
            const user = { displayName, email, password };
            const result = await this.authService.userSignUp(user);
            return res.status(201).json({ message: "Usuário registrado com sucesso!", user: result });
        } catch (error) {
            console.error("[AuthController::signUp]:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async signIn(req, res) {
        // A autenticação de login deve ser feita no cliente e o ID Token enviado para o backend para verificação.
        // Este endpoint é um placeholder para o fluxo de verificação de token, não para o login direto.
        return res.status(501).json({ message: "Login deve ser feito no cliente. Envie o ID Token para verificação." });
    }

    async passwordReset(req, res) {
        // O reset de senha deve ser feito no cliente ou via Firebase Cloud Functions.
        return res.status(501).json({ message: "Reset de senha deve ser feito no cliente ou via Cloud Functions." });
    }
}

export default AuthController;

