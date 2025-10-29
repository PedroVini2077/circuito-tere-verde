const mongoose = require('mongoose');

const trilhaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome da trilha é obrigatório'],
      trim: true,
    },
    descricao: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
    },
    dificuldade: {
      type: String,
      enum: ['fácil', 'moderada', 'difícil'],
      required: true,
    },
    distancia: {
      type: Number,
      required: [true, 'Distância é obrigatória'],
    },
    duracao: {
      type: String,
      required: [true, 'Duração estimada é obrigatória'],
    },
    localizacao: {
      type: String,
      required: true,
    },
    horarioFuncionamento: {
      abertura: {
        type: String,
        required: true,
      },
      fechamento: {
        type: String,
        required: true,
      },
    },
    disponivel: {
      type: Boolean,
      default: true,
    },
    capacidadeMaxima: {
      type: Number,
      default: 50,
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

module.exports = mongoose.model('Trilha', trilhaSchema);