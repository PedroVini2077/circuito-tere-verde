const Trilha = require('../models/Trilha');

// @desc    Obter todas as trilhas
// @route   GET /api/trilhas
// @access  Public
exports.getTrilhas = async (req, res) => {
  try {
    const { disponivel, dificuldade } = req.query;
    
    let query = {};
    
    if (disponivel !== undefined) {
      query.disponivel = disponivel === 'true';
    }
    
    if (dificuldade) {
      query.dificuldade = dificuldade;
    }

    const trilhas = await Trilha.find(query).populate('criadoPor', 'nome email');

    res.status(200).json({
      success: true,
      count: trilhas.length,
      data: trilhas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Obter uma trilha específica
// @route   GET /api/trilhas/:id
// @access  Public
exports.getTrilha = async (req, res) => {
  try {
    const trilha = await Trilha.findById(req.params.id).populate('criadoPor', 'nome email');

    if (!trilha) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: trilha,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Criar nova trilha
// @route   POST /api/trilhas
// @access  Private/Admin
exports.createTrilha = async (req, res) => {
  try {
    req.body.criadoPor = req.user.id;

    const trilha = await Trilha.create(req.body);

    res.status(201).json({
      success: true,
      data: trilha,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Atualizar trilha
// @route   PUT /api/trilhas/:id
// @access  Private/Admin
exports.updateTrilha = async (req, res) => {
  try {
    let trilha = await Trilha.findById(req.params.id);

    if (!trilha) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada',
      });
    }

    trilha = await Trilha.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: trilha,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Deletar trilha
// @route   DELETE /api/trilhas/:id
// @access  Private/Admin
exports.deleteTrilha = async (req, res) => {
  try {
    const trilha = await Trilha.findById(req.params.id);

    if (!trilha) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada',
      });
    }

    await trilha.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Trilha removida com sucesso',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Atualizar disponibilidade da trilha
// @route   PATCH /api/trilhas/:id/disponibilidade
// @access  Private/Admin
exports.updateDisponibilidade = async (req, res) => {
  try {
    const { disponivel } = req.body;

    const trilha = await Trilha.findByIdAndUpdate(
      req.params.id,
      { disponivel },
      { new: true, runValidators: true }
    );

    if (!trilha) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: trilha,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};