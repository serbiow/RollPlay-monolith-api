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
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        try {
            const result = await this.authService.userLogin(email, password);

            if (result.success === false) {
                return res.status(400).json({ message: "Email não verificado" });
            }
            return res.status(200).json({ message: "Login realizado com sucesso", result })
        } catch (error) {
            console.error("[AuthController::userLogin]: ", error);
            return res.status(500).json({ message: "Erro ao realizar login", error });
        }
    }

    async userPasswordReset(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email inválido" });
        }

        try {
            await this.authService.sendPasswordResetEmail(email);
            return res.status(200).json({ message: "Email de recuperação enviado com sucesso" });
        } catch (error) {
            console.error("[AuthController::passwordReset]:", error);
            return res.status(500).json({ message: "Erro ao enviar email de recuperação", error });
        }
    }

}

export default AuthController;