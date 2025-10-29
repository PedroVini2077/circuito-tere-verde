# 📋 Requisitos do Sistema - Circuito Terê Verde

## 🎯 Requisitos Funcionais (RF)

### RF01 - Autenticação e Autorização

**RF01.1 - Registro de Usuário**
- O sistema deve permitir o cadastro de novos usuários
- Dados obrigatórios: nome, email, senha
- O email deve ser único no sistema
- A senha deve ter no mínimo 6 caracteres
- Por padrão, novos usuários são criados como "visitante"

**RF01.2 - Login de Usuário**
- O sistema deve permitir login com email e senha
- Deve retornar um token JWT válido por 7 dias
- Deve validar credenciais antes de gerar o token
- Usuários inativos não podem fazer login

**RF01.3 - Controle de Acesso**
- O sistema deve diferenciar entre usuários "admin" e "visitante"
- Apenas administradores podem criar, editar e deletar trilhas e eventos
- Visitantes podem apenas visualizar trilhas e eventos públicos

---

### RF02 - Gestão de Trilhas

**RF02.1 - Listar Trilhas**
- O sistema deve listar todas as trilhas cadastradas
- Deve permitir filtrar por disponibilidade (aberta/fechada)
- Deve permitir filtrar por dificuldade (fácil/moderada/difícil)
- Qualquer usuário (autenticado ou não) pode listar trilhas

**RF02.2 - Visualizar Trilha Específica**
- O sistema deve exibir detalhes completos de uma trilha
- Deve mostrar nome, descrição, dificuldade, distância, duração, localização
- Deve exibir horários de funcionamento e capacidade máxima
- Deve mostrar o administrador que criou a trilha

**RF02.3 - Criar Trilha**
- Apenas administradores podem criar trilhas
- Dados obrigatórios: nome, descrição, dificuldade, distância, duração, localização, horários
- O sistema deve registrar automaticamente o administrador criador
- A trilha é criada como "disponível" por padrão

**RF02.4 - Atualizar Trilha**
- Apenas administradores podem atualizar trilhas
- Deve permitir atualização parcial ou total dos dados
- Deve validar os dados antes de atualizar

**RF02.5 - Deletar Trilha**
- Apenas administradores podem deletar trilhas
- A exclusão é definitiva (não há recuperação)

**RF02.6 - Atualizar Disponibilidade**
- Administradores podem alterar o status de disponibilidade
- Status: true (aberta) ou false (fechada)

---

### RF03 - Gestão de Eventos

**RF03.1 - Listar Eventos**
- O sistema deve listar todos os eventos cadastrados
- Deve permitir filtrar por status (ativo/inativo)
- Deve permitir filtrar por tipo (palestra, workshop, trilha guiada, observação, outro)
- Deve permitir filtrar por período de datas
- Eventos são ordenados por data de início

**RF03.2 - Visualizar Evento Específico**
- O sistema deve exibir detalhes completos de um evento
- Deve mostrar título, descrição, datas, horário, local, capacidade
- Deve exibir vagas disponíveis e tipo do evento
- Deve mostrar o administrador que criou o evento

**RF03.3 - Criar Evento**
- Apenas administradores podem criar eventos
- Dados obrigatórios: título, descrição, dataInicio, dataFim, horário, local, capacidade, tipo
- Data de fim não pode ser anterior à data de início
- Vagas disponíveis são inicializadas com o valor da capacidade
- O evento é criado como "ativo" por padrão

**RF03.4 - Atualizar Evento**
- Apenas administradores podem atualizar eventos
- Deve validar datas (fim não pode ser antes do início)
- Deve permitir atualização parcial ou total dos dados

**RF03.5 - Deletar Evento**
- Apenas administradores podem deletar eventos
- A exclusão é definitiva

**RF03.6 - Atualizar Status**
- Administradores podem ativar/desativar eventos
- Status: true (ativo) ou false (inativo)

**RF03.7 - Gerenciar Vagas**
- Administradores podem atualizar vagas disponíveis
- Vagas disponíveis não podem ser maiores que a capacidade total

---

## ⚙️ Requisitos Não-Funcionais (RNF)

### RNF01 - Desempenho
- O sistema deve responder requisições em menos de 2 segundos
- O banco de dados deve suportar pelo menos 100 usuários simultâneos
- As consultas devem ser otimizadas para evitar sobrecarga

### RNF02 - Segurança
- Todas as senhas devem ser criptografadas com bcrypt (salt rounds: 10)
- Tokens JWT devem expirar em 7 dias
- Rotas administrativas devem ser protegidas por autenticação
- Validação de entrada em todos os endpoints
- Proteção contra SQL Injection e XSS

### RNF03 - Usabilidade
- A API deve retornar mensagens de erro claras e descritivas
- Respostas padronizadas em JSON
- Código HTTP apropriado para cada situação
- Documentação clara de todos os endpoints

### RNF04 - Manutenibilidade
- Código organizado em camadas (MVC)
- Separação de responsabilidades (controllers, models, routes, middlewares)
- Comentários em partes críticas do código
- Uso de variáveis de ambiente para configurações sensíveis

### RNF05 - Portabilidade
- Sistema independente de sistema operacional
- Fácil configuração através de arquivo .env
- Instruções claras de instalação no README

### RNF06 - Confiabilidade
- Tratamento adequado de erros
- Validação de dados em todas as entradas
- Logs de erros para debug
- Conexão resiliente com o banco de dados

### RNF07 - Escalabilidade
- Arquitetura preparada para crescimento
- Uso de banco de dados NoSQL (MongoDB)
- Estrutura modular que permite adicionar funcionalidades

### RNF08 - Disponibilidade
- Sistema deve estar disponível 24/7 em produção
- Tratamento de quedas de conexão com o banco
- Mensagens apropriadas em caso de indisponibilidade

---

## 🛠️ Requisitos Técnicos

### Tecnologias Utilizadas
- **Backend:** Node.js v18+
- **Framework:** Express.js
- **Banco de Dados:** MongoDB Atlas
- **ODM:** Mongoose
- **Autenticação:** JWT (jsonwebtoken)
- **Segurança:** bcryptjs, express-validator
- **CORS:** Habilitado para requisições cross-origin

### Estrutura de Diretórios
```
backend/
├── src/
│   ├── config/          # Configurações (database)
│   ├── controllers/     # Lógica de negócio
│   ├── middlewares/     # Autenticação, validação, erros
│   ├── models/          # Esquemas do banco
│   ├── routes/          # Definição de rotas
│   ├── services/        # Serviços auxiliares
│   ├── utils/           # Funções utilitárias
│   └── server.js        # Arquivo principal
├── docs/                # Documentação
├── .env                 # Variáveis de ambiente
├── .gitignore          # Arquivos ignorados
└── package.json        # Dependências
```

---

## 📊 Regras de Negócio

### RN01 - Trilhas
1. Uma trilha só pode ter uma das dificuldades: fácil, moderada ou difícil
2. A distância deve ser informada em quilômetros
3. Horário de fechamento deve ser posterior ao de abertura
4. Capacidade máxima padrão: 50 pessoas

### RN02 - Eventos
1. Data de fim não pode ser anterior à data de início
2. Tipos válidos: palestra, workshop, trilha guiada, observação, outro
3. Vagas disponíveis nunca podem exceder a capacidade total
4. Vagas disponíveis são inicializadas com o valor da capacidade

### RN03 - Usuários
1. Email deve ser único no sistema
2. Senha deve ter no mínimo 6 caracteres
3. Role padrão: visitante
4. Apenas admins podem criar/editar/deletar recursos

### RN04 - Autenticação
1. Token JWT expira em 7 dias
2. Usuários inativos não podem fazer login
3. Token deve ser enviado no header Authorization com prefixo "Bearer"

---

## ✅ Critérios de Aceitação

### Para Trilhas
- [ ] Admin consegue criar trilha com todos os dados obrigatórios
- [ ] Admin consegue editar qualquer campo da trilha
- [ ] Admin consegue deletar trilha
- [ ] Admin consegue alterar disponibilidade
- [ ] Visitante consegue listar todas as trilhas
- [ ] Visitante consegue visualizar detalhes de uma trilha
- [ ] Visitante NÃO consegue criar/editar/deletar trilhas

### Para Eventos
- [ ] Admin consegue criar evento com todos os dados obrigatórios
- [ ] Admin consegue editar qualquer campo do evento
- [ ] Admin consegue deletar evento
- [ ] Admin consegue ativar/desativar evento
- [ ] Admin consegue atualizar vagas disponíveis
- [ ] Visitante consegue listar todos os eventos
- [ ] Visitante consegue visualizar detalhes de um evento
- [ ] Visitante NÃO consegue criar/editar/deletar eventos

### Para Autenticação
- [ ] Usuário consegue se registrar com dados válidos
- [ ] Usuário consegue fazer login com credenciais corretas
- [ ] Sistema rejeita login com credenciais incorretas
- [ ] Token JWT é gerado corretamente após login
- [ ] Rotas protegidas só são acessíveis com token válido
- [ ] Sistema diferencia entre admin e visitante