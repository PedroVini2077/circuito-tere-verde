# 🎨 Frontend - Circuito Terê Verde

Interface web para visualização e gerenciamento do sistema de turismo ecológico.

---

## 📁 Estrutura de Arquivos
```
frontend/
├── index.html          # Tela de boas-vindas (landing page)
├── home.html           # Página principal (trilhas e eventos)
├── login.html          # Autenticação de usuários
├── cadastro.html       # Registro de novos usuários
├── perfil.html         # Visualização de perfil do usuário
├── admin.html          # Dashboard administrativo
├── style.css           # Estilos CSS compartilhados
├── script.js           # Funções JavaScript compartilhadas
└── README.md           # Esta documentação
```

---

## 🚀 Como Usar

### 1. Iniciar o Backend
```bash
cd backend
npm run dev
```

### 2. Abrir o Frontend
- Abra `index.html` no navegador
- Ou use Live Server (extensão VS Code)

---

## 📱 Páginas e Funcionalidades

### 🏠 **index.html** - Tela de Boas-Vindas
- **Descrição:** Landing page inicial
- **Acesso:** Público (não requer login)
- **Funcionalidades:**
  - Mensagem de boas-vindas
  - Botões para Login e Cadastro
  - Redirecionamento automático se já autenticado

---

### 🌿 **home.html** - Página Principal
- **Descrição:** Visualização de trilhas e eventos
- **Acesso:** Requer autenticação
- **Funcionalidades:**
  - Listagem de todas as trilhas
  - Filtros visuais (dificuldade, disponibilidade)
  - Listagem de eventos ativos
  - Botões dinâmicos no header:
    - Visitante: Perfil + Sair
    - Admin: Perfil + Admin + Sair

---

### 🔐 **login.html** - Login
- **Descrição:** Autenticação de usuários
- **Acesso:** Público
- **Funcionalidades:**
  - Formulário de login (email + senha)
  - Validação de credenciais
  - Redirecionamento baseado no role:
    - Visitante → `home.html`
    - Admin → `home.html` (com botão Admin)
  - Link para cadastro

---

### 📝 **cadastro.html** - Cadastro
- **Descrição:** Registro de novos usuários
- **Acesso:** Público
- **Funcionalidades:**
  - Formulário de registro
  - Seleção de tipo (Visitante/Admin)
  - Validação de senha (mínimo 6 caracteres)
  - Após cadastro → Redireciona para login
  - Link para login

---

### 👤 **perfil.html** - Perfil do Usuário
- **Descrição:** Visualização de dados do usuário
- **Acesso:** Requer autenticação
- **Funcionalidades:**
  - Exibe nome, email, tipo
  - Mostra badge de Super Admin (se aplicável)
  - Data de cadastro

---

### ⚙️ **admin.html** - Dashboard Administrativo
- **Descrição:** Gerenciamento completo do sistema
- **Acesso:** Requer autenticação + role "admin"
- **Funcionalidades:**

#### **📊 Dashboard**
- Estatísticas em tempo real
- Contador de trilhas
- Contador de eventos ativos

#### **🥾 Gerenciar Trilhas**
- ✅ Criar nova trilha (formulário completo)
- ✅ Editar trilha existente
- ✅ Abrir/Fechar trilha (toggle rápido)
- ✅ Deletar trilha
- 📋 Campos: nome, descrição, dificuldade, distância, duração, localização, capacidade, horários

#### **🎪 Gerenciar Eventos**
- ✅ Criar novo evento (formulário completo)
- ✅ Editar evento existente
- ✅ Ativar/Desativar evento
- ✅ Deletar evento
- 📋 Campos: título, descrição, datas, horário, local, tipo, capacidade

#### **👥 Gerenciar Usuários**
- ✅ Listar todos os usuários
- ✅ Deletar visitantes (qualquer admin)
- ✅ Deletar admins (apenas super admin)
- ⚠️ Não pode deletar a si mesmo

---

## 🎨 Design e Estilos

### Paleta de Cores
```css
--primary: #2d6a4f     /* Verde principal */
--secondary: #52b788   /* Verde secundário */
--accent: #74c69d      /* Verde claro */
--light: #d8f3dc       /* Verde muito claro */
--dark: #081c15        /* Verde escuro */
--danger: #dc3545      /* Vermelho */
```

### Componentes
- **Cards:** Containers brancos com sombra
- **Badges:** Pills coloridos para status
- **Buttons:** Primário (verde), Secundário (verde claro), Danger (vermelho)
- **Grid:** Layout responsivo de 3 colunas
- **Forms:** Inputs com borda verde ao focar

### Animações
- Fade in nos cards
- Slide in nos alerts
- Hover effects nos botões e cards

---

## 🔒 Segurança

### Autenticação
- **JWT Token** armazenado em `localStorage`
- Token enviado em todas as requisições protegidas
- Header: `Authorization: Bearer {token}`

### Proteção de Rotas
- `home.html`: Redireciona para `index.html` se não autenticado
- `admin.html`: Redireciona para `login.html` se não for admin
- `perfil.html`: Redireciona para `login.html` se não autenticado

### Validações
- Email válido (HTML5 validation)
- Senha mínima 6 caracteres
- Campos obrigatórios marcados
- Feedback visual de erros

---

## 📡 Comunicação com API

### Configuração
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Funções Principais (`script.js`)
```javascript
getToken()           // Obtém token do localStorage
setToken(token)      // Salva token no localStorage
clearAuth()          // Remove token
checkAuth()          // Verifica autenticação e retorna dados do usuário
showAlert(msg, type) // Exibe alertas visuais
```

### Endpoints Utilizados
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/auth/register` | POST | Cadastro |
| `/auth/login` | POST | Login |
| `/auth/me` | GET | Dados do usuário |
| `/trilhas` | GET | Listar trilhas |
| `/trilhas` | POST | Criar trilha |
| `/trilhas/:id` | PUT | Editar trilha |
| `/trilhas/:id` | DELETE | Deletar trilha |
| `/trilhas/:id/disponibilidade` | PATCH | Abrir/Fechar |
| `/eventos` | GET | Listar eventos |
| `/eventos` | POST | Criar evento |
| `/eventos/:id` | PUT | Editar evento |
| `/eventos/:id` | DELETE | Deletar evento |
| `/eventos/:id/status` | PATCH | Ativar/Desativar |
| `/users` | GET | Listar usuários |
| `/users/:id` | DELETE | Deletar usuário |

---

## 🔄 Fluxo de Navegação
```
index.html (Boas-vindas)
    ↓
[Login / Cadastro]
    ↓
login.html → Autenticação
    ↓
home.html (Logado)
    ↓
├── perfil.html (Ver perfil)
├── admin.html (Se for admin)
└── Logout → index.html
```

---

## 🐛 Tratamento de Erros

### Alertas Visuais
- ✅ **Sucesso:** Verde com animação
- ❌ **Erro:** Vermelho com mensagem descritiva
- ⏱️ **Auto-dismiss:** 5 segundos

### Erros Comuns
| Erro | Causa | Solução |
|------|-------|---------|
| 401 Unauthorized | Token inválido/expirado | Fazer login novamente |
| 403 Forbidden | Sem permissão | Apenas admin pode acessar |
| 404 Not Found | Recurso não existe | Verificar ID |
| 500 Server Error | Erro no backend | Verificar logs do servidor |

---

## 📱 Responsividade

### Breakpoints
- **Desktop:** > 768px (grid 3 colunas)
- **Tablet/Mobile:** ≤ 768px (grid 1 coluna)

### Adaptações Mobile
- Forms em coluna única
- Header empilhado
- Botões full-width
- Cards adaptáveis

---

## ✨ Funcionalidades Especiais

### 1. **Redirecionamento Inteligente**
- Usuário logado não vê tela de boas-vindas
- Admin cadastrado vai direto para login (não loga automaticamente)
- Visitante não acessa área admin

### 2. **Feedback em Tempo Real**
- Alertas de sucesso/erro
- Loading spinners
- Contadores atualizados automaticamente

### 3. **Gestão de Usuários**
- Super Admin: Pode deletar qualquer usuário
- Admin comum: Pode deletar apenas visitantes
- Ninguém pode deletar a si mesmo

### 4. **Edição Inline**
- Formulários de edição aparecem na mesma página
- Preenchimento automático dos campos
- Scroll suave até o formulário

---

## 🔧 Manutenção

### Adicionar Nova Página
1. Criar arquivo HTML
2. Importar `style.css` e `script.js`
3. Adicionar header padrão
4. Implementar lógica específica

### Modificar Estilos
- Editar `style.css` (afeta todas as páginas)
- Ou adicionar `<style>` inline na página específica

### Adicionar Funcionalidade
1. Criar endpoint no backend
2. Adicionar função no `script.js` ou página específica
3. Atualizar UI conforme necessário

---

## 📝 Notas de Desenvolvimento

### Decisões de Design
- **Arquivo único vs separado:** CSS e JS separados para reutilização
- **LocalStorage:** Persistência simples do token
- **SPA vs MPA:** Multi-page para simplicidade e SEO

### Melhorias Futuras
- [ ] Paginação em listas longas
- [ ] Busca e filtros avançados
- [ ] Upload de imagens
- [ ] Preview de imagens
- [ ] Editor de perfil
- [ ] Alteração de senha
- [ ] Confirmação de email
- [ ] Recuperação de senha
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

---

## 🤝 Contribuindo

Para adicionar novas funcionalidades:
1. Seguir a estrutura de arquivos existente
2. Reutilizar `style.css` e `script.js`
3. Manter consistência visual
4. Documentar alterações

---

**🌿 Desenvolvido com 💚 para promover o turismo ecológico sustentável!**