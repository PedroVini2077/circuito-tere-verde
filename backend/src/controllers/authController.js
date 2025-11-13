const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, role, masterKey } = req.body;

    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado',
      });
    }

    // Validar role
    let userRole = 'visitante'; // Padrão
    let isSuperAdmin = false;

    if (role === 'admin' || role === 'superadmin') {
      // Admin comum pode ser criado normalmente
      if (role === 'admin') {
        userRole = 'admin';
      }
      
      // Super admin precisa da master key
      if (role === 'superadmin') {
        if (!masterKey || masterKey !== process.env.SUPER_ADMIN_KEY) {
          return res.status(403).json({
            success: false,
            message: 'Master Key inválida. Apenas fundadores podem criar Super Admins.',
          });
        }
        userRole = 'admin';
        isSuperAdmin = true;
      }
    }

    // Criar usuário
    const user = await User.create({
      nome,
      email,
      senha,
      role: userRole,
      superAdmin: isSuperAdmin,
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