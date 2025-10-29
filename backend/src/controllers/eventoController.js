const Evento = require('../models/Evento');

// @desc    Obter todos os eventos
// @route   GET /api/eventos
// @access  Public
exports.getEventos = async (req, res) => {
  try {
    const { ativo, tipo, dataInicio, dataFim } = req.query;
    
    let query = {};
    
    if (ativo !== undefined) {
      query.ativo = ativo === 'true';
    }
    
    if (tipo) {
      query.tipo = tipo;
    }
    
    // Filtrar por data
    if (dataInicio || dataFim) {
      query.dataInicio = {};
      if (dataInicio) query.dataInicio.$gte = new Date(dataInicio);
      if (dataFim) query.dataInicio.$lte = new Date(dataFim);
    }

    const eventos = await Evento.find(query)
      .populate('criadoPor', 'nome email')
      .sort({ dataInicio: 1 });

    res.status(200).json({
      success: true,
      count: eventos.length,
      data: eventos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Obter um evento específico
// @route   GET /api/eventos/:id
// @access  Public
exports.getEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('criadoPor', 'nome email');

    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: evento,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Criar novo evento
// @route   POST /api/eventos
// @access  Private/Admin
exports.createEvento = async (req, res) => {
  try {
    req.body.criadoPor = req.user.id;

    // Validar datas
    if (new Date(req.body.dataFim) < new Date(req.body.dataInicio)) {
      return res.status(400).json({
        success: false,
        message: 'Data de fim não pode ser anterior à data de início',
      });
    }

    const evento = await Evento.create(req.body);

    res.status(201).json({
      success: true,
      data: evento,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Atualizar evento
// @route   PUT /api/eventos/:id
// @access  Private/Admin
exports.updateEvento = async (req, res) => {
  try {
    let evento = await Evento.findById(req.params.id);

    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado',
      });
    }

    // Validar datas se foram fornecidas
    if (req.body.dataInicio && req.body.dataFim) {
      if (new Date(req.body.dataFim) < new Date(req.body.dataInicio)) {
        return res.status(400).json({
          success: false,
          message: 'Data de fim não pode ser anterior à data de início',
        });
      }
    }

    evento = await Evento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: evento,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Deletar evento
// @route   DELETE /api/eventos/:id
// @access  Private/Admin
exports.deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);

    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado',
      });
    }

    await evento.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Evento removido com sucesso',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Atualizar status do evento
// @route   PATCH /api/eventos/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const { ativo } = req.body;

    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      { ativo },
      { new: true, runValidators: true }
    );

    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: evento,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Atualizar vagas disponíveis
// @route   PATCH /api/eventos/:id/vagas
// @access  Private/Admin
exports.updateVagas = async (req, res) => {
  try {
    const { vagasDisponiveis } = req.body;

    const evento = await Evento.findById(req.params.id);

    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado',
      });
    }

    if (vagasDisponiveis > evento.capacidade) {
      return res.status(400).json({
        success: false,
        message: 'Vagas disponíveis não podem ser maiores que a capacidade',
      });
    }

    evento.vagasDisponiveis = vagasDisponiveis;
    await evento.save();

    res.status(200).json({
      success: true,
      data: evento,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};