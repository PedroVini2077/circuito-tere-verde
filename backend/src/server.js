const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializar express
const app = express();

// SEGURANÇA: Headers HTTP seguros
app.use(helmet());

// PERFORMANCE: Compressão de respostas
app.use(compression());

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SEGURANÇA: CORS configurado
app.use(cors({
  origin: '*',
  credentials: true
}));

// Logs (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SEGURANÇA: Rate limiting global
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // 100 requisições por minuto
  message: {
    success: false,
    message: 'Muitas requisições. Aguarde um momento.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

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
      users: '/api/users',
    },
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Backend rodando na porta ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`\n🌐 Para acessar o SITE:`);
  console.log(`   💻 PC: http://localhost:8080`);
  console.log(`   📱 Mobile: http://10.0.0.21:8080`);
  console.log(`\n💡 Use: npm run full (roda backend + frontend)\n`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Erro: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;