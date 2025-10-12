import { auth } from "../config/firebase.js";

class AuthService {
    async userSignUp(userData) {
        const { email, password, displayName } = userData;
        try {
            const userRecord = await auth.createUser({
                email: email,
                password: password,
                displayName: displayName,
            });
            return { uid: userRecord.uid, email: userRecord.email, displayName: userRecord.displayName };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async userSignIn(email, password) {
        // Firebase Admin SDK não possui um método direto para 'signInWithEmailAndPassword'
        // Para login, o cliente deve autenticar-se e enviar o ID Token para o backend para verificação.
        // Este método é um placeholder ou pode ser usado para gerar um token personalizado para o cliente.
        // Para este cenário, vamos simular a verificação de credenciais e gerar um token personalizado.
        // Em um ambiente real, a autenticação inicial seria feita no cliente.
        throw new Error("Sign-in via Admin SDK is not directly supported. Client should authenticate and send ID Token.");
    }

    async sendPasswordResetEmail(email) {
        // O Firebase Admin SDK não tem um método direto para enviar e-mails de redefinição de senha.
        // Isso geralmente é feito no lado do cliente usando o SDK do cliente Firebase.
        // Para um backend, você precisaria usar uma API de e-mail ou o SDK do cliente em um ambiente de função em nuvem.
        throw new Error("Password reset email cannot be sent directly from Admin SDK. Use client SDK or a cloud function.");
    }
}

export default AuthService;

