const rateLimit = require('express-rate-limit');

// Rate limiter específico para login (mais restritivo)
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  skipSuccessfulRequests: true, // Não conta login bem-sucedido
  message: {
    success: false,
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para cadastro
exports.registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // 3 cadastros por hora
  message: {
    success: false,
    message: 'Muitos cadastros. Tente novamente mais tarde.',
  },
});