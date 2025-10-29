# 🎤 Guia de Pitch - Circuito Terê Verde

## 📋 Estrutura da Apresentação

### 1. Introdução (30 segundos)
### 2. O Problema (1 minuto)
### 3. A Solução (2 minutos)
### 4. Demonstração Técnica (3 minutos)
### 5. Diferenciais e Resultados (1 minuto)
### 6. Próximos Passos (30 segundos)

**Tempo Total:** 8 minutos

---

## 1️⃣ INTRODUÇÃO (30 segundos)

### O que dizer:

> "Olá! Hoje vou apresentar o **Circuito Terê Verde**, um MVP de plataforma web desenvolvido para promover o turismo ecológico em Teresópolis/RJ. Este projeto foi criado como resposta ao desafio da Unidade 1 de MVP Back-End Development, focando em gestão de trilhas ecológicas e eventos naturais."

### Elementos visuais:
- Slide com logo/nome do projeto
- Frase de impacto: "Conectando pessoas à natureza através da tecnologia"

---

## 2️⃣ O PROBLEMA (1 minuto)

### Contexto:

> "Teresópolis possui inúmeras trilhas ecológicas e eventos naturais, mas enfrenta desafios importantes:"

### Problemas identificados:

✋ **Falta de centralização de informações**
- Turistas têm dificuldade em encontrar informações atualizadas sobre trilhas
- Não há um sistema único para consultar horários e disponibilidade

✋ **Gestão ineficiente**
- Administradores não têm ferramentas adequadas para atualizar informações rapidamente
- Falta controle sobre capacidade e disponibilidade das trilhas

✋ **Segurança e acesso**
- Necessidade de proteger informações administrativas
- Importância de diferenciar usuários comuns de administradores

### O que dizer:

> "Identificamos que turistas e administradores precisam de uma plataforma segura, rápida e centralizada para gerenciar e acessar informações sobre o turismo ecológico local."

---

## 3️⃣ A SOLUÇÃO (2 minutos)

### Apresentação da solução:

> "Desenvolvemos uma **API RESTful robusta e segura** que resolve esses problemas através de:"

### Funcionalidades principais:

🌿 **Gestão Completa de Trilhas**
- CRUD completo (criar, ler, atualizar, deletar)
- Controle de disponibilidade em tempo real
- Informações detalhadas: dificuldade, distância, duração, horários
- Capacidade máxima configurável

🎪 **Gestão de Eventos Ecológicos**
- Cadastro de palestras, workshops, trilhas guiadas
- Controle de vagas disponíveis
- Filtros por tipo, data e status
- Ativação/desativação flexível

🔐 **Sistema de Autenticação Seguro**
- Login com JWT (tokens seguros)
- Diferenciação entre administradores e visitantes
- Proteção de rotas administrativas
- Criptografia de senhas com bcrypt

### Arquitetura técnica:

> "A solução foi desenvolvida com:"

**Backend:**
- Node.js + Express.js (performance e escalabilidade)
- MongoDB Atlas (banco de dados na nuvem)
- Arquitetura MVC (código organizado e manutenível)

**Segurança:**
- JWT para autenticação
- Bcrypt para criptografia de senhas
- Validação de dados em todos os endpoints
- Controle de acesso baseado em roles

---

## 4️⃣ DEMONSTRAÇÃO TÉCNICA (3 minutos)

### Preparação:
- Servidor rodando em `http://localhost:5000`
- Thunder Client/Postman aberto
- Token de admin já obtido

### Roteiro da demonstração:

#### **Demo 1: Verificar API (15s)**
```
GET http://localhost:5000
```
> "Primeiro, verificamos que nossa API está rodando e retornando informações sobre os endpoints disponíveis."

---

#### **Demo 2: Login como Admin (30s)**
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@tereverde.com",
  "senha": "admin123"
}
```
> "Fazemos login como administrador e recebemos um token JWT que será usado nas próximas requisições."

**Destacar:** O token retornado com dados do usuário

---

#### **Demo 3: Listar Trilhas Públicas (20s)**
```
GET http://localhost:5000/api/trilhas
```
> "Qualquer pessoa, mesmo sem login, pode visualizar todas as trilhas disponíveis. Aqui temos 3 trilhas cadastradas com informações completas."

**Destacar:** Dados detalhados de cada trilha

---

#### **Demo 4: Criar Nova Trilha - ADMIN (45s)**
```
POST http://localhost:5000/api/trilhas
Headers: Authorization: Bearer TOKEN_AQUI
Body: {
  "nome": "Trilha do Mirante",
  "descricao": "Vista panorâmica incrível da cidade",
  "dificuldade": "fácil",
  "distancia": 3,
  "duracao": "2 horas",
  "localizacao": "Centro de Teresópolis",
  "horarioFuncionamento": {
    "abertura": "08:00",
    "fechamento": "18:00"
  },
  "capacidadeMaxima": 40
}
```
> "Apenas administradores autenticados podem criar novas trilhas. Veja como o sistema registra automaticamente quem criou o recurso e valida todos os dados."

**Destacar:** 
- Necessidade do token de admin
- Validação dos dados
- Registro automático do criador

---

#### **Demo 5: Atualizar Disponibilidade (30s)**
```
PATCH http://localhost:5000/api/trilhas/ID_DA_TRILHA/disponibilidade
Headers: Authorization: Bearer TOKEN_AQUI
Body: {
  "disponivel": false
}
```
> "Administradores podem rapidamente fechar ou abrir trilhas, útil em casos de manutenção ou condições climáticas adversas."

---

#### **Demo 6: Listar Eventos (20s)**
```
GET http://localhost:5000/api/eventos
```
> "Temos também a gestão completa de eventos ecológicos: workshops, palestras, trilhas guiadas. Todos com controle de vagas e datas."

**Destacar:** Filtros disponíveis e ordenação por data

---

#### **Demo 7: Tentar ação sem permissão (20s)**
```
POST http://localhost:5000/api/trilhas
(sem token ou com token de visitante)
```
> "E o mais importante: o sistema protege as rotas administrativas. Sem autenticação ou sem ser admin, não é possível criar, editar ou deletar recursos."

**Destacar:** Erro 401 ou 403 retornado

---

## 5️⃣ DIFERENCIAIS E RESULTADOS (1 minuto)

### Diferenciais Técnicos:

✅ **Arquitetura Profissional**
- Código organizado em camadas (MVC)
- Separação clara de responsabilidades
- Fácil manutenção e escalabilidade

✅ **Segurança Robusta**
- Criptografia de senhas
- Tokens com expiração
- Validação em todas as entradas
- Proteção contra ataques comuns

✅ **Performance Otimizada**
- Respostas rápidas (< 2s)
- Banco de dados na nuvem
- Queries otimizadas

✅ **Documentação Completa**
- README detalhado
- Documentação da API
- Escopo e requisitos documentados
- Exemplos de uso

### Resultados Alcançados:

📊 **MVP Funcional e Testado**
- ✅ 100% dos requisitos funcionais implementados
- ✅ Todos os requisitos não-funcionais atendidos
- ✅ API totalmente funcional e testada
- ✅ Código versionado no GitHub

📊 **Métricas Técnicas**
- 3 models completos (User, Trilha, Evento)
- 15+ endpoints funcionais
- Autenticação segura implementada
- Sistema de roles funcionando

---

## 6️⃣ PRÓXIMOS PASSOS (30 segundos)

### Roadmap Futuro:

🚀 **Curto Prazo**
- Interface web responsiva
- Upload de imagens
- Sistema de reservas

🚀 **Médio Prazo**
- Avaliações e comentários
- Integração com API de clima
- Notificações por email

🚀 **Longo Prazo**
- Aplicativo mobile
- Dashboard com analytics
- Sistema de gamificação

### Encerramento:

> "O Circuito Terê Verde é um MVP sólido, seguro e escalável que demonstra a aplicação prática de conceitos fundamentais de desenvolvimento back-end. A solução está pronta para uso e preparada para evoluir conforme as necessidades dos usuários. Obrigado!"

---