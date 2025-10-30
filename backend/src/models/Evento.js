const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'Título do evento é obrigatório'],
      trim: true,
    },
    descricao: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
    },
    dataInicio: {
      type: Date,
      required: [true, 'Data de início é obrigatória'],
    },
    dataFim: {
      type: Date,
      required: [true, 'Data de fim é obrigatória'],
    },
    horario: {
      type: String,
      required: true,
    },
    local: {
      type: String,
      required: [true, 'Local é obrigatório'],
    },
    capacidade: {
      type: Number,
      required: true,
      default: 30,
    },
    vagasDisponiveis: {
      type: Number,
    },
    tipo: {
      type: String,
      enum: ['palestra', 'workshop', 'trilha guiada', 'observação', 'outro'],
      required: true,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    imagemUrl: {
      type: String,
    },
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Inicializar vagas disponíveis com a capacidade
eventoSchema.pre('save', function (next) {
  if (this.isNew && this.vagasDisponiveis === undefined) {
    this.vagasDisponiveis = this.capacidade;
  }
  next();
});

module.exports = mongoose.model('Evento', eventoSchema);