// Middleware para autorizar apenas Super Admins
exports.authorizeSuperAdmin = (req, res, next) => {
  // Verificar se o usuário está autenticado (protect middleware já verificou)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Acesso negado. Usuário não autenticado.',
    });
  }

  // Verificar se é Super Admin
  if (!req.user.superAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Apenas Super Admins podem acessar esta rota.',
    });
  }

  next();
};