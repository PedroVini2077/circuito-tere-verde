const User = require('../models/User');

// Listar todos os usuários (apenas admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-senha');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // Não pode deletar a si mesmo
    if (userToDelete._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode deletar sua própria conta',
      });
    }

    // NOVA REGRA: Super Admin NÃO pode deletar outro Super Admin
    if (userToDelete.superAdmin && req.user.superAdmin) {
      return res.status(403).json({
        success: false,
        message: '🛡️ Super Admins não podem deletar outros Super Admins. Proteção de cofundadores ativada.',
      });
    }

    // Se tentar deletar admin comum, precisa ser super admin
    if (userToDelete.role === 'admin' && !req.user.superAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Apenas Super Admins podem deletar outros admins',
      });
    }

    await userToDelete.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};