const express = require('express');
const { 
  register, 
  registerAdmin,
  registerSuperAdmin,
  promoteToAdmin,
  demoteToVisitante,
  login, 
  getMe 
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { authorizeSuperAdmin } = require('../middlewares/authorizeSuperAdmin');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

// ========== ROTAS PÚBLICAS ==========

// Registro de visitantes (qualquer pessoa pode se registrar)
router.post('/register', registerLimiter, register);

// Login (qualquer usuário pode fazer login)
router.post('/login', loginLimiter, login);

// Registro de Super Admin (precisa da Master Key)
router.post('/register-superadmin', registerLimiter, registerSuperAdmin);

// ========== ROTAS PROTEGIDAS ==========

// Obter dados do usuário logado
router.get('/me', protect, getMe);

// ========== ROTAS SUPER ADMIN ==========

// Criar novo admin (apenas super admins logados)
router.post('/register-admin', protect, authorizeSuperAdmin, registerAdmin);

// Promover visitante para admin (apenas super admins logados)
router.patch('/promote/:userId', protect, authorizeSuperAdmin, promoteToAdmin);

// Rebaixar admin para visitante (apenas super admins logados)
router.patch('/demote/:userId', protect, authorizeSuperAdmin, demoteToVisitante);

module.exports = router;