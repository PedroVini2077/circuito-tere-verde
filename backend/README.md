# 🌿 Circuito Terê Verde - API Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

API RESTful para gerenciamento de trilhas ecológicas e eventos naturais em Teresópolis/RJ.

---

## 📋 Sobre o Projeto

O **Circuito Terê Verde** é uma plataforma web desenvolvida para promover o turismo ecológico em Teresópolis, facilitando o acesso a informações sobre trilhas e eventos naturais da região. Este MVP (Minimum Viable Product) foca em fornecer uma API robusta e segura para gestão de conteúdo administrativo.

### 🎯 Objetivos

- ✅ Facilitar a divulgação de trilhas ecológicas
- ✅ Promover eventos relacionados ao turismo ecológico
- ✅ Fornecer informações atualizadas sobre horários e disponibilidade
- ✅ Garantir segurança no acesso administrativo

---

## 🚀 Funcionalidades

### 👤 Autenticação
- Registro de novos usuários
- Login com JWT
- Controle de acesso (Admin/Visitante)
- Tokens seguros com expiração

### 🥾 Gestão de Trilhas
- CRUD completo de trilhas
- Filtros por disponibilidade e dificuldade
- Controle de horários de funcionamento
- Definição de capacidade máxima
- Informações detalhadas (distância, duração, localização)

### 🎪 Gestão de Eventos
- CRUD completo de eventos
- Filtros por status, tipo e data
- Gerenciamento de vagas disponíveis
- Controle de ativação/desativação
- Tipos: palestras, workshops, trilhas guiadas, observações

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB Atlas** - Banco de dados NoSQL na nuvem
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **Bcrypt.js** - Criptografia de senhas
- **Express Validator** - Validação de dados
- **CORS** - Habilitação de requisições cross-origin
- **Dotenv** - Gerenciamento de variáveis de ambiente

---

## 📁 Estrutura do Projeto
```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do MongoDB
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticação
│   │   ├── trilhaController.js  # Lógica de trilhas
│   │   └── eventoController.js  # Lógica de eventos
│   ├── middlewares/
│   │   ├── auth.js              # Proteção de rotas
│   │   ├── errorHandler.js      # Tratamento de erros
│   │   └── validator.js         # Validação de dados
│   ├── models/
│   │   ├── User.js              # Schema de usuário
│   │   ├── Trilha.js            # Schema de trilha
│   │   └── Evento.js            # Schema de evento
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   ├── trilhaRoutes.js      # Rotas de trilhas
│   │   └── eventoRoutes.js      # Rotas de eventos
│   ├── utils/
│   │   ├── generateToken.js     # Geração de JWT
│   │   └── seed.js              # Popular banco de dados
│   └── server.js                # Arquivo principal
├── docs/
│   ├── ESCOPO.md                # Escopo do projeto
│   ├── REQUISITOS.md            # Requisitos funcionais e não-funcionais
│   └── API.md                   # Documentação da API
├── .env                         # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados
├── package.json                 # Dependências
└── README.md                    # Este arquivo
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- Conta no MongoDB Atlas (gratuita)
- Git instalado

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/circuito-tere-verde.git
cd circuito-tere-verde/backend
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `backend`:
```env
PORT=5000
MONGODB_URI=sua_string_de_conexao_mongodb_atlas
JWT_SECRET=seu_secret_super_secreto_aqui
JWT_EXPIRE=7d
NODE_ENV=development
```

**Como obter a string de conexão do MongoDB Atlas:**

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Crie um usuário do banco de dados
4. Libere acesso de qualquer IP (0.0.0.0/0) em Network Access
5. Clique em "Connect" → "Connect your application"
6. Copie a string de conexão e substitua `<password>` pela senha do seu usuário

### Passo 4: Popular o Banco de Dados
```bash
npm run seed
```

**Credenciais do Admin criadas:**
- Email: `admin@tereverde.com`
- Senha: `admin123`

### Passo 5: Iniciar o Servidor

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

---

## 📡 Testando a API

### Verificar se a API está rodando

Acesse no navegador: `http://localhost:5000`

Resposta esperada:
```json
{
  "success": true,
  "message": "🌿 API Circuito Terê Verde está rodando!",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "trilhas": "/api/trilhas",
    "eventos": "/api/eventos"
  }
}
```

### Ferramentas Recomendadas

- **Thunder Client** (extensão do VS Code)
- **Postman**
- **Insomnia**

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação.

### Como autenticar:

1. Faça login em `/api/auth/login`
2. Copie o token retornado
3. Adicione o header em todas as requisições protegidas:
```
Authorization: Bearer seu_token_aqui
```

---

## 📚 Principais Endpoints

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/auth/register` | Registrar novo usuário | Não |
| POST | `/api/auth/login` | Fazer login | Não |
| GET | `/api/auth/me` | Obter dados do usuário logado | Sim |

### Trilhas

| Método | Endpoint | Descrição | Autenticação | Role |
|--------|----------|-----------|--------------|------|
| GET | `/api/trilhas` | Listar todas as trilhas | Não | - |
| GET | `/api/trilhas/:id` | Obter trilha específica | Não | - |
| POST | `/api/trilhas` | Criar nova trilha | Sim | Admin |
| PUT | `/api/trilhas/:id` | Atualizar trilha | Sim | Admin |
| DELETE | `/api/trilhas/:id` | Deletar trilha | Sim | Admin |
| PATCH | `/api/trilhas/:id/disponibilidade` | Atualizar disponibilidade | Sim | Admin |

### Eventos

| Método | Endpoint | Descrição | Autenticação | Role |
|--------|----------|-----------|--------------|------|
| GET | `/api/eventos` | Listar todos os eventos | Não | - |
| GET | `/api/eventos/:id` | Obter evento específico | Não | - |
| POST | `/api/eventos` | Criar novo evento | Sim | Admin |
| PUT | `/api/eventos/:id` | Atualizar evento | Sim | Admin |
| DELETE | `/api/eventos/:id` | Deletar evento | Sim | Admin |
| PATCH | `/api/eventos/:id/status` | Atualizar status | Sim | Admin |
| PATCH | `/api/eventos/:id/vagas` | Atualizar vagas | Sim | Admin |

**📖 Documentação completa:** Veja o arquivo `docs/API.md`

---

## 🧪 Scripts Disponíveis
```bash
# Iniciar servidor em modo desenvolvimento
npm run dev

# Iniciar servidor em modo produção
npm start

# Popular banco de dados com dados iniciais
npm run seed
```

---

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt (salt rounds: 10)
- ✅ Tokens JWT com expiração de 7 dias
- ✅ Validação de entrada em todos os endpoints
- ✅ Proteção de rotas administrativas
- ✅ CORS configurado
- ✅ Variáveis sensíveis em arquivo .env

---

## 🐛 Tratamento de Erros

A API retorna erros padronizados:
```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

**Códigos HTTP utilizados:**
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro no servidor

---

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `5000` |
| `MONGODB_URI` | String de conexão do MongoDB | `mongodb+srv://...` |
| `JWT_SECRET` | Chave secreta para JWT | `seu_secret_aqui` |
| `JWT_EXPIRE` | Tempo de expiração do token | `7d` |
| `NODE_ENV` | Ambiente de execução | `development` ou `production` |

---

## 📦 Dependências Principais
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Pedro Vinícios**
Desenvolvido para o desafio **MVP Back-End Development** - Unidade 1

**Situação-Problema:** Circuito Terê Verde - Turismo ecológico em Teresópolis

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verifique a documentação em `docs/`
2. Consulte os logs do servidor
3. Teste os endpoints com Thunder Client
4. Verifique se o MongoDB Atlas está acessível

---

## 🎯 Roadmap (Futuras Melhorias)

- [ ] Sistema de reservas de trilhas
- [ ] Upload de imagens
- [ ] Sistema de avaliações
- [ ] Notificações por email
- [ ] Dashboard administrativo
- [ ] Relatórios de visitação
- [ ] Integração com API de clima
- [ ] Aplicativo mobile

---

**🌿 Desenvolvido com 💚 para promover o turismo ecológico sustentável!**