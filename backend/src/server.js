const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializar express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trilhas', require('./routes/trilhaRoutes'));
app.use('/api/eventos', require('./routes/eventoRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🌿 API Circuito Terê Verde está rodando!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      trilhas: '/api/trilhas',
      eventos: '/api/eventos',
    },
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em modo ${process.env.NODE_ENV} na porta ${PORT}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Erro: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;