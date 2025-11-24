const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Registrar novo usuário VISITANTE (público)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado',
      });
    }

    // SEGURANÇA: Usuários públicos SEMPRE são visitantes
    // Ignoramos completamente qualquer campo 'role' enviado
    const user = await User.create({
      nome,
      email,
      senha,
      role: 'visitante', // FORÇADO
      superAdmin: false,  // FORÇADO
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        superAdmin: user.superAdmin,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Registrar novo ADMIN (protegido)
// @route   POST /api/auth/register-admin
// @access  Private (apenas Super Admins)
exports.registerAdmin = async (req, res) => {
  try {
    const { nome, email, senha, adminSecret } = req.body;

    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado',
      });
    }

    // OPÇÃO 1: Apenas Super Admins logados podem criar admins
    // (esta verificação já é feita pelo middleware authorizeSuperAdmin)
    
    // OPÇÃO 2 (adicional): Permitir criação com senha secreta
    // Se quiser permitir criar admin sem estar logado, descomente:
    /*
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Chave secreta de Admin inválida.',
      });
    }
    */

    // Criar admin
    const admin = await User.create({
      nome,
      email,
      senha,
      role: 'admin',
      superAdmin: false,
    });

    res.status(201).json({
      success: true,
      message: 'Administrador criado com sucesso',
      data: {
        id: admin._id,
        nome: admin.nome,
        email: admin.email,
        role: admin.role,
        superAdmin: admin.superAdmin,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Registrar novo SUPER ADMIN (super protegido)
// @route   POST /api/auth/register-superadmin
// @access  Public (mas precisa da Master Key)
exports.registerSuperAdmin = async (req, res) => {
  try {
    const { nome, email, senha, masterKey } = req.body;

    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado',
      });
    }

    // Validar Master Key
    if (!masterKey || masterKey !== process.env.SUPER_ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Master Key inválida. Apenas fundadores podem criar Super Admins.',
      });
    }

    // Criar Super Admin
    const superAdmin = await User.create({
      nome,
      email,
      senha,
      role: 'admin',
      superAdmin: true,
    });

    res.status(201).json({
      success: true,
      message: 'Super Administrador criado com sucesso',
      data: {
        id: superAdmin._id,
        nome: superAdmin.nome,
        email: superAdmin.email,
        role: superAdmin.role,
        superAdmin: superAdmin.superAdmin,
        token: generateToken(superAdmin._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Promover visitante para admin (super admin logado)
// @route   PATCH /api/auth/promote/:userId
// @access  Private (apenas Super Admins)
exports.promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Usuário já é administrador',
      });
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: `${user.nome} foi promovido a Administrador`,
      data: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Rebaixar admin para visitante (super admin logado)
// @route   PATCH /api/auth/demote/:userId
// @access  Private (apenas Super Admins)
exports.demoteToVisitante = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    if (user.superAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Não é possível rebaixar um Super Admin',
      });
    }

    if (user.role === 'visitante') {
      return res.status(400).json({
        success: false,
        message: 'Usuário já é visitante',
      });
    }

    user.role = 'visitante';
    await user.save();

    res.status(200).json({
      success: true,
      message: `${user.nome} foi rebaixado a Visitante`,
      data: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validar email e senha
    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, informe email e senha',
      });
    }

    // Buscar usuário com senha
    const user = await User.findOne({ email }).select('+senha');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
    }

    // Verificar senha
    const isMatch = await user.matchPassword(senha);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
    }

    // Verificar se usuário está ativo
    if (!user.ativo) {
      return res.status(401).json({
        success: false,
        message: 'Usuário inativo. Entre em contato com o administrador.',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        superAdmin: user.superAdmin,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Obter usuário logado
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};