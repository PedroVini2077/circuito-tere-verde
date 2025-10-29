# 📡 Documentação da API - Circuito Terê Verde

## Base URL
```
http://localhost:5000
```

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação.

### Como autenticar:

1. Faça login no endpoint `/api/auth/login`
2. Copie o token retornado no campo `data.token`
3. Inclua o token no header de requisições protegidas:
```
Authorization: Bearer seu_token_aqui
```

---

## 📋 Respostas Padrão

### Sucesso
```json
{
  "success": true,
  "data": { ... }
}
```

### Erro
```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

---

## 🔑 Endpoints de Autenticação

### 1. Registrar Novo Usuário

**POST** `/api/auth/register`

**Autenticação:** Não necessária

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "role": "visitante"
}
```

**Campos:**
- `nome` (string, obrigatório) - Nome completo do usuário
- `email` (string, obrigatório) - Email único
- `senha` (string, obrigatório) - Mínimo 6 caracteres
- `role` (string, opcional) - "admin" ou "visitante" (padrão: "visitante")

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "690297b3a6bcab0f48e1c13a",
    "nome": "João Silva",
    "email": "joao@email.com",
    "role": "visitante",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Erros Possíveis:**
- `400` - Email já cadastrado
- `400` - Dados inválidos

---

### 2. Fazer Login

**POST** `/api/auth/login`

**Autenticação:** Não necessária

**Body:**
```json
{
  "email": "admin@tereverde.com",
  "senha": "admin123"
}
```

**Campos:**
- `email` (string, obrigatório) - Email do usuário
- `senha` (string, obrigatório) - Senha do usuário

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "690297b3a6bcab0f48e1c13a",
    "nome": "Administrador",
    "email": "admin@tereverde.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Erros Possíveis:**
- `400` - Email e senha são obrigatórios
- `401` - Credenciais inválidas
- `401` - Usuário inativo

---

### 3. Obter Dados do Usuário Logado

**GET** `/api/auth/me`

**Autenticação:** Obrigatória

**Headers:**
```
Authorization: Bearer seu_token_aqui
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c13a",
    "nome": "Administrador",
    "email": "admin@tereverde.com",
    "role": "admin",
    "ativo": true,
    "createdAt": "2024-10-29T12:00:00.000Z",
    "updatedAt": "2024-10-29T12:00:00.000Z"
  }
}
```

**Erros Possíveis:**
- `401` - Token não fornecido
- `401` - Token inválido ou expirado

---

## 🥾 Endpoints de Trilhas

### 1. Listar Todas as Trilhas

**GET** `/api/trilhas`

**Autenticação:** Não necessária

**Query Parameters (opcionais):**
- `disponivel` (boolean) - Filtrar por disponibilidade (`true` ou `false`)
- `dificuldade` (string) - Filtrar por dificuldade (`fácil`, `moderada`, `difícil`)

**Exemplos:**
```
GET /api/trilhas
GET /api/trilhas?disponivel=true
GET /api/trilhas?dificuldade=moderada
GET /api/trilhas?disponivel=true&dificuldade=fácil
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "690297b3a6bcab0f48e1c13b",
      "nome": "Trilha da Pedra do Sino",
      "descricao": "Trilha desafiadora com vista panorâmica incrível",
      "dificuldade": "difícil",
      "distancia": 14,
      "duracao": "6-8 horas",
      "localizacao": "Parque Nacional da Serra dos Órgãos",
      "horarioFuncionamento": {
        "abertura": "07:00",
        "fechamento": "17:00"
      },
      "disponivel": true,
      "capacidadeMaxima": 30,
      "criadoPor": {
        "_id": "690297b3a6bcab0f48e1c13a",
        "nome": "Administrador",
        "email": "admin@tereverde.com"
      },
      "createdAt": "2024-10-29T12:00:00.000Z",
      "updatedAt": "2024-10-29T12:00:00.000Z"
    }
  ]
}
```

---

### 2. Obter Trilha Específica

**GET** `/api/trilhas/:id`

**Autenticação:** Não necessária

**Parâmetros de URL:**
- `id` (string) - ID da trilha

**Exemplo:**
```
GET /api/trilhas/690297b3a6bcab0f48e1c13b
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c13b",
    "nome": "Trilha da Pedra do Sino",
    "descricao": "Trilha desafiadora com vista panorâmica incrível",
    "dificuldade": "difícil",
    "distancia": 14,
    "duracao": "6-8 horas",
    "localizacao": "Parque Nacional da Serra dos Órgãos",
    "horarioFuncionamento": {
      "abertura": "07:00",
      "fechamento": "17:00"
    },
    "disponivel": true,
    "capacidadeMaxima": 30,
    "imagemUrl": null,
    "criadoPor": {
      "_id": "690297b3a6bcab0f48e1c13a",
      "nome": "Administrador",
      "email": "admin@tereverde.com"
    },
    "createdAt": "2024-10-29T12:00:00.000Z",
    "updatedAt": "2024-10-29T12:00:00.000Z"
  }
}
```

**Erros Possíveis:**
- `404` - Trilha não encontrada
- `500` - ID inválido

---

### 3. Criar Nova Trilha

**POST** `/api/trilhas`

**Autenticação:** Obrigatória (apenas Admin)

**Headers:**
```
Authorization: Bearer seu_token_aqui
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Trilha do Açu",
  "descricao": "Trilha com belas paisagens e mirantes naturais",
  "dificuldade": "moderada",
  "distancia": 7,
  "duracao": "4 horas",
  "localizacao": "Serra dos Órgãos",
  "horarioFuncionamento": {
    "abertura": "07:00",
    "fechamento": "16:00"
  },
  "capacidadeMaxima": 35,
  "imagemUrl": "https://exemplo.com/imagem.jpg"
}
```

**Campos:**
- `nome` (string, obrigatório) - Nome da trilha
- `descricao` (string, obrigatório) - Descrição detalhada
- `dificuldade` (string, obrigatório) - "fácil", "moderada" ou "difícil"
- `distancia` (number, obrigatório) - Distância em km
- `duracao` (string, obrigatório) - Duração estimada
- `localizacao` (string, obrigatório) - Localização da trilha
- `horarioFuncionamento` (object, obrigatório)
  - `abertura` (string) - Horário de abertura (formato: "HH:MM")
  - `fechamento` (string) - Horário de fechamento (formato: "HH:MM")
- `capacidadeMaxima` (number, opcional) - Padrão: 50
- `imagemUrl` (string, opcional) - URL da imagem
- `disponivel` (boolean, opcional) - Padrão: true

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c140",
    "nome": "Trilha do Açu",
    "descricao": "Trilha com belas paisagens e mirantes naturais",
    "dificuldade": "moderada",
    "distancia": 7,
    "duracao": "4 horas",
    "localizacao": "Serra dos Órgãos",
    "horarioFuncionamento": {
      "abertura": "07:00",
      "fechamento": "16:00"
    },
    "disponivel": true,
    "capacidadeMaxima": 35,
    "imagemUrl": "https://exemplo.com/imagem.jpg",
    "criadoPor": "690297b3a6bcab0f48e1c13a",
    "createdAt": "2024-10-29T14:30:00.000Z",
    "updatedAt": "2024-10-29T14:30:00.000Z"
  }
}
```

**Erros Possíveis:**
- `401` - Não autenticado
- `403` - Acesso negado (não é admin)
- `400` - Dados inválidos

---

### 4. Atualizar Trilha

**PUT** `/api/trilhas/:id`

**Autenticação:** Obrigatória (apenas Admin)

**Headers:**
```
Authorization: Bearer seu_token_aqui
Content-Type: application/json
```

**Body (todos os campos são opcionais):**
```json
{
  "nome": "Trilha do Açu - Atualizada",
  "disponivel": false,
  "capacidadeMaxima": 40
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c140",
    "nome": "Trilha do Açu - Atualizada",
    "disponivel": false,
    "capacidadeMaxima": 40,
    ...
  }
}
```

**Erros Possíveis:**
- `401` - Não autenticado
- `403` - Acesso negado
- `404` - Trilha não encontrada

---

### 5. Deletar Trilha

**DELETE** `/api/trilhas/:id`

**Autenticação:** Obrigatória (apenas Admin)

**Headers:**
```
Authorization: Bearer seu_token_aqui
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Trilha removida com sucesso",
  "data": {}
}
```

**Erros Possíveis:**
- `401` - Não autenticado
- `403` - Acesso negado
- `404` - Trilha não encontrada

---

### 6. Atualizar Disponibilidade da Trilha

**PATCH** `/api/trilhas/:id/disponibilidade`

**Autenticação:** Obrigatória (apenas Admin)

**Headers:**
```
Authorization: Bearer seu_token_aqui
Content-Type: application/json
```

**Body:**
```json
{
  "disponivel": false
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c140",
    "disponivel": false,
    ...
  }
}
```

---

## 🎪 Endpoints de Eventos

### 1. Listar Todos os Eventos

**GET** `/api/eventos`

**Autenticação:** Não necessária

**Query Parameters (opcionais):**
- `ativo` (boolean) - Filtrar por status (`true` ou `false`)
- `tipo` (string) - Filtrar por tipo (`palestra`, `workshop`, `trilha guiada`, `observação`, `outro`)
- `dataInicio` (date) - Data inicial (formato: YYYY-MM-DD)
- `dataFim` (date) - Data final (formato: YYYY-MM-DD)

**Exemplos:**
```
GET /api/eventos
GET /api/eventos?ativo=true
GET /api/eventos?tipo=workshop
GET /api/eventos?dataInicio=2024-12-01&dataFim=2024-12-31
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "690297b3a6bcab0f48e1c13e",
      "titulo": "Workshop de Fotografia na Natureza",
      "descricao": "Aprenda técnicas de fotografia em ambientes naturais",
      "dataInicio": "2024-12-15T00:00:00.000Z",
      "dataFim": "2024-12-15T00:00:00.000Z",
      "horario": "09:00 - 13:00",
      "local": "Centro de Visitantes",
      "capacidade": 20,
      "vagasDisponiveis": 20,
      "tipo": "workshop",
      "ativo": true,
      "criadoPor": {
        "_id": "690297b3a6bcab0f48e1c13a",
        "nome": "Administrador",
        "email": "admin@tereverde.com"
      },
      "createdAt": "2024-10-29T12:00:00.000Z",
      "updatedAt": "2024-10-29T12:00:00.000Z"
    }
  ]
}
```

---

### 2. Obter Evento Específico

**GET** `/api/eventos/:id`

**Autenticação:** Não necessária

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c13e",
    "titulo": "Workshop de Fotografia na Natureza",
    "descricao": "Aprenda técnicas de fotografia em ambientes naturais",
    "dataInicio": "2024-12-15T00:00:00.000Z",
    "dataFim": "2024-12-15T00:00:00.000Z",
    "horario": "09:00 - 13:00",
    "local": "Centro de Visitantes",
    "capacidade": 20,
    "vagasDisponiveis": 20,
    "tipo": "workshop",
    "ativo": true,
    "imagemUrl": null,
    "criadoPor": {
      "_id": "690297b3a6bcab0f48e1c13a",
      "nome": "Administrador",
      "email": "admin@tereverde.com"
    },
    "createdAt": "2024-10-29T12:00:00.000Z",
    "updatedAt": "2024-10-29T12:00:00.000Z"
  }
}
```

---

### 3. Criar Novo Evento

**POST** `/api/eventos`

**Autenticação:** Obrigatória (apenas Admin)

**Headers:**
```
Authorization: Bearer seu_token_aqui
Content-Type: application/json
```

**Body:**
```json
{
  "titulo": "Caminhada Ecológica Noturna",
  "descricao": "Experiência única de observar a natureza à noite",
  "dataInicio": "2024-12-25",
  "dataFim": "2024-12-25",
  "horario": "19:00 - 22:00",
  "local": "Trilha do Cartão Postal",
  "capacidade": 25,
  "tipo": "trilha guiada",
  "imagemUrl": "https://exemplo.com/evento.jpg"
}
```

**Campos:**
- `titulo` (string, obrigatório) - Título do evento
- `descricao` (string, obrigatório) - Descrição detalhada
- `dataInicio` (date, obrigatório) - Data de início
- `dataFim` (date, obrigatório) - Data de fim (não pode ser antes da data de início)
- `horario` (string, obrigatório) - Horário do evento
- `local` (string, obrigatório) - Local do evento
- `capacidade` (number, obrigatório) - Capacidade máxima
- `tipo` (string, obrigatório) - "palestra", "workshop", "trilha guiada", "observação" ou "outro"
- `ativo` (boolean, opcional) - Padrão: true
- `imagemUrl` (string, opcional) - URL da imagem

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c150",
    "titulo": "Caminhada Ecológica Noturna",
    "descricao": "Experiência única de observar a natureza à noite",
    "dataInicio": "2024-12-25T00:00:00.000Z",
    "dataFim": "2024-12-25T00:00:00.000Z",
    "horario": "19:00 - 22:00",
    "local": "Trilha do Cartão Postal",
    "capacidade": 25,
    "vagasDisponiveis": 25,
    "tipo": "trilha guiada",
    "ativo": true,
    "imagemUrl": "https://exemplo.com/evento.jpg",
    "criadoPor": "690297b3a6bcab0f48e1c13a",
    "createdAt": "2024-10-29T15:00:00.000Z",
    "updatedAt": "2024-10-29T15:00:00.000Z"
  }
}
```

**Erros Possíveis:**
- `400` - Data de fim anterior à data de início
- `401` - Não autenticado
- `403` - Acesso negado

---

### 4. Atualizar Evento

**PUT** `/api/eventos/:id`

**Autenticação:** Obrigatória (apenas Admin)

**Body (todos os campos são opcionais):**
```json
{
  "titulo": "Caminhada Ecológica Noturna - ATUALIZADO",
  "capacidade": 30
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 5. Deletar Evento

**DELETE** `/api/eventos/:id`

**Autenticação:** Obrigatória (apenas Admin)

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Evento removido com sucesso",
  "data": {}
}
```

---

### 6. Atualizar Status do Evento

**PATCH** `/api/eventos/:id/status`

**Autenticação:** Obrigatória (apenas Admin)

**Body:**
```json
{
  "ativo": false
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c150",
    "ativo": false,
    ...
  }
}
```

---

### 7. Atualizar Vagas Disponíveis

**PATCH** `/api/eventos/:id/vagas`

**Autenticação:** Obrigatória (apenas Admin)

**Body:**
```json
{
  "vagasDisponiveis": 15
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "690297b3a6bcab0f48e1c150",
    "vagasDisponiveis": 15,
    ...
  }
}
```

**Erros Possíveis:**
- `400` - Vagas maiores que capacidade total

---

## 📊 Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## 🧪 Exemplos de Uso com cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tereverde.com","senha":"admin123"}'
```

### Listar Trilhas
```bash
curl http://localhost:5000/api/trilhas
```

### Criar Trilha (com autenticação)
```bash
curl -X POST http://localhost:5000/api/trilhas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"nome":"Trilha Nova","descricao":"Descrição...","dificuldade":"fácil","distancia":5,"duracao":"2 horas","localizacao":"Local","horarioFuncionamento":{"abertura":"08:00","fechamento":"17:00"}}'
```

---

## 🔍 Notas Importantes

1. **Tokens expiram em 7 dias** - Após esse período, é necessário fazer login novamente
2. **Visitantes podem apenas visualizar** - Apenas admins podem criar/editar/deletar
3. **Validações são aplicadas** - Dados inválidos retornam erro 400
4. **IDs do MongoDB** - Sempre use IDs válidos do formato MongoDB ObjectId

---

**📖 Para mais informações, consulte os arquivos:**
- `ESCOPO.md` - Escopo do projeto
- `REQUISITOS.md` - Requisitos funcionais e não-funcionais
- `README.md` - Instruções de instalação e uso