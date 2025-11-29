# RollPlay Monolith API

Esta é uma API monolítica desenvolvida em Node.js, Express e Firebase Firestore, consolidando as funcionalidades dos microserviços originais de RollPlay.

## Funcionalidades Incluídas

- **Autenticação**: Registro de usuários via Firebase Authentication.
- **Usuários**: CRUD completo de usuários.
- **Fichas de Personagem**: CRUD de fichas de personagem.
- **Campanhas**: CRUD de campanhas.
- **Rolagem de Dados**: Funcionalidade para rolar dados.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Uma conta Firebase com um projeto configurado (Firestore e Authentication habilitados).

## Configuração do Firebase

1.  **Crie um Projeto Firebase**: Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.
2.  **Habilite Firestore e Authentication**: No seu projeto Firebase, vá em `Build > Firestore Database` e crie um banco de dados. Em `Build > Authentication`, habilite o método de login por `Email/Password`.
3.  **Gerar Chave Privada da Conta de Serviço**: 
    - No Console do Firebase, vá em `Project settings` (ícone de engrenagem) > `Service accounts`.
    - Clique em `Generate new private key` e depois em `Generate key`.
    - Um arquivo JSON será baixado. Abra este arquivo.
4.  **Configurar Variáveis de Ambiente**: 
    - Crie um arquivo `.env` na raiz do projeto `monolith-api`.
    - Copie as seguintes variáveis para o arquivo `.env` e preencha com as informações do seu arquivo JSON de chave privada:

    ```dotenv
    FIREBASE_PROJECT_ID=seu-project-id-do-firebase
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----" # Certifique-se de quebrar as linhas com \n
    FIREBASE_CLIENT_EMAIL=seu-client-email@seu-project-id.iam.gserviceaccount.com
    PORT=3000
    ```
    - Substitua `seu-project-id-do-firebase`, `SUA_CHAVE_PRIVADA_AQUI` e `seu-client-email@seu-project-id.iam.gserviceaccount.com` pelos valores correspondentes do seu arquivo JSON.

## Instalação

1.  Clone este repositório (ou descompacte o arquivo ZIP).
2.  Navegue até o diretório `monolith-api`:
    ```bash
    cd monolith-api
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

## Execução

Para iniciar a API, execute:

```bash
node src/server.js
```

A API estará rodando em `http://localhost:3000` (ou na porta especificada em seu `.env`).

## Rotas da API

### Autenticação (`/auth`)
- `POST /auth/signup`: Registra um novo usuário. (Corpo: `displayName`, `email`, `password`)
- `POST /auth/signin`: **Nota**: Este endpoint é um placeholder. A autenticação inicial deve ser feita no cliente Firebase, e o ID Token enviado para o backend para verificação.
- `POST /auth/password-reset`: **Nota**: O reset de senha deve ser feito no cliente Firebase ou via Firebase Cloud Functions.

### Usuários (`/users`)
- `POST /users`: Cria um novo usuário. (Corpo: `uid`, `displayName`, `email`)
- `GET /users/:uid`: Busca um usuário pelo UID.
- `GET /users/email/:email`: Busca um usuário pelo email.
- `GET /users`: Busca todos os usuários.
- `PUT /users/:uid`: Atualiza um usuário. (Corpo: `displayName`, `email`, `isActive`)
- `DELETE /users/:uid`: Deleta um usuário.
- `PUT /users/:uid/deactivate`: Desativa um usuário.
- `PUT /users/:uid/reactivate`: Reativa um usuário.

### Fichas de Personagem (`/sheets`)
- `POST /sheets`: Cria uma nova ficha de personagem. (Corpo: `userUid`, `name`, `characterClass`, `level`, `race`, `alignment`, `background`, `attributes`, `skills`, `hp`, `ac`, `speed`, `initiative`, `inventory`, `spells`, `features`, `notes`)
- `GET /sheets/:uid`: Busca uma ficha pelo UID.
- `GET /sheets/campaign/:campaignUid`: Busca fichas por UID de sessão. (Nota: `campaignUid` não está implementado no modelo atual, será necessário adicionar ao modelo `Sheet` se for usado).
- `GET /sheets/user/:userUid`: Busca fichas por UID de usuário.
- `PUT /sheets/:uid`: Atualiza uma ficha. (Corpo: campos a serem atualizados)
- `DELETE /sheets/:uid`: Deleta uma ficha.

### Campanhas (`/campaigns`)
- `POST /campaigns`: Cria uma nova campanha. (Corpo: `userUid`, `name`, `description`, `players`)
- `GET /campaigns/:uid`: Busca uma campanha pelo UID.
- `GET /campaigns/user/:userUid`: Busca campanhas por UID de usuário.
- `PUT /campaigns/:uid`: Atualiza uma campanha. (Corpo: campos a serem atualizados)
- `DELETE /campaigns/:uid`: Deleta uma campanha.

### Rolagem de Dados (`/dice`)
- `POST /dice/roll`: Rola dados. (Corpo: `numDice`, `numSides`)


### API na Azure
https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net



## Observações

- A autenticação de usuário (`signIn`, `passwordReset`) deve ser feita no lado do cliente usando o SDK do Firebase Client, e o `idToken` resultante deve ser enviado para o backend para requisições que exigem autenticação.
- O middleware `authMiddleware.js` espera um `Bearer Token` no cabeçalho `Authorization` para verificar o `idToken` do Firebase.

